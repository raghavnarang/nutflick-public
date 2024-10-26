import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getMeUser } from './auth/me'

export const getCheckoutCoupons = async () => {
  const payload = await getPayloadHMR({ config })
  const user = await getMeUser()
  const { docs: coupons } = await payload.find({
    collection: 'coupons',
    pagination: false,
    overrideAccess: false,
    user,
  })

  return coupons.filter((c) => c.checkout_visible)
}
