import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/config/site'
import { serviceAreaSlugs } from '@/content/service-areas'
import { serviceSlugs } from '@/content/services'
import { getAllPosts, getAllTags } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // `satisfies` keeps changeFrequency narrowed to the literal union after .map().
  const staticPages: MetadataRoute.Sitemap = ([
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/quote'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/services'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/service-areas'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/reviews'), changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/faq'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/careers'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/moving-rights'), changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/accessibility'), changeFrequency: 'yearly', priority: 0.2 },
  ] satisfies MetadataRoute.Sitemap).map((entry) => ({ ...entry, lastModified: now }))

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const areaPages: MetadataRoute.Sitemap = serviceAreaSlugs.map((slug) => ({
    url: absoluteUrl(`/service-areas/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.published),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((entry) => ({
    url: absoluteUrl(`/blog/tag/${entry.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.4,
  }))

  return [...staticPages, ...servicePages, ...areaPages, ...postPages, ...tagPages]
}
