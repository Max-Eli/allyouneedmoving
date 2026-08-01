import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { business } from '@/config/business'
import { formatDate, getPost, getPostSlugs, getRelatedPosts, tagSlug } from '@/lib/blog'
import { articleSchema, breadcrumbSchema, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.published,
    modifiedTime: post.updated ?? post.published,
    tags: post.tags,
  })
}

/**
 * Long-form content renders inside `.prose`, and tables get a scroll container so
 * a wide table never forces the page to scroll sideways on a phone.
 */
const mdxComponents = {
  table: (props: React.ComponentProps<'table'>) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
  a: ({ href, ...props }: React.ComponentProps<'a'>) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...props}
      />
    )
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ]

  const related = getRelatedPosts(post)

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          published: post.published,
          updated: post.updated,
          author: post.author,
          tags: post.tags,
        })}
      />

      <article>
        <header className="post-header">
          <Breadcrumbs trail={trail} />
          <h1 className="post-header__title">{post.title}</h1>
          <p className="lede lede--wide" style={{ marginBottom: 24 }}>
            {post.description}
          </p>
          <div className="post-header__meta">
            <span>
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              {post.updated ? ` · Updated ${formatDate(post.updated)}` : ''}
            </span>
            <span>{post.readingMinutes} min read</span>
            <span className="tag-row">
              {post.tags.map((tag) => (
                <Link href={`/blog/tag/${tagSlug(tag)}`} className="tag" key={tag}>
                  {tag}
                </Link>
              ))}
            </span>
          </div>
        </header>

        <div className="post-body">
          <div className="prose">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      { behavior: 'append', properties: { className: 'anchor', ariaHidden: true, tabIndex: -1 }, content: { type: 'text', value: '#' } },
                    ],
                  ],
                },
              }}
            />
          </div>

          <aside>
            {post.headings.length > 2 ? (
              <nav className="toc" aria-label="On this page">
                <p className="toc__head">On this page</p>
                <ol>
                  {post.headings.map((heading) => (
                    <li key={heading.id} data-depth={heading.depth}>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <div className="notice" style={{ marginTop: 24 }}>
              <p className="notice__title">Moving in South Florida?</p>
              <p className="notice__body">
                A coordinator calls back within one business hour with a written estimate.
              </p>
              <p style={{ marginTop: 16 }}>
                <Link href="/quote" className="btn btn--ink btn--sm">
                  Get my free quote →
                </Link>
              </p>
              <p className="notice__body" style={{ marginTop: 14 }}>
                Or call <a href={business.phone.href}>{business.phone.display}</a>
              </p>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="section">
          <h2 className="h2 h2--gap">Related guides</h2>
          <div className="post-grid">
            {related.map((item) => (
              <Link href={`/blog/${item.slug}`} className="post-card" key={item.slug}>
                <p className="post-card__meta">
                  {formatDate(item.published)} · {item.readingMinutes} min read
                </p>
                <h3 className="post-card__title">{item.title}</h3>
                <p className="post-card__excerpt">{item.description}</p>
                <p className="post-card__more">Read →</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBand last />
    </>
  )
}
