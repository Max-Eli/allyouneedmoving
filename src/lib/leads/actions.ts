'use server'

import { findHomeSize, moveTypes, quoteAddons } from '@/content/move-options'

import type { FormState } from './form-state'
import { deliverLead } from './providers'
import { careersSchema, contactSchema, fieldErrors, quoteLeadSchema } from './schema'
import { checkSpam, generateReference } from './spam'

function readCommon(formData: FormData) {
  return {
    company: (formData.get('company') as string | null) ?? '',
    startedAt: Number(formData.get('startedAt') ?? 0),
    turnstileToken: (formData.get('cf-turnstile-response') as string | null) ?? undefined,
  }
}

/**
 * Spam submissions get the same success response a real one would. Telling a bot
 * it was blocked just tells it what to change.
 */
function silentSuccess(): FormState {
  return { status: 'success', reference: generateReference() }
}

function deliveryFailure(error: string): FormState {
  // Log the detail server-side; never leak provider errors to the browser.
  console.error('[leads] delivery failed:', error)
  return {
    status: 'error',
    message:
      'We couldn’t send that just now. Please call the office and we’ll take the details over the phone.',
  }
}

export async function submitQuote(_previous: FormState, formData: FormData): Promise<FormState> {
  const common = readCommon(formData)

  const parsed = quoteLeadSchema.safeParse({
    moveType: formData.get('moveType'),
    origin: formData.get('origin'),
    destination: formData.get('destination'),
    homeSize: formData.get('homeSize'),
    targetDate: formData.get('targetDate') ?? '',
    addons: formData.getAll('addons'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    notes: formData.get('notes') ?? '',
    ...common,
  })

  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error) }
  }

  const verdict = await checkSpam(parsed.data)
  if (!verdict.ok) return silentSuccess()

  const lead = parsed.data
  const reference = generateReference()

  const moveType = moveTypes.find((type) => type.id === lead.moveType)
  const size = findHomeSize(lead.homeSize)
  const addonLabels = quoteAddons
    .filter((addon) => lead.addons.includes(addon.id))
    .map((addon) => addon.label)

  const result = await deliverLead({
    kind: 'New quote request',
    reference,
    replyTo: lead.email,
    fields: [
      { label: 'Name', value: lead.name },
      { label: 'Phone', value: lead.phone },
      { label: 'Email', value: lead.email },
      { label: 'Move type', value: moveType?.title ?? lead.moveType },
      { label: 'Moving from', value: lead.origin },
      { label: 'Moving to', value: lead.destination },
      { label: 'Home size', value: size?.label ?? lead.homeSize },
      { label: 'Target date', value: lead.targetDate || 'Flexible' },
      { label: 'Add-ons', value: addonLabels.length ? addonLabels.join(', ') : 'None' },
      { label: 'Notes', value: lead.notes || '—' },
    ],
  })

  if (!result.ok) return deliveryFailure(result.error)

  return { status: 'success', reference }
}

export async function submitContact(_previous: FormState, formData: FormData): Promise<FormState> {
  const common = readCommon(formData)

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? '',
    topic: formData.get('topic'),
    message: formData.get('message'),
    ...common,
  })

  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error) }
  }

  const verdict = await checkSpam(parsed.data)
  if (!verdict.ok) return silentSuccess()

  const message = parsed.data
  const reference = generateReference()

  const topicLabels: Record<string, string> = {
    quote: 'New quote',
    'existing-move': 'An existing move',
    claim: 'A damage claim',
    billing: 'Billing',
    careers: 'Careers',
    other: 'Something else',
  }

  const result = await deliverLead({
    kind: 'Website contact message',
    reference,
    replyTo: message.email,
    fields: [
      { label: 'Name', value: message.name },
      { label: 'Email', value: message.email },
      { label: 'Phone', value: message.phone || '—' },
      { label: 'About', value: topicLabels[message.topic] ?? message.topic },
      { label: 'Message', value: message.message },
    ],
  })

  if (!result.ok) return deliveryFailure(result.error)

  return { status: 'success', reference }
}

export async function submitApplication(_previous: FormState, formData: FormData): Promise<FormState> {
  const common = readCommon(formData)

  const parsed = careersSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    position: formData.get('position'),
    experience: formData.get('experience'),
    cdl: formData.get('cdl') ?? undefined,
    message: formData.get('message') ?? '',
    ...common,
  })

  if (!parsed.success) {
    return { status: 'error', errors: fieldErrors(parsed.error) }
  }

  const verdict = await checkSpam(parsed.data)
  if (!verdict.ok) return silentSuccess()

  const application = parsed.data
  const reference = generateReference()

  const positionLabels: Record<string, string> = {
    mover: 'Mover / helper',
    driver: 'CDL driver',
    foreman: 'Crew foreman',
    packer: 'Packer',
    dispatch: 'Dispatch',
    office: 'Office / coordinator',
    other: 'Other',
  }

  const experienceLabels: Record<string, string> = {
    none: 'No moving experience',
    'under-1': 'Less than 1 year',
    '1-3': '1–3 years',
    '3-plus': '3+ years',
  }

  const result = await deliverLead({
    kind: 'Job application',
    reference,
    replyTo: application.email,
    fields: [
      { label: 'Name', value: application.name },
      { label: 'Phone', value: application.phone },
      { label: 'Email', value: application.email },
      { label: 'Position', value: positionLabels[application.position] ?? application.position },
      { label: 'Experience', value: experienceLabels[application.experience] ?? application.experience },
      { label: 'CDL', value: application.cdl === 'yes' ? 'Yes' : 'No' },
      { label: 'Notes', value: application.message || '—' },
    ],
  })

  if (!result.ok) return deliveryFailure(result.error)

  return { status: 'success', reference }
}
