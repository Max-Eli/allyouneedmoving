export interface ServiceArea {
  slug: string
  city: string
  county: string
  /** ZIP prefixes we treat as same-day local coverage. */
  zips: string[]
  driveTime: string
  metaTitle: string
  metaDescription: string
  intro: string
  /** Two or three paragraphs of genuinely area-specific detail. */
  detail: string[]
  /** Neighbourhoods and landmarks — the phrases people actually search. */
  neighborhoods: string[]
  /** Local logistics that change how a move is run here. */
  localNotes: { heading: string; body: string }[]
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'fort-lauderdale',
    city: 'Fort Lauderdale',
    county: 'Broward County',
    zips: ['33301', '33304', '33305', '33306', '33308', '33309', '33311', '33312', '33315', '33316'],
    driveTime: 'Crews dispatch from our yard here',
    metaTitle: 'Movers in Fort Lauderdale, FL',
    metaDescription:
      'Fort Lauderdale movers dispatching from our own yard on NW 19th St. Local and long-distance, binding written estimates, same-week availability.',
    intro:
      'Our yard is in Fort Lauderdale, so this is the shortest drive time we have anywhere — which usually means same-week availability and lower drive-time charges than a crew coming from Miami.',
    detail: [
      'Fort Lauderdale is a study in contrasts for movers. Downtown and Flagler Village are high-rise condo territory where the job is decided by the loading dock and the service elevator reservation. Victoria Park and Rio Vista are single-family homes with mature trees, narrow driveways, and the occasional bridge-and-canal approach that a 26-foot truck simply cannot make.',
      'We scout the approach before quoting anything east of Federal Highway. If a street will not take a full-size truck, we plan a shuttle rather than discovering the problem with a loaded trailer idling on a residential corner.',
      'Along the beach corridor, most buildings restrict moves to weekday business hours and require a certificate of insurance filed days in advance. Send us the building rules when you book — that lead time is the difference between a smooth morning and a crew waiting in the lot.',
    ],
    neighborhoods: [
      'Las Olas',
      'Victoria Park',
      'Rio Vista',
      'Flagler Village',
      'Coral Ridge',
      'Wilton Manors',
      'Harbor Beach',
      'Sailboat Bend',
    ],
    localNotes: [
      {
        heading: 'Bridges and canal streets',
        body: 'Much of the eastern city is cut through by canals with low-clearance and weight-limited crossings. We route around them, but it can add a shuttle to the job — worth flagging at the estimate.',
      },
      {
        heading: 'High-rise loading docks',
        body: 'Downtown and beach towers typically allow one moving truck at a time in a reserved window. We book the elevator with management and file the COI so your slot is confirmed before the truck rolls.',
      },
      {
        heading: 'Hurricane season',
        body: 'Between June and November we watch the forecast cone and will move your date at no charge rather than load a truck into a named storm.',
      },
    ],
  },
  {
    slug: 'miami',
    city: 'Miami',
    county: 'Miami-Dade County',
    zips: ['33125', '33127', '33128', '33129', '33130', '33131', '33132', '33133', '33137', '33139'],
    driveTime: 'About 45 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in Miami, FL',
    metaDescription:
      'Miami movers for Brickell, Coral Gables, Coconut Grove, and Miami Beach. High-rise experienced, COIs filed, binding written estimates.',
    intro:
      'Miami is the most building-restricted market we work in. Almost every job here is decided by the loading dock, the elevator reservation, and the certificate of insurance — not by the furniture.',
    detail: [
      'Brickell and Downtown are dense high-rise, where buildings routinely limit moves to a three or four hour window on weekdays and require the COI on file 48 hours ahead. We staff these jobs heavier than the inventory needs so we finish inside the window rather than being asked to stop mid-load.',
      'Coral Gables and Coconut Grove are the opposite problem — historic single-family homes, tight tree-lined streets, and driveways that will not take a 26-foot truck. Shuttle work is common and we quote it up front instead of surprising you with an accessorial.',
      'Miami Beach adds a causeway crossing and, in South Beach, streets where legal truck parking is genuinely scarce. We pull permits where the city requires them and build the timing around traffic on the MacArthur and Julia Tuttle.',
    ],
    neighborhoods: [
      'Brickell',
      'Downtown Miami',
      'Coconut Grove',
      'Coral Gables',
      'Miami Beach',
      'Wynwood',
      'Edgewater',
      'Key Biscayne',
    ],
    localNotes: [
      {
        heading: 'COI lead time is not negotiable',
        body: 'Most Miami-Dade associations want the certificate 48 hours ahead and will turn a crew away without it. Send building rules at booking, not the week of.',
      },
      {
        heading: 'Shuttle trucks in the Gables and the Grove',
        body: 'Where a full-size truck cannot reach the door, we run a smaller shuttle between the house and the trailer. It adds time and cost, so we quote it before the day rather than after.',
      },
      {
        heading: 'Causeway timing',
        body: 'Beach jobs are scheduled around causeway traffic. An 8am start on a weekday is a very different drive from a 4pm one, and we plan for it.',
      },
    ],
  },
  {
    slug: 'west-palm-beach',
    city: 'West Palm Beach',
    county: 'Palm Beach County',
    zips: ['33401', '33403', '33404', '33405', '33406', '33407', '33409', '33411', '33413', '33417'],
    driveTime: 'About 50 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in West Palm Beach, FL',
    metaDescription:
      'West Palm Beach movers for local and long-distance jobs. Gated community and 55+ experience, COIs filed, binding written estimates.',
    intro:
      'Palm Beach County runs on gated communities and seasonal residents, and both change how a move has to be scheduled.',
    detail: [
      'A large share of our Palm Beach work is in gated and 55+ communities, which means a guardhouse that needs the crew on an access list, a management office that wants a COI, and in many cases restricted move hours that exclude weekends entirely.',
      'Seasonal residency drives the calendar here. October and November are heavy inbound, April and May are heavy outbound, and those months book out first. If your date is inside them, book four to six weeks ahead.',
      'Downtown West Palm and the Northwood corridor are increasingly high-rise and behave like Fort Lauderdale downtown — reserved elevator, dock window, COI on file.',
    ],
    neighborhoods: [
      'Downtown West Palm Beach',
      'Northwood',
      'El Cid',
      'Flamingo Park',
      'Ibis',
      'Wellington',
      'Royal Palm Beach',
      'Palm Beach Island',
    ],
    localNotes: [
      {
        heading: 'Guardhouse access lists',
        body: 'Gated communities need crew names and the truck on an access list ahead of time. Give us the management contact at booking and we will arrange it.',
      },
      {
        heading: 'Seasonal peaks',
        body: 'Snowbird season makes October–November and April–May the tightest windows of the year in this county. Book early.',
      },
      {
        heading: 'Storage between seasons',
        body: 'Seasonal residents often store between stays. Our Fort Lauderdale vaults are climate-controlled, which matters far more here than most people expect.',
      },
    ],
  },
  {
    slug: 'hollywood',
    city: 'Hollywood',
    county: 'Broward County',
    zips: ['33019', '33020', '33021', '33023', '33024', '33025', '33026', '33027', '33028', '33029'],
    driveTime: 'About 20 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in Hollywood, FL',
    metaDescription:
      'Hollywood, FL movers — the city where we started in 2012. Local and long-distance, binding written estimates, same-week availability.',
    intro:
      'Hollywood is where this company started with one box truck, and it is still one of the shortest runs we make.',
    detail: [
      'The city splits cleanly for movers. East of Dixie you have older single-family homes and the beach condo strip, with narrow streets, on-street parking, and buildings that want a COI and a reserved elevator. West of I-95, Emerald Hills and the Hollywood Hills area are larger homes with driveways that take a full-size truck without trouble.',
      'Beach-side buildings along the Broadwalk are the most restricted in the city — many limit moves to weekday mornings and have a single service elevator shared by the whole tower. Those jobs get booked around the building, not the other way round.',
      'Downtown Hollywood’s parking is scarce enough that we frequently pull a temporary parking permit rather than gamble on a spot near the door.',
    ],
    neighborhoods: [
      'Hollywood Beach',
      'Downtown Hollywood',
      'Emerald Hills',
      'Hollywood Lakes',
      'Oakwood',
      'Playa del Mar',
      'Hillcrest',
      'Beverly Park',
    ],
    localNotes: [
      {
        heading: 'Broadwalk building rules',
        body: 'Beach towers here are among the strictest in Broward. Expect weekday-only windows and a shared service elevator that must be booked.',
      },
      {
        heading: 'Downtown parking permits',
        body: 'Where there is no legal truck parking near the entrance, we pull a temporary permit from the city ahead of the date.',
      },
      {
        heading: 'Short drive time',
        body: 'Being twenty minutes from the yard keeps drive-time charges low and makes same-week and next-day slots realistic here.',
      },
    ],
  },
  {
    slug: 'boca-raton',
    city: 'Boca Raton',
    county: 'Palm Beach County',
    zips: ['33427', '33428', '33431', '33432', '33433', '33434', '33486', '33487', '33496', '33498'],
    driveTime: 'About 35 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in Boca Raton, FL',
    metaDescription:
      'Boca Raton movers experienced with gated communities, country clubs, and high-value items. Custom crating, COIs filed, binding written estimates.',
    intro:
      'Boca is gated-community territory with a high concentration of art, antiques, and specialty items — which is why more of our specialty-crew jobs come from here than anywhere else.',
    detail: [
      'Most residential work in Boca happens inside a gate. Boca West, Broken Sound, St Andrews and the rest each have their own access procedure, insurance requirement, and permitted move hours, and several prohibit weekend moves outright.',
      'We send a specialty crew here more often than to any other city we serve. Gallery art, marble tops, grand pianos, and gun safes all get custom crating and the right rigging rather than a blanket and optimism.',
      'Downsizing is common in this market too — larger homes to smaller condos or a community, usually with a donation run and a storage vault in the middle.',
    ],
    neighborhoods: [
      'Boca West',
      'Broken Sound',
      'Royal Palm Yacht & Country Club',
      'Mizner Park',
      'Boca Del Mar',
      'St Andrews Country Club',
      'Woodfield',
      'East Boca',
    ],
    localNotes: [
      {
        heading: 'Country club access',
        body: 'Each community has its own procedure. We need the management contact at booking so the crew and truck are on the list and the COI is filed correctly.',
      },
      {
        heading: 'High-value declarations',
        body: 'If you are moving art, antiques, or anything individually worth more than a few thousand dollars, declare it in writing before the move so valuation actually covers it.',
      },
      {
        heading: 'Weekend restrictions',
        body: 'Several Boca communities do not permit weekend moves at all. We schedule around it rather than finding out at the gate.',
      },
    ],
  },
  {
    slug: 'pompano-beach',
    city: 'Pompano Beach',
    county: 'Broward County',
    zips: ['33060', '33062', '33063', '33064', '33065', '33066', '33067', '33068', '33069', '33073'],
    driveTime: 'About 20 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in Pompano Beach, FL',
    metaDescription:
      'Pompano Beach movers for condos, 55+ communities, and single-family homes. Short drive time, same-week availability, binding written estimates.',
    intro:
      'Pompano is a short run from the yard and a mix of beach condos, 55+ communities, and inland single-family homes.',
    detail: [
      'The beach corridor east of Federal is condo territory with the usual elevator-and-COI routine. Inland, the 55+ communities around Palm Aire and Leisureville have their own access rules and, in several cases, restricted move hours.',
      'A good share of our Pompano work is downsizing within the city — a house to a condo or a community apartment, often with a donation run in the middle. We schedule those with extra hours so nobody is rushed.',
      'Being twenty minutes from the yard makes next-day and same-week slots genuinely available here, including for cancellations.',
    ],
    neighborhoods: [
      'Pompano Beach',
      'Palm Aire',
      'Cypress Bend',
      'Leisureville',
      'Lighthouse Point',
      'Coconut Creek',
      'Margate',
      'Old Pompano',
    ],
    localNotes: [
      {
        heading: '55+ community rules',
        body: 'Most have restricted move hours and a required COI. Give us the management contact at booking and we will handle it.',
      },
      {
        heading: 'Beach condo elevators',
        body: 'Single service elevators are the norm along the beach. We book the window and staff to finish inside it.',
      },
      {
        heading: 'Short-notice availability',
        body: 'The short drive from the yard means we can often fill a cancellation here within a few days.',
      },
    ],
  },
  {
    slug: 'coral-springs',
    city: 'Coral Springs',
    county: 'Broward County',
    zips: ['33065', '33067', '33071', '33073', '33075', '33076', '33077'],
    driveTime: 'About 30 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in Coral Springs, FL',
    metaDescription:
      'Coral Springs movers for family homes and HOA communities. Full-service packing, long-distance relocation, binding written estimates.',
    intro:
      'Coral Springs is family-home territory — larger inventories, more packing, and a high proportion of out-of-state relocations.',
    detail: [
      'Most jobs here are three- and four-bedroom houses with garages, which means bigger inventories and more packing than a comparable condo move. Full or partial packing is the norm rather than the exception.',
      'A large share of Coral Springs work is long-distance. Families relocating out of state for work is the single most common reason we get called here, and those are dedicated-truck jobs with a one to three day delivery window.',
      'HOA rules are lighter than the coastal condo markets, but several communities still restrict truck parking and move hours, so it is worth checking your covenants before booking a date.',
    ],
    neighborhoods: [
      'Eagle Trace',
      'Heron Bay',
      'Wyndham Lakes',
      'Cypress Run',
      'Ramblewood',
      'Turtle Run',
      'Parkland',
      'Coral Creek',
    ],
    localNotes: [
      {
        heading: 'Larger inventories',
        body: 'Garages and attics are where estimates go wrong. We walk both during the survey so the binding number holds on move day.',
      },
      {
        heading: 'Out-of-state relocations',
        body: 'Dedicated truck, same crew both ends, delivery window in writing. Book four to six weeks ahead for summer dates.',
      },
      {
        heading: 'HOA truck parking',
        body: 'Some communities restrict where a commercial vehicle can sit. Check your covenants and tell us if there is a limit.',
      },
    ],
  },
  {
    slug: 'weston',
    city: 'Weston',
    county: 'Broward County',
    zips: ['33326', '33327', '33331', '33332'],
    driveTime: 'About 35 minutes from our Fort Lauderdale yard',
    metaTitle: 'Movers in Weston, FL',
    metaDescription:
      'Weston movers for master-planned communities and executive relocations. Storage, packing, and long-distance moves with binding written estimates.',
    intro:
      'Weston is almost entirely master-planned communities, which makes access predictable and scheduling straightforward — and makes the HOA the main variable.',
    detail: [
      'Nearly every address here sits inside a planned community with a gate, an access procedure, and its own view on where a moving truck may park. The upside is that once you know the community, the logistics are consistent.',
      'Executive and corporate relocation is a bigger share of our work here than anywhere else we serve. Those jobs are usually long-distance, often on a tight date, and frequently involve storage while housing is sorted at the other end.',
      'Homes tend to be large with substantial garage and attic storage, so we plan a longer survey than the square footage alone would suggest.',
    ],
    neighborhoods: [
      'Weston Hills',
      'Windmill Ranch',
      'Savanna',
      'The Ridges',
      'Bonaventure',
      'Emerald Estates',
      'Indian Trace',
      'Sector 7',
    ],
    localNotes: [
      {
        heading: 'Community gate access',
        body: 'Crew names and truck details go on the access list ahead of the date. We arrange it with your community office at booking.',
      },
      {
        heading: 'Corporate relocation',
        body: 'We invoice corporate relocation accounts directly and provide the documentation most relocation policies require.',
      },
      {
        heading: 'Storage-in-transit',
        body: 'Where housing at the destination is not ready, we store the shipment in climate-controlled vaults and redeliver on one call.',
      },
    ],
  },
]

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug)
}

export const serviceAreaSlugs = serviceAreas.map((area) => area.slug)

/** City names used for schema `areaServed`. */
export const areaServedNames = serviceAreas.map((area) => area.city)

/**
 * ZIP prefixes treated as same-day local coverage by the homepage checker.
 * 330–334 is Miami-Dade/Broward/Palm Beach, 349 is the Keys and Treasure Coast edge.
 */
export const localZipPrefixes = ['330', '331', '332', '333', '334', '349']
