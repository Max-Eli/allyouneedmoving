import Link from 'next/link'

import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { formatDate, getAllPosts, getAllTags } from '@/lib/blog'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Moving Guides & Advice',
  description:
    'Practical guides on hiring a mover, what drives moving costs, valuation and insurance, planning checklists, and moving during Florida hurricane season.',
  path: '/blog',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
]

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  const featured = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post.slug !== featured?.slug)

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Moving guides</p>
        <h1 className="h1 h1--narrow">What we wish everyone knew before booking a mover.</h1>
        <p className="lede lede--lg">
          No fluff and no listicles about bubble wrap. These are the things that actually decide
          whether a move goes well — written by the people doing the moving.
        </p>
        {tags.length > 0 ? (
          <div className="tag-row" style={{ marginTop: 26 }}>
            {tags.map((entry) => (
              <Link href={`/blog/tag/${entry.slug}`} className="tag" key={entry.slug}>
                {entry.tag} ({entry.count})
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="section section--last">
        {posts.length === 0 ? (
          <p className="lede">No posts published yet. Check back shortly.</p>
        ) : (
          <div className="post-grid">
            {featured ? (
              <Link href={`/blog/${featured.slug}`} className="post-card post-card--feature">
                <div>
                  <p className="post-card__meta">
                    Featured · {formatDate(featured.published)} · {featured.readingMinutes} min read
                  </p>
                  <h2 className="post-card__title">{featured.title}</h2>
                </div>
                <div>
                  <p className="post-card__excerpt">{featured.description}</p>
                  <p className="post-card__more">Read the guide →</p>
                </div>
              </Link>
            ) : null}

            {rest.map((post) => (
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
        )}
      </section>

      <CtaBand
        eyebrow="Done reading?"
        title="Get a real quote in about two minutes."
        last
      />
    </>
  )
}
