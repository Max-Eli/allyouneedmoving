'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import {
  estimateScope,
  estimatorExtras,
  homeSizes,
  type EstimatorExtraId,
} from '@/content/move-options'

export function MoveEstimator() {
  const [sizeId, setSizeId] = useState('2br')
  const [extras, setExtras] = useState<Partial<Record<EstimatorExtraId, boolean>>>({})

  const scope = useMemo(() => estimateScope(sizeId, extras), [sizeId, extras])

  return (
    <section className="section" id="estimator">
      <div className="split split--even">
        <div>
          <p className="eyebrow">Move estimator</p>
          <h2 className="h2">See what your move actually takes.</h2>
          <p className="lede">
            Tell us the size of your place and we&rsquo;ll size the crew, the truck, and the day.
            Your written price comes after a quick walkthrough — no games.
          </p>

          <div className="est__controls">
            <div>
              <div className="field__head">
                <span className="label" id="home-size-label">
                  Home size
                </span>
                <span className="field__value">{scope.size.label}</span>
              </div>
              <div className="chip-grid chip-grid--5" role="group" aria-labelledby="home-size-label">
                {homeSizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    className="chip"
                    aria-pressed={sizeId === size.id}
                    onClick={() => setSizeId(size.id)}
                  >
                    <span className="sr-only">{size.label}</span>
                    <span aria-hidden="true">{size.short}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label label--block" id="extras-label">
                Anything else?
              </span>
              <div className="chip-row" role="group" aria-labelledby="extras-label">
                {estimatorExtras.map((extra) => (
                  <button
                    key={extra.id}
                    type="button"
                    className="chip chip--pill"
                    aria-pressed={Boolean(extras[extra.id])}
                    onClick={() =>
                      setExtras((current) => ({ ...current, [extra.id]: !current[extra.id] }))
                    }
                  >
                    {extra.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="est__card">
          <div className="est__card-head">
            <span className="label">Your estimated scope</span>
            <span className="est__badge">NON-BINDING</span>
          </div>
          <div className="est__readout" aria-live="polite">
            {scope.cells.map((cell) => (
              <div className="est__cell" key={cell.label}>
                <div className="est__cell-label">{cell.label}</div>
                <div className="est__cell-value">{cell.value}</div>
                <div className="est__cell-note">{cell.note}</div>
              </div>
            ))}
          </div>
          <div className="est__foot">
            <p className="est__note">{scope.note}</p>
            <Link
              href={`/quote?size=${scope.size.id}`}
              className="btn btn--rust btn--block"
            >
              Turn this into a real quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
