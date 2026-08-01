'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

import { Photo } from '@/components/photo'
import { areaPhotos } from '@/content/images'
import { localZipPrefixes, serviceAreas } from '@/content/service-areas'

type Result =
  | { kind: 'local'; title: string; body: string; areaHref?: string; areaName?: string }
  | { kind: 'long'; title: string; body: string }
  | { kind: 'invalid'; title: string; body: string }

function checkZip(zip: string): Result {
  if (zip.length !== 5) {
    return {
      kind: 'invalid',
      title: 'That ZIP doesn’t look right.',
      body: 'Enter all five digits and try again.',
    }
  }

  const match = serviceAreas.find((area) => area.zips.includes(zip))
  if (match) {
    return {
      kind: 'local',
      title: `Good news — we run ${match.city} daily.`,
      body: `${match.driveTime}. Same-week availability is common, hourly or flat rate, your choice.`,
      areaHref: `/service-areas/${match.slug}`,
      areaName: match.city,
    }
  }

  if (localZipPrefixes.includes(zip.slice(0, 3))) {
    return {
      kind: 'local',
      title: 'Good news — local crews run here daily.',
      body: 'Same-week availability is common. Hourly or flat rate, your choice.',
    }
  }

  return {
    kind: 'long',
    title: 'Outside South Florida — we run it long distance.',
    body: 'Dedicated truck, same crew both ends, 1–3 day delivery window in writing.',
  }
}

export function ZipChecker() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setResult(checkZip(zip))
  }

  return (
    <section className="section section--sand" id="service-area">
      <div className="split split--zip">
        <div>
          <p className="eyebrow">Service area</p>
          <h2 className="h2 h2--md">Do we cover your ZIP?</h2>
          <p className="lede lede--narrow">
            Local crews run daily out of Fort Lauderdale, Miami, and West Palm. Everywhere else in
            the country, we run it as a long-distance job.
          </p>

          <form className="zip__form" onSubmit={onSubmit} noValidate>
            <label className="sr-only" htmlFor="zip-input">
              ZIP code
            </label>
            <input
              id="zip-input"
              className="input input--zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter your ZIP"
              autoComplete="postal-code"
              value={zip}
              onChange={(event) => setZip(event.target.value.replace(/\D/g, '').slice(0, 5))}
            />
            <button type="submit" className="btn btn--ink">
              Check
            </button>
          </form>

          <div className="zip__result-wrap" aria-live="polite">
            {result ? (
              <div className="zip__result">
                <p className="zip__title">{result.title}</p>
                <p className="zip__body">
                  {result.body}{' '}
                  {result.kind === 'local' && result.areaHref ? (
                    <Link href={result.areaHref}>See our {result.areaName} page →</Link>
                  ) : null}
                  {result.kind === 'long' ? (
                    <Link href="/services/long-distance-moving">How long distance works →</Link>
                  ) : null}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <Photo
          photo={areaPhotos['fort-lauderdale']!}
          variant="short"
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
    </section>
  )
}
