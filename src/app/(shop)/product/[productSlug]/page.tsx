import { type FC } from 'react'
import Image from 'next/image'
import cx from 'clsx'
import Link from 'next/link'
import AddToCart from '@/components/cart/add-to-cart'
import ProductRecommendations from '@/components/product/product-recommendations'
import Photo from '@/components/Icons/photo'
import { getProducts } from '@/features/server/product'
import Price from '@/components/product/price'
import GoToCart from '@/components/product/go-to-cart'
import getSchema from './schema'
import type { Metadata } from 'next'
import { getProductDataFromParams, type ProductProps } from './helper'
import LexicalView from '@/components/lexical-view'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: ProductProps): Promise<Metadata> {
  const data = await getProductDataFromParams(props)
  if (!data) {
    return {}
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
  const fallbackTitle = `Buy ${data.product.title} Online | Nutflick - Premium Quality`
  return {
    title: data.product.meta?.title || fallbackTitle,
    description: data.product.meta?.description,
    openGraph: {
      url: `${baseUrl}/product/${data.product.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/product/${data.product.slug}`,
    },
  }
}

const Product: FC<ProductProps> = async (props) => {
  const data = await getProductDataFromParams(props)
  if (!data) {
    notFound()
  }

  const { product, variant } = data
  const image = variant.bigImage || product.bigImage || variant.image || product.image

  return (
    <div>
      <div className="w-full flex md:gap-10 gap-4 flex-col md:flex-row items-start">
        <div className="w-full md:w-1/2 md:h-[80vh] h-[50vh] flex justify-center bg-gray-100 relative">
          {typeof image != 'number' && image && image.url ? (
            <Image
              src={image.url}
              fill
              priority
              quality={50}
              alt={image.alt || `${product.title} - ${variant.title}`}
              className="object-contain rounded-lg z-0 p-10"
              sizes="(max-width: 767px) 80vw, 40vw"
            />
          ) : (
            <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
              <Photo className="!size-10 text-gray-400" />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="md:text-3xl text-xl mb-5 !leading-relaxed">{product.title}</h1>
          <div className="mb-2">
            {product.variants?.map((v) => {
              const isSelected = v.slug?.toLowerCase() === variant.slug?.toLowerCase()

              return (
                v.slug && (
                  <Link
                    key={v.id}
                    className={cx(
                      'rounded px-4 py-2 mr-3 last:mr-0 mb-3 transition-colors inline-block text-sm md:text-base',
                      {
                        'text-gray-700 bg-gray-100 hover:bg-gray-200': !isSelected,
                        'text-red-800 bg-red-100 border-red-500': isSelected,
                      },
                    )}
                    href={`/product/${product.slug}?size=${v.slug}`}
                  >
                    {v.title}
                  </Link>
                )
              )
            })}
          </div>

          <LexicalView
            className="text-gray-700 mb-5 leading-loose"
            htmlString={product.description_html || ''}
          />
          <div className="flex md:flex-col md:justify-normal justify-between items-center md:items-start z-10 md:gap-5 md:relative fixed md:bottom-auto md:left-auto md:right-auto bottom-14 left-0 right-0 px-5 md:px-0 h-14 md:h-auto border-gray-300 border-t md:border-none bg-white md:bg-transparent">
            <div className="flex items-center gap-2">
              <Price price={variant.price} className="font-bold text-xl" />
              {variant.comparePrice && (
                <Price price={variant.comparePrice} className="line-through" />
              )}
            </div>
            <AddToCart product={{ ...product, variants: [variant] }} normalButton disableRemove />
            <GoToCart variantId={variant.id || undefined} className="md:block hidden" />
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema(product)) }}
        />
      </div>
      {product.category?.value && (
        <ProductRecommendations
          categoryId={
            typeof product.category.value == 'number'
              ? product.category.value
              : product.category.value.id
          }
          productId={product.id}
        />
      )}
    </div>
  )
}

export default Product

export async function generateStaticParams() {
  const products = await getProducts()

  return products.map((p) => ({ productSlug: p.slug }))
}
