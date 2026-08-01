import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { findTagName, formatDate, getAllTags, getPostsByTag } from '@/lib/blog'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return getAllTags().map((entry) => ({ tag: entry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const name = findTagName(tag)
  if (!name) return {}

  return pageMeta({
    title: `${name} — Moving Guides`,
    description: `Moving guides and advice tagged ${name}, from the crews doing the work across South Florida.`,
    path: `/blog/tag/${tag}`,
  })
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const name = findTagName(tag)
  if (!name) notFound()

  const posts = getPostsByTag(tag)
  const tags = getAllTags()

  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name, href: `/blog/tag/${tag}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Tagged</p>
        <h1 className="h1 h1--narrow">{name}</h1>
        <p className="lede lede--lg">
          {posts.length} guide{posts.length === 1 ? '' : 's'} on {name.toLowerCase()}.
        </p>
        <div className="tag-row" style={{ marginTop: 26 }}>
          {tags.map((entry) => (
            <Link
              href={`/blog/tag/${entry.slug}`}
              className="tag"
              key={entry.slug}
              aria-current={entry.slug === tag ? 'page' : undefined}
            >
              {entry.tag} ({entry.count})
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--last">
        <div className="post-grid">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className="post-card" key={post.slug}>
              <p className="post-card__meta">
                {formatDate(post.published)} · {post.readingMinutes} min read
              </p>
              <h2 className="post-card__title">{post.title}</h2>
              <p className="post-card__excerpt">{post.description}</p>
              <p className="post-card__more">Read →</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand last />
    </>
  )
}
