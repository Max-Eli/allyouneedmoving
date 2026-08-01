export interface Faq {
  question: string
  answer: string
  category: 'Booking' | 'Pricing' | 'Coverage' | 'Logistics' | 'Long distance'
}

/**
 * General FAQ. Service-specific questions live on each service page in
 * src/content/services.ts so the FAQPage schema on those pages stays relevant.
 */
export const faqs: Faq[] = [
  {
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer:
      'Two to three weeks is comfortable for a local move, four to six for long distance or anything at the end of the month. That said, we hold same-week slots for cancellations — call and ask.',
  },
  {
    category: 'Pricing',
    question: 'Is the quote binding?',
    answer:
      'Your written estimate is binding on scope. If the inventory we quoted is the inventory that shows up on moving day, the price does not move. Add a garage full of boxes we never saw and we re-quote on the spot before we load.',
  },
  {
    category: 'Coverage',
    question: 'Are you licensed and insured?',
    answer:
      'Yes. Our Florida intrastate mover registration, USDOT number, and motor carrier number are listed in the footer of every page and can be checked against the public FMCSA register. Every move includes released-value coverage, and full-value protection is available for a flat add-on.',
  },
  {
    category: 'Logistics',
    question: 'Do you move pianos, safes, and pool tables?',
    answer:
      'Yes. Uprights, baby grands, gun safes, slate pool tables, and oversized art all get a specialty crew with the right dollies, skid boards, and crating. Mention it when you book so we schedule the equipment.',
  },
  {
    category: 'Logistics',
    question: 'What can you not move?',
    answer:
      'Federal rules keep us from hauling propane, gasoline, paint, ammunition, aerosols, and perishables. We also ask you to carry jewelry, cash, medications, and passports yourself.',
  },
  {
    category: 'Long distance',
    question: 'How does long-distance delivery work?',
    answer:
      'Dedicated trucks, not shared freight. The crew that loads you is the crew that unloads you, and we give a delivery window of one to three days rather than the two-week spreads brokers quote.',
  },
  {
    category: 'Pricing',
    question: 'Do you require a deposit?',
    answer:
      'No deposit to book a local move. Long-distance jobs are confirmed with a deposit that is credited in full against the final invoice, and it is refundable if you cancel with more than seven days notice.',
  },
  {
    category: 'Pricing',
    question: 'What forms of payment do you accept?',
    answer:
      'Credit card, debit, ACH, certified check, or cash. Payment is due on delivery, before the truck is unloaded on interstate jobs, which is the standard the federal tariff requires.',
  },
  {
    category: 'Coverage',
    question: 'What is the difference between released value and full-value protection?',
    answer:
      'Released value is the free federal minimum: 60 cents per pound per article, so a 40-pound television is covered for $24. Full-value protection means we repair, replace, or pay the current market value of a damaged item. It costs extra, and for most households it is worth it.',
  },
  {
    category: 'Coverage',
    question: 'What happens if something gets damaged?',
    answer:
      'Note it on the inventory sheet at delivery and call the office. Claims are handled in-house rather than by an outside adjuster, and most are resolved inside two weeks. You have nine months from delivery to file a written claim on an interstate move.',
  },
  {
    category: 'Booking',
    question: 'Can I change my moving date after booking?',
    answer:
      'Yes, subject to availability, and there is no change fee if you give us more than seven days notice. During hurricane season we will move your date at no charge rather than load a truck into a named storm.',
  },
  {
    category: 'Logistics',
    question: 'Do I need to be there on moving day?',
    answer:
      'Someone authorised has to be present at both ends to walk the inventory, sign the paperwork, and direct placement. It does not have to be you, but it has to be someone empowered to make decisions.',
  },
  {
    category: 'Logistics',
    question: 'Do you disassemble and reassemble furniture?',
    answer:
      'Yes, for standard beds, tables, and modular sofas, and it is included. Hardware goes into a labelled bag taped to the frame. Proprietary systems that need a certified installer are the exception — we will tell you before the day if yours is one.',
  },
  {
    category: 'Booking',
    question: 'How do you handle hurricane season?',
    answer:
      'From June through November we watch the forecast cone against your date. If a named storm is likely to affect either end of the move, we reschedule at no charge. We will not load a truck into a storm to hold a date.',
  },
]

export const faqCategories = Array.from(new Set(faqs.map((faq) => faq.category)))

/** The six shown on the homepage. */
export const homepageFaqs = faqs.slice(0, 6)
