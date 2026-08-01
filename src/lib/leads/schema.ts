import { z } from 'zod'

import { homeSizes, moveTypes, quoteAddons } from '@/content/move-options'

const sizeIds = homeSizes.map((size) => size.id) as [string, ...string[]]
const moveTypeIds = moveTypes.map((type) => type.id) as [string, ...string[]]
const addonIds = quoteAddons.map((addon) => addon.id) as [string, ...string[]]

/**
 * North American phone numbers, permissive about formatting. We care that a human
 * can be called back, not that the punctuation is canonical.
 */
const phone = z
  .string()
  .trim()
  .min(1, 'Add a phone number so a coordinator can reach you.')
  .transform((value) => value.replace(/[^\d+]/g, ''))
  .refine((value) => {
    const digits = value.replace(/\D/g, '')
    return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
  }, 'That doesn’t look like a 10-digit US phone number.')

const optionalPhone = z
  .string()
  .trim()
  .transform((value) => value.replace(/[^\d+]/g, ''))
  .refine((value) => {
    if (value === '') return true
    const digits = value.replace(/\D/g, '')
    return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
  }, 'That doesn’t look like a 10-digit US phone number.')
  .optional()

const email = z
  .string()
  .trim()
  .min(1, 'Add an email address.')
  .email('That doesn’t look like a valid email address.')
  .max(254)

const name = z
  .string()
  .trim()
  .min(2, 'Add your name.')
  .max(120, 'That name is too long.')

/**
 * Anti-spam fields present on every form.
 * - `company` is a honeypot: hidden from humans, filled in by naive bots.
 * - `startedAt` is the client timestamp when the form mounted; a submission
 *   faster than a few seconds is almost certainly automated.
 *
 * These deliberately accept anything. Rejecting a filled honeypot here would
 * surface a validation error naming the field, which tells a bot exactly what
 * to stop filling in. `checkSpam` handles them instead, and its rejections are
 * indistinguishable from success.
 */
export const spamFields = {
  company: z.string().max(200).optional(),
  startedAt: z.coerce.number().int().nonnegative().optional(),
  turnstileToken: z.string().optional(),
}

export const quoteLeadSchema = z.object({
  moveType: z.enum(moveTypeIds, { errorMap: () => ({ message: 'Pick the kind of move.' }) }),
  origin: z.string().trim().min(2, 'Where are you moving from?').max(160),
  destination: z.string().trim().min(2, 'Where are you moving to?').max(160),
  homeSize: z.enum(sizeIds, { errorMap: () => ({ message: 'Pick the size of the place.' }) }),
  targetDate: z.string().trim().max(40).optional().or(z.literal('')),
  addons: z.array(z.enum(addonIds)).max(quoteAddons.length).default([]),
  name,
  phone,
  email,
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
  ...spamFields,
})

export type QuoteLead = z.infer<typeof quoteLeadSchema>

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  topic: z.enum(['quote', 'existing-move', 'claim', 'billing', 'careers', 'other'], {
    errorMap: () => ({ message: 'Pick what this is about.' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little more — at least a sentence.')
    .max(4000, 'That message is too long. Email us directly instead.'),
  ...spamFields,
})

export type ContactMessage = z.infer<typeof contactSchema>

export const careersSchema = z.object({
  name,
  email,
  phone,
  position: z.enum(['mover', 'driver', 'foreman', 'packer', 'dispatch', 'office', 'other'], {
    errorMap: () => ({ message: 'Pick the role you’re applying for.' }),
  }),
  experience: z.enum(['none', 'under-1', '1-3', '3-plus'], {
    errorMap: () => ({ message: 'Pick your experience level.' }),
  }),
  cdl: z.enum(['yes', 'no']).optional(),
  message: z.string().trim().max(3000).optional().or(z.literal('')),
  ...spamFields,
})

export type CareersApplication = z.infer<typeof careersSchema>

/** Flatten zod errors into a field → message map the forms can render. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form'
    result[key] ??= issue.message
  }
  return result
}
