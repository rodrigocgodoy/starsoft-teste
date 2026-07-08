import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    // Resolve `@use '...'` from the styles root without long relative paths.
    loadPaths: [path.join(process.cwd(), 'src/styles')],
    // Make design tokens + mixins available in every .scss/.module.scss file
    // without an explicit import. Abstracts emit no CSS, so this is free.
    additionalData: `@use 'abstracts' as *;`,
  },
}

export default nextConfig
