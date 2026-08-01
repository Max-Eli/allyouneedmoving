/**
 * Photography manifest.
 *
 * Alt text lives next to the file it describes so the two cannot drift. Every
 * image is from Unsplash under the Unsplash License (free commercial use, no
 * attribution required); photographer credits are recorded in
 * public/images/CREDITS.md as a courtesy.
 *
 * Alt text describes what is actually in the frame. These are stock photographs,
 * not photographs of this company's crews, trucks, or premises — so none of the
 * alt text claims otherwise. Replace them with real company photography before
 * launch and the alt text can become specific.
 */

export interface SitePhoto {
  src: string
  alt: string
}

export const photos = {
  // Deliberately unbranded. An earlier candidate showed a courier-liveried truck,
  // which on a moving company's homepage would imply an affiliation that does not
  // exist. Check any replacement for third-party logos before using it.
  heroMovingDay: {
    src: '/images/hero-moving-day.jpg',
    alt: 'Two people carrying a cardboard carton through the front door of a home on moving day.',
  },
  fleetTruck: {
    src: '/images/fleet-truck.jpg',
    alt: 'A white tractor unit parked on open tarmac under a clear sky.',
  },
  warehouseInterior: {
    src: '/images/warehouse-interior.jpg',
    alt: 'The inside of a warehouse with palletised goods stacked in rows.',
  },
  careersTruck: {
    src: '/images/careers-truck.jpg',
    alt: 'A red tractor unit and trailer on an open road.',
  },
} as const satisfies Record<string, SitePhoto>

/** Keyed by service slug. */
export const servicePhotos: Record<string, SitePhoto> = {
  'local-moving': {
    src: '/images/service-local-moving.jpg',
    alt: 'A room filled with cardboard cartons stacked from floor to ceiling.',
  },
  'long-distance-moving': {
    src: '/images/service-long-distance.jpg',
    alt: 'An articulated lorry travelling along an open highway.',
  },
  'packing-unpacking': {
    src: '/images/service-packing.jpg',
    alt: 'A cardboard carton sealed with red and white FRAGILE tape.',
  },
  storage: {
    src: '/images/service-storage.jpg',
    alt: 'An aisle of tall warehouse racking stacked with palletised cartons.',
  },
  'piano-specialty-moving': {
    src: '/images/service-piano.jpg',
    alt: 'A black grand piano standing in a bright, otherwise empty room.',
  },
  'commercial-office-moving': {
    src: '/images/service-commercial.jpg',
    alt: 'An open-plan office with rows of empty desks and chairs.',
  },
  'senior-downsizing-moves': {
    src: '/images/service-senior.jpg',
    alt: 'An older couple standing together and smiling at home.',
  },
}

/** Keyed by service-area slug. */
export const areaPhotos: Record<string, SitePhoto> = {
  miami: {
    src: '/images/area-miami.jpg',
    alt: 'The Miami skyline seen across the water, with palm trees in the foreground.',
  },
  'fort-lauderdale': {
    src: '/images/area-fort-lauderdale.jpg',
    alt: 'An aerial view of boats moored along a Fort Lauderdale dock.',
  },
  'west-palm-beach': {
    src: '/images/area-west-palm-beach.jpg',
    alt: 'A waterfront city skyline lit up at night beside a bridge.',
  },
  hollywood: {
    src: '/images/area-hollywood.jpg',
    alt: 'An aerial view of a South Florida beach lined with umbrellas.',
  },
  'boca-raton': {
    src: '/images/area-palm-street.jpg',
    alt: 'A palm-lined residential street in front of a row of houses.',
  },
  'pompano-beach': {
    src: '/images/area-pompano-beach.jpg',
    alt: 'An aerial view of a palm-fringed shoreline and turquoise water.',
  },
  'coral-springs': {
    src: '/images/area-coral-springs.jpg',
    alt: 'An aerial view of a palm-lined road running through a residential area.',
  },
  // Weston shares the generic palm-street photograph; the alt text stays generic
  // so it never implies a specific location.
  weston: {
    src: '/images/area-palm-street.jpg',
    alt: 'A palm-lined residential street in a South Florida neighbourhood.',
  },
}
