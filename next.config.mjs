import { withPayload } from '@payloadcms/next/withPayload'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone'
  // Your Next.js config here
}

export default withPayload(withBundleAnalyzer(nextConfig))
