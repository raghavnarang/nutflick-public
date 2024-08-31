import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import Price from '../product/price'
import EditCartItem from './edit-cart-item'
import type { CartItem } from '@/shared/types/cart'
import Photo from '../Icons/photo'

interface CartItemProps {
  item: CartItem
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const itemLink = `/product/${item.productSlug}/${item.variantSlug}`
  return (
    <div className="flex justify-between items-end border-b border-solid border-gray-200 pb-5 mb-5">
      <div className="flex">
        <Link href={itemLink} className="w-32 h-32 relative mr-5 flex-shrink-0">
          {item.image ? (
            <Image src={item.image} fill alt={item.title} className="object-cover rounded-md" />
          ) : (
            <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
              <Photo className="!size-10 text-gray-400" />
            </div>
          )}
        </Link>
        <div className="flex flex-col justify-between">
          <div className="mb-3">
            {item.category && (
              <span className="block text-gray-500 text-sm mb-1">{item.category}</span>
            )}
            <Link
              href={itemLink}
              className="block mb-1 text-sm md:text-base font-bold md:font-normal"
            >
              {item.title}
            </Link>
            <Price price={item.price} className="block text-gray-600 text-sm md:text-base" />
          </div>
          <EditCartItem cartItem={item} className="!justify-start" />
          <Price price={item.price * item.qty} className="text-base md:hidden block" />
        </div>
      </div>

      <Price price={item.price * item.qty} className="text-lg text-right hidden md:block" />
    </div>
  )
}

export default CartItem