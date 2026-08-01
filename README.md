# AllYouNeedMovers

Marketing site for AllYouNeedMovers, a South Florida moving company. Next.js 15
(App Router) + TypeScript, statically generated, with an MDX blog and a
server-validated lead pipeline.

> **⚠ Not ready to launch.** Several factual claims on this site are still
> placeholders from the design mockup — licence numbers, review counts, and
> performance statistics among them. Run `npm run audit:claims` for the full list.
> See [Before you launch](#before-you-launch).

## Quick start

```sh
npm install
cp .env.example .env.local     # defaults are safe for local work
npm run dev                    # http://localhost:3000
```

`LEAD_PROVIDER` defaults to `console`, so form submissions print to the terminal
instead of emailing anyone. Nothing leaves your machine until you configure a
real provider.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (runs the claim guard first) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run audit:claims` | List every unverified factual claim |
| `npm run check:email` | Diagnose lead delivery config (add `-- --send` to send a real test) |
| `npm run check` | typecheck + lint + build |

## Project layout

```
content/blog/*.mdx        Blog posts (frontmatter + MDX)
public/                   Static assets
scripts/                  Claim audit and the production build guard
src/app/                  Routes (App Router)
src/components/           UI and interactive components
src/config/               Business facts, nav, content-status flags
src/content/              Services, service areas, FAQs, testimonials, copy
src/lib/                  SEO helpers, blog reader, lead pipeline
reference/                The original static prototype, kept for comparison
```

## Routes

| Path | |
| --- | --- |
| `/` | Homepage — estimator, ZIP checker, reviews, FAQ |
| `/quote` | Five-step quote wizard |
| `/services` + `/services/[slug]` | Index and 7 service pages |
| `/service-areas` + `/service-areas/[slug]` | Index and 8 city pages |
| `/about`, `/reviews`, `/faq`, `/contact`, `/careers` | Company pages |
| `/blog`, `/blog/[slug]`, `/blog/tag/[tag]` | MDX blog |
| `/privacy`, `/terms`, `/accessibility`, `/moving-rights` | Legal & consumer info |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/api/og` | Machine endpoints |

## Content model

Everything editable lives in data files, not in JSX.

- **`src/config/business.ts`** — the single source of truth for every factual
  claim: phone, address, licence numbers, insurance limits, review aggregate,
  statistics. Nothing else in the codebase should hardcode these.
- **`src/config/content-status.ts`** — flags for content that is still mockup
  material. While a flag is `false`, that content renders behind a visible
  "sample content" notice and is excluded from structured data.
- **`src/content/services.ts`** — the seven services, including per-service FAQs
  that feed `FAQPage` schema on each page.
- **`src/content/service-areas.ts`** — city pages with genuinely local detail.
  These are the pages that win local search; keep them specific.

### Adding a blog post

Create `content/blog/my-post.mdx`:

```mdx
---
title: 'Post title'
description: 'One or two sentences — this is the meta description and card excerpt.'
published: '2026-08-01'
updated: '2026-09-14'      # optional
author: 'AllYouNeedMovers'
tags: ['Planning', 'Florida']
featured: false            # optional, pins to the top of /blog
draft: false               # optional, true keeps it out of the build
---

## Body

Standard MDX. GFM tables and footnotes are enabled. Headings get anchors, and
h2/h3 populate the table of contents automatically.
```

The post, its tag pages, the sitemap, and the RSS feed all update on next build.

## Lead pipeline

Three forms — quote wizard, contact, careers — share one pipeline:

```
form → server action → zod validation → spam checks → provider → office inbox
```

- **Validation** (`src/lib/leads/schema.ts`) runs on the server. Client-side
  gating exists for UX only and is never trusted.
- **Spam defence** (`src/lib/leads/spam.ts`) is layered: a honeypot field, a
  minimum fill time, and optional Cloudflare Turnstile. Rejected submissions get
  the same success response a real one would — telling a bot it was blocked just
  tells it what to change.
- **Delivery** (`src/lib/leads/providers.ts`) is pluggable via `LEAD_PROVIDER`:

| Value | Behaviour |
| --- | --- |
| `resend` | Transactional email. What this site uses. Needs `RESEND_API_KEY`. |
| `formspree` | Forwards to an inbox. Needs `FORMSPREE_FORM_ID`. No domain setup. |
| `console` | Logs the lead. Local development default. |

All three forms deliver to `LEAD_TO_EMAIL`, which defaults to
`outofstatemovers@gmail.com` in code if unset. Subject lines are prefixed with
the site name so the source is obvious at a glance:

```
AllYouNeedMovers — New quote request — AYN-260801-6463
AllYouNeedMovers — Website contact message — AYN-260801-1579
AllYouNeedMovers — Job application — AYN-260801-1138
```

The customer's address is set as `Reply-To`, so replying from the inbox goes
straight back to them.

### Resend setup

1. Create an account at [resend.com](https://resend.com) using the destination inbox.
2. Create an API key, set `RESEND_API_KEY`, and set `LEAD_PROVIDER=resend`.
3. Leave `LEAD_FROM_EMAIL` blank at first. The code falls back to Resend's shared
   test sender (`onboarding@resend.dev`), which needs no DNS but **only delivers
   to the address that owns the Resend account**. That is enough to prove the
   wiring end to end.
4. Before launch, verify a sending domain in Resend, complete its DNS records,
   and set `LEAD_FROM_EMAIL` to an address on that domain. Until you do, mail to
   any other inbox is rejected with a 403, and deliverability to Gmail is poor.

A 403 from Resend nearly always means the sending domain is not verified — the
error logged server-side says so explicitly rather than leaving you to guess.

**`LEAD_FROM_EMAIL` cannot be a Gmail address.** It is the *sender*, not the
recipient. Resend only sends from domains you own and have verified, so
`something@gmail.com` there is rejected every time. The destination
(`LEAD_TO_EMAIL`) can of course be Gmail.

To check a configuration before trusting it:

```sh
npm run check:email            # diagnose only
npm run check:email -- --send  # also send a real test email
```

It reads `.env.local` if present, otherwise the ambient environment (pair it
with `vercel env pull` to check what production actually has). It verifies the
API key, confirms the sending domain is verified in Resend, and never prints
the key.

Adding a CRM means writing one function in `providers.ts` and a new case in
`deliverLead`. No other file changes.

## SEO

- Per-page `Metadata` via `pageMeta()` — canonical URL, Open Graph, Twitter card.
- Generated social images at `/api/og?title=…` (no remote fonts or assets).
- JSON-LD: `MovingCompany`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`,
  `BlogPosting`, and per-city local business.
- `sitemap.xml` and `robots.txt` generated from the content files.
- RSS at `/rss.xml`.

`AggregateRating` is deliberately **not** emitted while review data is
unverified. Marking up invented reviews is both a Google structured-data
violation and an FTC problem. Once `business.reviews` holds real data and
`reviewAggregateVerified` is `true`, add it to `organizationSchema()`.

## Accessibility

Targets WCAG 2.1 AA. Implemented: skip link, visible focus, focus trap and
Escape on the mobile drawer, focus moved to the heading on each wizard step,
`aria-pressed` / `aria-expanded` on toggles, errors tied to fields with
`aria-describedby` + `aria-invalid`, live regions on the estimator and ZIP
results, and full `prefers-reduced-motion` support. Known gaps are listed
honestly on `/accessibility` — update that page as they close.

## Before you launch

Run this first:

```sh
npm run audit:claims
```

It lists every unverified claim, grouped by risk, with what needs to happen.
`npm run build` runs it in blocking mode when `SITE_ENV=production`, so a
production deploy cannot ship fabricated licence numbers or review counts.

### Checklist

**Legal — must be done**

- [ ] Real USDOT, MC, and Florida IM numbers, verified at
      [safer.fmcsa.dot.gov](https://safer.fmcsa.dot.gov)
- [ ] Real review count and rating, from a linkable source, in `business.reviews`
- [ ] Replace the six sample testimonials in `src/content/testimonials.ts` with
      genuine, attributable reviews
- [ ] Real or removed performance statistics (`18,400 moves`, `96% at or under
      estimate`)
- [ ] Confirm insurance limits against the current certificate
- [ ] Have `/privacy` and `/terms` reviewed by counsel

**Business details**

- [ ] Real phone number (`555-01XX` is a reserved fictional range)
- [ ] Confirmed address, with `geo` coordinates to match
- [ ] Confirmed founder story on `/about`
- [ ] Monitored inboxes for `email.general` and `email.careers`
- [ ] Social profile URLs in `business.social` (these feed `sameAs` schema)

**Technical**

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] `LEAD_PROVIDER` configured and a test lead received end to end
- [ ] Turnstile keys set (optional, recommended)
- [ ] Real photography replacing the `[ PHOTO SLOT ]` blocks, with alt text
- [ ] Google Business Profile created, with NAP matching the site exactly
- [ ] `sitemap.xml` submitted in Google Search Console
- [ ] Analytics configured

**Content**

- [ ] Flip the flags in `src/config/content-status.ts` as each item is verified
- [ ] Delete each cleared entry from `PLACEHOLDER_CLAIMS`
- [ ] Re-run `npm run audit:claims` until it reports zero

## Deployment

Any Node host works. On Vercel, set the environment variables from
`.env.example`, plus `SITE_ENV=production` so the claim guard runs on production
builds.

Almost every route is statically generated at build time; only `/api/og` renders
on demand. Rebuild to publish content changes.
