/**
 * Renders a JSON-LD block. Content is generated server-side from typed objects in
 * src/lib/seo.ts — never from user input — so serialising it is safe. The `<`
 * escape guards against a stray sequence closing the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
