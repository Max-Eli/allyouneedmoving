import 'server-only'

import { business } from '@/config/business'

/**
 * Lead delivery adapters. Switch with LEAD_PROVIDER in the environment; no other
 * file needs to change.
 *
 *   console  — logs the lead. Development default and the safe fallback.
 *   resend   — transactional email. Needs a verified sending domain.
 *   formspree — forwards to an inbox. No domain setup required.
 */

export interface LeadPayload {
  /** Shown in the email subject, e.g. "New quote request". */
  kind: string
  reference: string
  /** Ordered label/value pairs rendered into the notification. */
  fields: { label: string; value: string }[]
  /** Customer address, used for Reply-To so the office can just hit reply. */
  replyTo?: string
}

export type DeliveryResult = { ok: true } | { ok: false; error: string }

function renderText(payload: LeadPayload): string {
  const lines = [
    payload.kind,
    `Reference: ${payload.reference}`,
    `Received: ${new Date().toISOString()}`,
    '',
    ...payload.fields.map((field) => `${field.label}: ${field.value}`),
  ]
  return lines.join('\n')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderHtml(payload: LeadPayload): string {
  const rows = payload.fields
    .map(
      (field) =>
        `<tr>` +
        `<td style="padding:8px 16px 8px 0;font:600 12px/1.5 Arial,sans-serif;color:#6B675E;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${escapeHtml(field.label)}</td>` +
        `<td style="padding:8px 0;font:400 15px/1.5 Arial,sans-serif;color:#1B1A17">${escapeHtml(field.value).replace(/\n/g, '<br>')}</td>` +
        `</tr>`,
    )
    .join('')

  return [
    `<div style="font-family:Arial,sans-serif;color:#1B1A17;max-width:640px">`,
    `<h1 style="font-size:20px;margin:0 0 4px">${escapeHtml(payload.kind)}</h1>`,
    `<p style="margin:0 0 20px;color:#6B675E;font-size:13px">Reference ${escapeHtml(payload.reference)}</p>`,
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">${rows}</table>`,
    `<p style="margin:24px 0 0;color:#8A8478;font-size:12px">Sent by the ${escapeHtml(business.name)} website.</p>`,
    `</div>`,
  ].join('')
}

async function deliverViaResend(payload: LeadPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEAD_FROM_EMAIL
  const to = process.env.LEAD_TO_EMAIL

  if (!apiKey || !from || !to) {
    return { ok: false, error: 'Resend is selected but RESEND_API_KEY, LEAD_FROM_EMAIL, or LEAD_TO_EMAIL is missing.' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${business.name} Website <${from}>`,
        to: to.split(',').map((address) => address.trim()),
        subject: `${payload.kind} — ${payload.reference}`,
        text: renderText(payload),
        html: renderHtml(payload),
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const detail = await response.text()
      return { ok: false, error: `Resend responded ${response.status}: ${detail.slice(0, 300)}` }
    }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown Resend failure.' }
  }
}

async function deliverViaFormspree(payload: LeadPayload): Promise<DeliveryResult> {
  const formId = process.env.FORMSPREE_FORM_ID
  if (!formId) {
    return { ok: false, error: 'Formspree is selected but FORMSPREE_FORM_ID is missing.' }
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `${payload.kind} — ${payload.reference}`,
        ...(payload.replyTo ? { email: payload.replyTo } : {}),
        reference: payload.reference,
        ...Object.fromEntries(payload.fields.map((field) => [field.label, field.value])),
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const detail = await response.text()
      return { ok: false, error: `Formspree responded ${response.status}: ${detail.slice(0, 300)}` }
    }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown Formspree failure.' }
  }
}

function deliverViaConsole(payload: LeadPayload): DeliveryResult {
  console.info(
    `\n──────────── LEAD (LEAD_PROVIDER=console, nothing was sent) ────────────\n` +
      renderText(payload) +
      `\n────────────────────────────────────────────────────────────────────────\n`,
  )
  return { ok: true }
}

export async function deliverLead(payload: LeadPayload): Promise<DeliveryResult> {
  const provider = (process.env.LEAD_PROVIDER ?? 'console').toLowerCase()

  switch (provider) {
    case 'resend':
      return deliverViaResend(payload)
    case 'formspree':
      return deliverViaFormspree(payload)
    case 'console':
      return deliverViaConsole(payload)
    default:
      return { ok: false, error: `Unknown LEAD_PROVIDER "${provider}". Use resend, formspree, or console.` }
  }
}
