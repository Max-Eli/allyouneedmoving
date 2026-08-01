import 'server-only'

/**
 * Layered, no-dependency spam defence:
 *
 *   1. Honeypot   — a hidden `company` field. Humans never fill it in.
 *   2. Timing     — a form completed in under 3 seconds was not read.
 *   3. Turnstile  — Cloudflare's privacy-preserving challenge, if configured.
 *
 * Layers 1 and 2 always run. Layer 3 activates as soon as TURNSTILE_SECRET_KEY
 * is set, so it can be added later without touching form code.
 */

const MIN_FILL_MS = 3_000

export type SpamVerdict = { ok: true } | { ok: false; reason: string }

interface SpamInput {
  company?: string
  startedAt?: number
  turnstileToken?: string
}

export async function checkSpam(input: SpamInput): Promise<SpamVerdict> {
  if (input.company && input.company.trim() !== '') {
    return { ok: false, reason: 'honeypot' }
  }

  if (typeof input.startedAt === 'number' && input.startedAt > 0) {
    const elapsed = Date.now() - input.startedAt
    // A negative elapsed time means a forged or clock-skewed timestamp.
    if (elapsed < MIN_FILL_MS) {
      return { ok: false, reason: 'too-fast' }
    }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (secret) {
    if (!input.turnstileToken) {
      return { ok: false, reason: 'turnstile-missing' }
    }

    try {
      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: input.turnstileToken }),
        cache: 'no-store',
      })
      const result = (await response.json()) as { success?: boolean }
      if (!result.success) {
        return { ok: false, reason: 'turnstile-failed' }
      }
    } catch {
      // A Turnstile outage should not block genuine leads. Fail open and let the
      // honeypot and timing checks carry the load.
      return { ok: true }
    }
  }

  return { ok: true }
}

/**
 * Reference shown to the customer and used as the email subject line.
 * Format: AYN-YYMMDD-XXXX
 */
export function generateReference(): string {
  const now = new Date()
  const stamp = [
    String(now.getUTCFullYear()).slice(2),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0'),
  ].join('')
  const random = Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, '0')
  return `AYN-${stamp}-${random}`
}
