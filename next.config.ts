import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Product images are served from the challenge API's S3 bucket.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com',
        pathname: '/items/**',
      },
    ],
    // Serve the vector logo through next/image (crisp on any DPI). Locked down
    // per Next's guidance since our only SVG is the first-party logo.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  sassOptions: {
    // Resolve `@use '...'` from the styles root without long relative paths.
    loadPaths: [path.join(process.cwd(), 'src/styles')],
    // Make design tokens + mixins available in every .scss/.module.scss file
    // without an explicit import. Abstracts emit no CSS, so this is free.
    additionalData: `@use 'abstracts' as *;`,
  },
}

export default nextConfig
