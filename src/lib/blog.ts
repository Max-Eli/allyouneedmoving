import 'server-only'

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import matter from 'gray-matter'

const BLOG_DIR = join(process.cwd(), 'content', 'blog')

export interface PostFrontmatter {
  title: string
  description: string
  published: string
  updated?: string
  author: string
  tags: string[]
  /** Pin one post to the top of the index. */
  featured?: boolean
  /** Set true to keep a draft out of the build. */
  draft?: boolean
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
  readingMinutes: number
  headings: { depth: number; text: string; id: string }[]
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Pull h2/h3 out of the raw MDX for the table of contents. */
function extractHeadings(markdown: string) {
  const headings: { depth: number; text: string; id: string }[] = []
  // Skip fenced code blocks so `## comments` inside them are not treated as headings.
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '')
  const re = /^(#{2,3})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = re.exec(withoutCode)) !== null) {
    const depth = match[1]!.length
    const text = match[2]!.trim().replace(/\s*#+\s*$/, '')
    headings.push({ depth, text, id: slugifyHeading(text) })
  }
  return headings
}

function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 225))
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = readFileSync(join(BLOG_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    slug,
    content,
    readingMinutes: readingTime(content),
    headings: extractHeadings(content),
  }
}

let cache: Post[] | null = null

export function getAllPosts(): Post[] {
  if (cache) return cache

  let files: string[] = []
  try {
    files = readdirSync(BLOG_DIR).filter((file) => /\.mdx?$/.test(file))
  } catch {
    // No content directory yet — the blog renders an empty state rather than failing the build.
    return []
  }

  cache = files
    .map(parsePost)
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return cache
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getPostsByTag(slug: string): Post[] {
  return getAllPosts().filter((post) => post.tags.some((tag) => tagSlug(tag) === slug))
}

export function findTagName(slug: string): string | undefined {
  return getAllTags().find((entry) => entry.slug === slug)?.tag
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** Posts related by shared tags, newest first, excluding the current one. */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.post)
}
