import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: 'daily' },
    { url: `${siteUrl}/new`, priority: 0.8, changeFrequency: 'daily' },
  ]
}
