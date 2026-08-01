'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'

import { business } from '@/config/business'
import {
  findHomeSize,
  homeSizes,
  moveTypes,
  quoteAddons,
  wizardStepLabels,
  type MoveTypeId,
  type QuoteAddonId,
} from '@/content/move-options'
import { submitQuote } from '@/lib/leads/actions'
import { initialFormState } from '@/lib/leads/form-state'

const TOTAL_STEPS = 5

/** Which step a server-side validation error belongs to. */
const FIELD_STEP: Record<string, number> = {
  moveType: 1,
  origin: 2,
  destination: 2,
  homeSize: 3,
  targetDate: 4,
  addons: 4,
  name: 5,
  phone: 5,
  email: 5,
  notes: 5,
}

function WizardSteps({ current }: { current: number }) {
  return (
    <ol className="wizard__nav">
      {wizardStepLabels.map((label, index) => (
        <li
          key={label}
          data-current={current === index + 1}
          data-done={current > index + 1}
          aria-current={current === index + 1 ? 'step' : undefined}
        >
          <span className="wizard__dot" aria-hidden="true">
            {current > index + 1 ? '✓' : index + 1}
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  )
}

/** Sidebar + main column. Shared by the form and the confirmation screen. */
function WizardShell({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <section className="wizard">
      <aside className="wizard__aside">
        <p className="eyebrow">Free quote</p>
        <h1 className="h1 h1--quote">Five questions, then a real number.</h1>
        <p className="lede lede--sm">
          No account, no spam, no deposit. A coordinator reviews every request and calls within one
          business hour.
        </p>
        <WizardSteps current={step} />
        <div className="wizard__talk">
          <span className="label label--block">Prefer to talk?</span>
          <a href={business.phone.href} className="phone-link">
            {business.phone.display}
          </a>
        </div>
      </aside>
      <div className="wizard__main">{children}</div>
    </section>
  )
}

export function QuoteWizard() {
  const [state, formAction, isPending] = useActionState(submitQuote, initialFormState)

  const [step, setStep] = useState(1)
  const [moveType, setMoveType] = useState<MoveTypeId | ''>('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [homeSize, setHomeSize] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [addons, setAddons] = useState<QuoteAddonId[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  const startedAt = useRef(Date.now())
  const headingRef = useRef<HTMLHeadingElement>(null)
  const hasMounted = useRef(false)

  // The homepage estimator links across with ?size=3br — carry the choice over so
  // nobody answers the same question twice.
  //
  // Read after mount rather than with useSearchParams(): that hook makes the whole
  // wizard bail out to client rendering, which would ship this page with an empty
  // body — no H1, no copy, nothing for a crawler or a screen reader to find.
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get('size')
    if (preset && findHomeSize(preset)) setHomeSize(preset)
  }, [])

  // Move focus to the new step's heading so keyboard and screen-reader users are
  // not left at the bottom of the form after pressing Continue.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    headingRef.current?.focus()
  }, [step])

  // If the server rejects a field from an earlier step, jump back to it.
  useEffect(() => {
    if (state.status !== 'error' || !state.errors) return
    const steps = Object.keys(state.errors)
      .map((field) => FIELD_STEP[field])
      .filter((value): value is number => typeof value === 'number')
    if (steps.length > 0) setStep(Math.min(...steps))
  }, [state])

  const submitted = state.status === 'success'
  const errors = state.errors ?? {}

  /** Client-side gate so people are not sent to the server to be told the obvious. */
  function stepIsComplete(target: number): boolean {
    switch (target) {
      case 1:
        return moveType !== ''
      case 2:
        return origin.trim().length > 1 && destination.trim().length > 1
      case 3:
        return homeSize !== ''
      case 5:
        return name.trim().length > 1 && phone.trim().length > 0 && email.trim().length > 0
      default:
        return true
    }
  }

  const canAdvance = stepIsComplete(step)

  function toggleAddon(id: QuoteAddonId) {
    setAddons((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    )
  }

  if (submitted) {
    const size = findHomeSize(homeSize)
    const type = moveTypes.find((item) => item.id === moveType)
    const addonLabels = quoteAddons
      .filter((addon) => addons.includes(addon.id))
      .map((addon) => addon.label)

    const summary = [
      { k: 'Move type', v: type?.title ?? 'Not specified' },
      { k: 'Route', v: `${origin || 'Origin TBD'}  →  ${destination || 'Destination TBD'}` },
      { k: 'Home size', v: size?.label ?? 'Not specified' },
      { k: 'Target date', v: targetDate || 'Flexible' },
      { k: 'Add-ons', v: addonLabels.length ? addonLabels.join(', ') : 'None' },
      { k: 'Contact', v: `${name} · ${phone}` },
    ]

    return (
      <WizardShell step={TOTAL_STEPS + 1}>
        <div className="progress">
          <div className="progress__bar" style={{ width: '100%' }} />
        </div>
        <div className="wstep wstep--done">
          <div className="done__check" aria-hidden="true">
            ✓
          </div>
          <h2 className="done__title">Got it. We&rsquo;ll call within the hour.</h2>
          <p className="done__sub">
            Reference {state.reference}. A coordinator is reviewing your details now. If you need us
            sooner, call <a href={business.phone.href}>{business.phone.display}</a> and quote that
            reference.
          </p>
          <dl className="summary">
            {summary.map((row) => (
              <div className="summary__row" key={row.k}>
                <dt className="summary__k">{row.k}</dt>
                <dd className="summary__v">{row.v}</dd>
              </div>
            ))}
          </dl>
          <Link href="/" className="btn btn--outline btn--sm" style={{ marginTop: 26 }}>
            Back to the homepage
          </Link>
        </div>
      </WizardShell>
    )
  }

  return (
    <WizardShell step={step}>
    <form action={formAction} noValidate>
      {/* Anti-spam. The honeypot is off-screen rather than display:none so that
          headless bots reading computed styles still fill it in. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt.current} />

      {/* Every value posts from here, so steps can unmount freely. */}
      <input type="hidden" name="moveType" value={moveType} />
      <input type="hidden" name="origin" value={origin} />
      <input type="hidden" name="destination" value={destination} />
      <input type="hidden" name="homeSize" value={homeSize} />
      <input type="hidden" name="targetDate" value={targetDate} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="notes" value={notes} />
      {addons.map((addon) => (
        <input type="hidden" name="addons" value={addon} key={addon} />
      ))}

      <div className="progress">
        <div className="progress__bar" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </div>

      {state.status === 'error' && state.message ? (
        <div className="alert alert--error" role="alert" style={{ marginBottom: 28 }}>
          {state.message}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="wstep">
          <h2 className="wstep__title" tabIndex={-1} ref={headingRef}>
            What kind of move is this?
          </h2>
          <p className="wstep__sub">Pick the closest fit — we&rsquo;ll sort details on the call.</p>
          <div className="grid grid--2 grid--tight">
            {moveTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className="mtype"
                aria-pressed={moveType === type.id}
                onClick={() => {
                  setMoveType(type.id)
                  setStep(2)
                }}
              >
                <span className="mtype__title">{type.title}</span>
                <span className="mtype__desc">{type.desc}</span>
              </button>
            ))}
          </div>
          {errors.moveType ? <p className="field__error">{errors.moveType}</p> : null}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="wstep wstep--narrow">
          <h2 className="wstep__title" tabIndex={-1} ref={headingRef}>
            Where from, where to?
          </h2>
          <p className="wstep__sub">City and state is plenty for now.</p>
          <div className="stack">
            <div className="field">
              <label className="label label--block" htmlFor="q-origin">
                Moving from
              </label>
              <input
                id="q-origin"
                className="input"
                type="text"
                placeholder="Fort Lauderdale, FL"
                autoComplete="address-level2"
                value={origin}
                aria-invalid={Boolean(errors.origin)}
                aria-describedby={errors.origin ? 'q-origin-error' : undefined}
                onChange={(event) => setOrigin(event.target.value)}
              />
              {errors.origin ? (
                <p className="field__error" id="q-origin-error">
                  {errors.origin}
                </p>
              ) : null}
            </div>
            <div className="field">
              <label className="label label--block" htmlFor="q-destination">
                Moving to
              </label>
              <input
                id="q-destination"
                className="input"
                type="text"
                placeholder="Austin, TX"
                value={destination}
                aria-invalid={Boolean(errors.destination)}
                aria-describedby={errors.destination ? 'q-destination-error' : undefined}
                onChange={(event) => setDestination(event.target.value)}
              />
              {errors.destination ? (
                <p className="field__error" id="q-destination-error">
                  {errors.destination}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="wstep wstep--narrow">
          <h2 className="wstep__title" tabIndex={-1} ref={headingRef}>
            How big is the place?
          </h2>
          <p className="wstep__sub">This sets the crew and the truck.</p>
          <div className="grid grid--2 grid--tighter">
            {homeSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className="size-opt"
                aria-pressed={homeSize === size.id}
                onClick={() => setHomeSize(size.id)}
              >
                {size.label}
              </button>
            ))}
          </div>
          {errors.homeSize ? <p className="field__error">{errors.homeSize}</p> : null}
        </div>
      ) : null}

      {step === 4 ? (
        <div className="wstep wstep--narrow">
          <h2 className="wstep__title" tabIndex={-1} ref={headingRef}>
            When, and what else do you need?
          </h2>
          <p className="wstep__sub">Flexible dates usually mean better availability.</p>
          <div className="wstep__date">
            <label className="label label--block" htmlFor="q-date">
              Target date
            </label>
            <input
              id="q-date"
              className="input input--date"
              type="date"
              value={targetDate}
              onChange={(event) => setTargetDate(event.target.value)}
            />
            <p className="field__hint">Leave blank if you&rsquo;re flexible — it usually helps.</p>
          </div>
          <span className="label label--block" id="addons-label">
            Add-ons
          </span>
          <div className="chip-row" role="group" aria-labelledby="addons-label">
            {quoteAddons.map((addon) => (
              <button
                key={addon.id}
                type="button"
                className="chip chip--pill"
                aria-pressed={addons.includes(addon.id)}
                onClick={() => toggleAddon(addon.id)}
              >
                {addon.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="wstep wstep--narrow">
          <h2 className="wstep__title" tabIndex={-1} ref={headingRef}>
            Where should we send it?
          </h2>
          <p className="wstep__sub">One coordinator, one call. We never sell your info.</p>
          <div className="stack">
            <div className="field">
              <label className="label label--block" htmlFor="q-name">
                Name
              </label>
              <input
                id="q-name"
                className="input"
                type="text"
                placeholder="Jordan Reyes"
                autoComplete="name"
                value={name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'q-name-error' : undefined}
                onChange={(event) => setName(event.target.value)}
              />
              {errors.name ? (
                <p className="field__error" id="q-name-error">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div className="stack__pair">
              <div className="field">
                <label className="label label--block" htmlFor="q-phone">
                  Phone
                </label>
                <input
                  id="q-phone"
                  className="input"
                  type="tel"
                  placeholder="(954) 555-0123"
                  autoComplete="tel"
                  value={phone}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'q-phone-error' : undefined}
                  onChange={(event) => setPhone(event.target.value)}
                />
                {errors.phone ? (
                  <p className="field__error" id="q-phone-error">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <label className="label label--block" htmlFor="q-email">
                  Email
                </label>
                <input
                  id="q-email"
                  className="input"
                  type="email"
                  placeholder="jordan@email.com"
                  autoComplete="email"
                  value={email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'q-email-error' : undefined}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email ? (
                  <p className="field__error" id="q-email-error">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="field">
              <label className="label label--block" htmlFor="q-notes">
                Anything we should know? (optional)
              </label>
              <textarea
                id="q-notes"
                className="textarea"
                placeholder="Third-floor walk-up, a piano, a gate code — anything that changes the day."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="wizard__foot">
        {step > 1 ? (
          <button type="button" className="btn btn--outline" onClick={() => setStep(step - 1)}>
            ← Back
          </button>
        ) : null}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            className="btn btn--rust"
            aria-disabled={!canAdvance}
            onClick={() => {
              if (canAdvance) setStep(step + 1)
            }}
          >
            Continue →
          </button>
        ) : (
          <button type="submit" className="btn btn--rust" aria-disabled={!canAdvance || isPending}>
            {isPending ? (
              <>
                <span className="btn__spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              'Send my quote request'
            )}
          </button>
        )}

        <span className="wizard__counter">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>

      {!canAdvance ? (
        <p className="field__hint" role="status">
          {step === 1
            ? 'Pick a move type to continue.'
            : step === 2
              ? 'Add both a starting point and a destination to continue.'
              : step === 3
                ? 'Pick the size of the place to continue.'
                : 'Add your name, phone, and email to send the request.'}
        </p>
      ) : null}
    </form>
    </WizardShell>
  )
}
