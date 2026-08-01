'use client'

import { useActionState, useRef } from 'react'

import { business } from '@/config/business'
import { submitApplication, submitContact } from '@/lib/leads/actions'
import { initialFormState } from '@/lib/leads/form-state'

/** Hidden honeypot plus the mount timestamp used by the timing check. */
function SpamFields({ startedAt }: { startedAt: number }) {
  return (
    <>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />
    </>
  )
}

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button type="submit" className="btn btn--rust btn--lg" aria-disabled={pending}>
      {pending ? (
        <>
          <span className="btn__spinner" aria-hidden="true" />
          Sending…
        </>
      ) : (
        label
      )}
    </button>
  )
}

function Success({ reference, children }: { reference?: string; children: React.ReactNode }) {
  return (
    <div className="alert alert--success" role="status">
      <p>{children}</p>
      {reference ? <p style={{ marginTop: 8 }}>Reference {reference}</p> : null}
    </div>
  )
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialFormState)
  const startedAt = useRef(Date.now())
  const errors = state.errors ?? {}

  if (state.status === 'success') {
    return (
      <Success reference={state.reference}>
        Thanks — that&rsquo;s with the office. Someone will reply within one business hour during
        opening times. If it&rsquo;s urgent, call {business.phone.display}.
      </Success>
    )
  }

  return (
    <form action={formAction} noValidate className="stack">
      <SpamFields startedAt={startedAt.current} />

      {state.message ? (
        <div className="alert alert--error" role="alert">
          {state.message}
        </div>
      ) : null}

      <div className="field">
        <label className="label label--block" htmlFor="c-name">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          className="input"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'c-name-error' : undefined}
        />
        {errors.name ? (
          <p className="field__error" id="c-name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="stack__pair">
        <div className="field">
          <label className="label label--block" htmlFor="c-email">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            className="input"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'c-email-error' : undefined}
          />
          {errors.email ? (
            <p className="field__error" id="c-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label className="label label--block" htmlFor="c-phone">
            Phone (optional)
          </label>
          <input
            id="c-phone"
            name="phone"
            className="input"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'c-phone-error' : undefined}
          />
          {errors.phone ? (
            <p className="field__error" id="c-phone-error">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label className="label label--block" htmlFor="c-topic">
          What&rsquo;s this about?
        </label>
        <select
          id="c-topic"
          name="topic"
          className="select"
          defaultValue="quote"
          aria-invalid={Boolean(errors.topic)}
        >
          <option value="quote">A new quote</option>
          <option value="existing-move">An existing move</option>
          <option value="claim">A damage claim</option>
          <option value="billing">Billing</option>
          <option value="careers">Careers</option>
          <option value="other">Something else</option>
        </select>
        {errors.topic ? <p className="field__error">{errors.topic}</p> : null}
      </div>

      <div className="field">
        <label className="label label--block" htmlFor="c-message">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          className="textarea"
          placeholder="Tell us the dates, the addresses, and anything unusual about the job."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'c-message-error' : undefined}
        />
        {errors.message ? (
          <p className="field__error" id="c-message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <SubmitButton label="Send message" pending={isPending} />
      </div>
    </form>
  )
}

export function CareersForm() {
  const [state, formAction, isPending] = useActionState(submitApplication, initialFormState)
  const startedAt = useRef(Date.now())
  const errors = state.errors ?? {}

  if (state.status === 'success') {
    return (
      <Success reference={state.reference}>
        Application received. If your experience fits an open crew, someone from the yard will call
        you within a few days.
      </Success>
    )
  }

  return (
    <form action={formAction} noValidate className="stack">
      <SpamFields startedAt={startedAt.current} />

      {state.message ? (
        <div className="alert alert--error" role="alert">
          {state.message}
        </div>
      ) : null}

      <div className="field">
        <label className="label label--block" htmlFor="j-name">
          Name
        </label>
        <input
          id="j-name"
          name="name"
          className="input"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="field__error">{errors.name}</p> : null}
      </div>

      <div className="stack__pair">
        <div className="field">
          <label className="label label--block" htmlFor="j-phone">
            Phone
          </label>
          <input
            id="j-phone"
            name="phone"
            className="input"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className="field__error">{errors.phone}</p> : null}
        </div>
        <div className="field">
          <label className="label label--block" htmlFor="j-email">
            Email
          </label>
          <input
            id="j-email"
            name="email"
            className="input"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="field__error">{errors.email}</p> : null}
        </div>
      </div>

      <div className="stack__pair">
        <div className="field">
          <label className="label label--block" htmlFor="j-position">
            Position
          </label>
          <select id="j-position" name="position" className="select" defaultValue="mover">
            <option value="mover">Mover / helper</option>
            <option value="driver">CDL driver</option>
            <option value="foreman">Crew foreman</option>
            <option value="packer">Packer</option>
            <option value="dispatch">Dispatch</option>
            <option value="office">Office / coordinator</option>
            <option value="other">Other</option>
          </select>
          {errors.position ? <p className="field__error">{errors.position}</p> : null}
        </div>
        <div className="field">
          <label className="label label--block" htmlFor="j-experience">
            Moving experience
          </label>
          <select id="j-experience" name="experience" className="select" defaultValue="none">
            <option value="none">None — willing to learn</option>
            <option value="under-1">Less than a year</option>
            <option value="1-3">1–3 years</option>
            <option value="3-plus">3+ years</option>
          </select>
          {errors.experience ? <p className="field__error">{errors.experience}</p> : null}
        </div>
      </div>

      <div className="field">
        <label className="label label--block" htmlFor="j-cdl">
          Do you hold a CDL?
        </label>
        <select id="j-cdl" name="cdl" className="select" defaultValue="no">
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div className="field">
        <label className="label label--block" htmlFor="j-message">
          Anything else? (optional)
        </label>
        <textarea
          id="j-message"
          name="message"
          className="textarea"
          placeholder="Availability, certifications, or where you're currently working."
        />
      </div>

      <div>
        <SubmitButton label="Send application" pending={isPending} />
      </div>
    </form>
  )
}
