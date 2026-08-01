/**
 * Preflight for lead delivery.
 *
 *   npm run check:email          → diagnose configuration, send nothing
 *   npm run check:email -- --send → also send a real test email
 *
 * Reads .env.local if present, otherwise the ambient environment (so it also
 * works on a host such as Vercel via `vercel env pull`).
 *
 * Never prints the API key. The most common failure is a LEAD_FROM_EMAIL on a
 * domain that has not been verified in Resend: the key is valid, the config
 * looks right, and every send returns 403. This checks for exactly that.
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const RESET = '\x1b[0m', BOLD = '\x1b[1m', DIM = '\x1b[2m'
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m'

const ok = (m) => console.log(`  ${GREEN}✓${RESET} ${m}`)
const bad = (m) => console.log(`  ${RED}✗${RESET} ${m}`)
const warn = (m) => console.log(`  ${YELLOW}!${RESET} ${m}`)
const info = (m) => console.log(`    ${DIM}${m}${RESET}`)

/** Minimal .env parser — enough for KEY=value with optional quotes. */
function loadEnvLocal() {
  const path = join(root, '.env.local')
  if (!existsSync(path)) return {}
  const out = {}
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

const fileEnv = loadEnvLocal()
const env = (key) => {
  const v = process.env[key] ?? fileEnv[key]
  return v && v.trim() !== '' ? v.trim() : undefined
}

const DEFAULT_INBOX = 'outofstatemovers@gmail.com'
const TEST_SENDER = 'onboarding@resend.dev'
const doSend = process.argv.includes('--send')

console.log(`\n${BOLD}Lead delivery preflight${RESET}`)
console.log(`${DIM}${'─'.repeat(66)}${RESET}`)
console.log(
  existsSync(join(root, '.env.local'))
    ? `${DIM}Reading .env.local${RESET}\n`
    : `${DIM}No .env.local — using the ambient environment${RESET}\n`,
)

let fatal = 0

// ── Provider ────────────────────────────────────────────────────────────────
const provider = (env('LEAD_PROVIDER') ?? 'console').toLowerCase()
console.log(`${BOLD}Provider${RESET}`)
if (provider === 'console') {
  warn('LEAD_PROVIDER=console — leads are logged, not emailed.')
  info('Set LEAD_PROVIDER=resend to actually send.')
} else if (['resend', 'formspree'].includes(provider)) {
  ok(`LEAD_PROVIDER=${provider}`)
} else {
  bad(`LEAD_PROVIDER="${provider}" is not recognised (use resend, formspree, or console).`)
  fatal++
}

// ── Recipient ───────────────────────────────────────────────────────────────
const to = env('LEAD_TO_EMAIL') ?? DEFAULT_INBOX
console.log(`\n${BOLD}Recipient${RESET}`)
ok(`Leads go to ${to}`)
if (!env('LEAD_TO_EMAIL')) info(`LEAD_TO_EMAIL not set — using the built-in default.`)

// ── Resend ──────────────────────────────────────────────────────────────────
if (provider === 'resend') {
  console.log(`\n${BOLD}Resend${RESET}`)
  const key = env('RESEND_API_KEY')
  if (!key) {
    bad('RESEND_API_KEY is not set.')
    fatal++
  } else {
    ok(`RESEND_API_KEY is set (${key.length} chars, not shown)`)

    let domains = null
    try {
      const res = await fetch('https://api.resend.com/domains', {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 401) {
        bad('Resend rejected the API key (401). Create a new key and update it.')
        fatal++
      } else if (!res.ok) {
        bad(`Resend returned ${res.status} listing domains.`)
        fatal++
      } else {
        const body = await res.json()
        domains = body.data ?? []
        ok('API key is valid')
      }
    } catch (error) {
      bad(`Could not reach Resend: ${error.message}`)
      fatal++
    }

    const from = env('LEAD_FROM_EMAIL')
    if (!from) {
      warn(`LEAD_FROM_EMAIL not set — falling back to ${TEST_SENDER}`)
      info('That sender ONLY delivers to the address that owns the Resend account.')
      info(`So this works only if the account owner is ${to}.`)
    } else {
      ok(`Sending from ${from}`)
      const domain = from.split('@')[1]?.toLowerCase()
      if (!domain) {
        bad(`LEAD_FROM_EMAIL="${from}" is not a valid email address.`)
        fatal++
      } else if (/^(gmail|googlemail|yahoo|outlook|hotmail|icloud|aol)\./.test(`${domain}.`)) {
        bad(`${domain} is a consumer mailbox provider — Resend cannot send from it.`)
        info('Sender must be a domain you own and have verified in Resend.')
        fatal++
      } else if (domains) {
        const match = domains.find((d) => d.name?.toLowerCase() === domain)
        if (!match) {
          bad(`${domain} is not added to this Resend account.`)
          info(`Domains on the account: ${domains.map((d) => d.name).join(', ') || '(none)'}`)
          info('Add it in Resend → Domains, complete the DNS records, then retry.')
          fatal++
        } else if (match.status !== 'verified') {
          bad(`${domain} is on the account but its status is "${match.status}", not "verified".`)
          info('Every send will fail with 403 until the DNS records are in place.')
          fatal++
        } else {
          ok(`${domain} is verified in Resend`)
        }
      }
    }
  }
}

if (provider === 'formspree') {
  console.log(`\n${BOLD}Formspree${RESET}`)
  if (env('FORMSPREE_FORM_ID')) ok('FORMSPREE_FORM_ID is set')
  else { bad('FORMSPREE_FORM_ID is not set.'); fatal++ }
}

// ── Optional live send ──────────────────────────────────────────────────────
if (doSend && provider === 'resend' && fatal === 0) {
  console.log(`\n${BOLD}Sending a test email${RESET}`)
  const key = env('RESEND_API_KEY')
  const from = env('LEAD_FROM_EMAIL') ?? TEST_SENDER
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `AllYouNeedMovers Website <${from}>`,
        to: to.split(',').map((a) => a.trim()),
        subject: 'AllYouNeedMovers — Delivery test — PREFLIGHT',
        text: [
          'AllYouNeedMovers — delivery test',
          '',
          'If you are reading this, quote requests, contact messages, and job',
          'applications from the website will reach this inbox.',
          '',
          `Sent from: ${from}`,
          `Sent to:   ${to}`,
        ].join('\n'),
      }),
    })
    if (res.ok) {
      ok(`Sent. Check ${to} (including spam).`)
    } else {
      const detail = await res.text()
      bad(`Resend returned ${res.status}: ${detail.slice(0, 240)}`)
      if (res.status === 403) info('403 almost always means the sending domain is not verified.')
      fatal++
    }
  } catch (error) {
    bad(`Send failed: ${error.message}`)
    fatal++
  }
} else if (!doSend && provider === 'resend') {
  console.log(`\n${DIM}Re-run with --send to send a real test email to ${to}.${RESET}`)
}

console.log(`\n${DIM}${'─'.repeat(66)}${RESET}`)
if (fatal === 0) {
  console.log(`${GREEN}${BOLD}Configuration looks good.${RESET}\n`)
  process.exit(0)
}
console.log(`${RED}${BOLD}${fatal} problem${fatal === 1 ? '' : 's'} found — forms will not deliver.${RESET}\n`)
process.exit(1)
