/**
 * SAMPLE CONTENT — these are not real customer reviews.
 *
 * They came from the design mockup and exist so the layout can be reviewed.
 * `contentStatus.testimonialsVerified` is false, so every surface that renders
 * them shows a sample-content notice and they are excluded from structured data.
 *
 * Replace with genuine, attributable reviews before launch. Publishing invented
 * testimonials violates the FTC Rule on Consumer Reviews and Testimonials
 * (16 CFR Part 465).
 */
export interface Testimonial {
  quote: string
  name: string
  meta: string
  rating: number
  /** Set once the review is traceable to a real, linkable source. */
  sourceUrl?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Three-bedroom in Coral Springs to Nashville. Same four guys loaded us Tuesday and unloaded us Thursday morning — nothing broken, nothing missing, and the final invoice matched the estimate to the dollar.',
    name: 'Danielle R.',
    meta: 'Coral Springs → Nashville · Long distance',
    rating: 5,
  },
  {
    quote:
      'We moved a 40-person office over a weekend and were fully operational Monday at 9. They labeled every workstation and rebuilt the desks exactly where the floor plan said.',
    name: 'Andre M.',
    meta: 'Brickell · Commercial',
    rating: 5,
  },
  {
    quote:
      'My mother is 84 and downsizing was brutal for her emotionally. The crew was patient in a way I did not expect from movers. They packed her china themselves and nothing chipped.',
    name: 'Sofia L.',
    meta: 'Boca Raton · Senior move',
    rating: 5,
  },
  {
    quote:
      "Called Thursday, moved Saturday. The quote was over the phone and it held. I've used four moving companies in Miami and this is the first one I'd call again.",
    name: 'Kevin T.',
    meta: 'Miami Beach → Doral · Local',
    rating: 5,
  },
  {
    quote:
      'They stored our whole house for eleven weeks while our closing dragged out. Climate-controlled, itemized inventory, and redelivery was scheduled in one phone call.',
    name: 'Priya N.',
    meta: 'Weston · Storage + local',
    rating: 5,
  },
  {
    quote:
      'The estimator walked the garage and the attic, which nobody else bothered to do, and the binding number never moved. That is the whole review.',
    name: 'Marcus B.',
    meta: 'Fort Lauderdale · Local',
    rating: 5,
  },
]
