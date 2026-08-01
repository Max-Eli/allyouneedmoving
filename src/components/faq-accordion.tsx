'use client'

import { useId, useState } from 'react'

export interface AccordionItem {
  question: string
  answer: string
}

/**
 * Single-open accordion. The panel animates with a `grid-template-rows` 0fr→1fr
 * transition rather than a fixed max-height, so long answers are never clipped
 * and nothing has to be measured in JavaScript.
 */
export function FaqAccordion({
  items,
  defaultOpen = 0,
  white = false,
}: {
  items: AccordionItem[]
  defaultOpen?: number
  white?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className={`faq${white ? ' faq--white' : ''}`}>
      {items.map((item, index) => {
        const isOpen = open === index
        const buttonId = `${baseId}-q-${index}`
        const panelId = `${baseId}-p-${index}`

        return (
          <div className="faq__item" key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="faq__sign" aria-hidden="true">
                  {isOpen ? '–' : '+'}
                </span>
              </button>
            </h3>
            <div className="faq__panel" data-open={isOpen} id={panelId} role="region" aria-labelledby={buttonId}>
              <div>
                <p className="faq__a">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
