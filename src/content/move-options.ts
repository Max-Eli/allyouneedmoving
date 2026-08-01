export interface HomeSize {
  id: string
  short: string
  label: string
  crew: number
  truck: string
  hours: string
  boxes: number
}

export const homeSizes: HomeSize[] = [
  { id: 'studio', short: 'Studio', label: 'Studio / 1 room', crew: 2, truck: '16 ft', hours: '3–4', boxes: 20 },
  { id: '1br', short: '1 BR', label: '1 bedroom', crew: 2, truck: '20 ft', hours: '4–5', boxes: 30 },
  { id: '2br', short: '2 BR', label: '2 bedrooms', crew: 3, truck: '26 ft', hours: '5–7', boxes: 45 },
  { id: '3br', short: '3 BR', label: '3 bedrooms / house', crew: 4, truck: '26 ft', hours: '7–9', boxes: 65 },
  { id: '4br', short: '4+ BR', label: '4+ bedrooms / office', crew: 5, truck: '2 × 26 ft', hours: '9–12', boxes: 95 },
]

export const estimatorExtras = [
  { id: 'stairs', label: 'Stairs / walk-up' },
  { id: 'piano', label: 'Piano or safe' },
  { id: 'packing', label: 'Full packing' },
  { id: 'storage', label: 'Storage needed' },
] as const

export type EstimatorExtraId = (typeof estimatorExtras)[number]['id']

export const quoteAddons = [
  { id: 'packing', label: 'Packing service' },
  { id: 'unpacking', label: 'Unpacking' },
  { id: 'storage', label: 'Storage' },
  { id: 'piano', label: 'Piano / specialty' },
  { id: 'supplies', label: 'Boxes & supplies' },
  { id: 'disassembly', label: 'Furniture assembly' },
] as const

export type QuoteAddonId = (typeof quoteAddons)[number]['id']

export const moveTypes = [
  { id: 'local', title: 'Local move', desc: 'Within South Florida, same day' },
  { id: 'long', title: 'Long distance', desc: 'Out of state, anywhere in the 48' },
  { id: 'commercial', title: 'Commercial / office', desc: 'Business relocation, after hours' },
  { id: 'storage', title: 'Storage only', desc: 'Pickup, store, redeliver later' },
] as const

export type MoveTypeId = (typeof moveTypes)[number]['id']

export const wizardStepLabels = [
  'Move type',
  'Origin & destination',
  'Home size',
  'Date & add-ons',
  'Contact info',
]

export function findHomeSize(id: string | undefined): HomeSize | undefined {
  return homeSizes.find((size) => size.id === id)
}

/**
 * Crew, truck, hours, and carton count for a given home size and set of extras.
 * Shared by the homepage estimator and the quote wizard so both agree.
 */
export function estimateScope(sizeId: string, extras: Partial<Record<EstimatorExtraId, boolean>>) {
  const size = findHomeSize(sizeId) ?? homeSizes[2]!

  let crew = size.crew
  let boxes = size.boxes
  if (extras.stairs) crew += 1
  if (extras.piano) crew += 1
  if (extras.packing) boxes = Math.round(boxes * 1.25)

  const notes: string[] = []
  if (extras.stairs) notes.push('an extra mover for the walk-up')
  if (extras.piano) notes.push('a specialty crew and rigging gear')
  if (extras.packing) notes.push('a packing day the afternoon before')
  if (extras.storage) notes.push('a vault reserved at the Fort Lauderdale yard')

  const note = notes.length
    ? `Based on what you picked, we’d schedule ${notes.join(', ').replace(/,([^,]*)$/, ' and$1')}.`
    : 'Typical scope for this size. Stairs, long carries, and packing shift the crew — add them on the left.'

  return {
    size,
    crew,
    boxes,
    note,
    cells: [
      { label: 'Crew size', value: `${crew} movers`, note: 'Uniformed W-2 employees' },
      { label: 'Truck', value: size.truck, note: 'Lift gate and ramp included' },
      { label: 'On-site time', value: `${size.hours} hrs`, note: 'Load, drive, and unload' },
      { label: 'Box estimate', value: `~${boxes}`, note: 'Supplies delivered free' },
    ],
  }
}
