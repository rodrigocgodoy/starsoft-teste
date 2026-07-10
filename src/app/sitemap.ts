import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: 'daily' },
    { url: `${siteUrl}/new`, priority: 0.8, changeFrequency: 'daily' },
  ]
}
