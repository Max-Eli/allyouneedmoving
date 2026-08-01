import { business } from '@/config/business'

export const processSteps = [
  {
    n: '1',
    title: 'Tell us the scope',
    body: 'Five questions online or one phone call. Video walkthrough for bigger homes.',
  },
  {
    n: '2',
    title: 'Get it in writing',
    body: 'A binding estimate with the crew size, truck, and window — no asterisks.',
  },
  {
    n: '3',
    title: 'We wrap and load',
    body: 'Pads, shrink, floor runners. Every item inventoried before it hits the truck.',
  },
  {
    n: '4',
    title: 'Set up, not dumped',
    body: 'Beds rebuilt, boxes in the right rooms, debris gone before we leave.',
  },
]

export const values = [
  {
    title: 'The estimate is the price',
    body: 'Scope-binding quotes. If nothing changed between the walkthrough and moving day, neither does the number on the invoice.',
  },
  {
    title: 'Employees, never day labor',
    body: 'Every mover is a W-2 employee, background-checked, uniformed, and trained in-house for at least three weeks before they touch your furniture.',
  },
  {
    title: 'One crew, end to end',
    body: 'On long-distance jobs the same team loads and unloads. Your things never sit in a transfer warehouse waiting for a stranger.',
  },
  {
    title: 'We fix what we break',
    body: 'Damage claims are handled by our own office, not an outside adjuster. Most are resolved inside two weeks.',
  },
]

/** Gated behind contentStatus.statsVerified until the figures are real. */
export const stats = [
  { n: business.stats.movesCompleted, label: `Moves completed since ${business.founded}` },
  { n: business.stats.trucks, label: 'Trucks across two yards' },
  { n: business.stats.onOrUnderEstimate, label: 'Jobs finished at or under estimate' },
  { n: business.stats.statesAuthorized, label: 'States we hold authority in' },
]

export const credentials = [
  { label: 'Florida mover registration', value: business.licenses.floridaIntrastate },
  { label: 'US DOT number', value: business.licenses.usdot },
  { label: 'Motor carrier number', value: business.licenses.mc },
  { label: 'General liability', value: business.insurance.generalLiability },
  { label: 'Cargo coverage', value: business.insurance.cargo },
  { label: 'Workers’ compensation', value: business.insurance.workersComp },
]

export const marqueeItems = [
  'LICENSED & INSURED',
  'FLAT-RATE OPTIONS',
  'NO HIDDEN FEES',
  'SAME-WEEK AVAILABILITY',
  'FULL-VALUE PROTECTION',
  'CLIMATE-CONTROLLED STORAGE',
  'W-2 CREWS, NEVER DAY LABOR',
]
