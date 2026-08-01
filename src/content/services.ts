export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceSection {
  heading: string
  body: string[]
}

export interface Service {
  slug: string
  num: string
  /** Full name, used as the page H1 and in schema. */
  name: string
  /** Short label for cards and nav. */
  shortName: string
  /** One line for the homepage card grid. */
  cardBlurb: string
  /** Intro paragraph on the services index and detail page. */
  summary: string
  /** "What's included" bullets. */
  points: string[]
  metaTitle: string
  metaDescription: string
  sections: ServiceSection[]
  faqs: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: 'local-moving',
    num: '01',
    name: 'Local moving',
    shortName: 'Local moving',
    cardBlurb: 'Miami-Dade, Broward, Palm Beach, and the Keys — crews out daily.',
    summary:
      'Daily crews across Miami-Dade, Broward, Palm Beach, and the Keys. Hourly or flat-rate, your call — most apartments finish inside half a day.',
    points: [
      'Furniture pads and shrink wrap on everything',
      'Floor runners and door jamb protection',
      'Disassembly and reassembly of beds and tables',
      'Certificate of insurance filed with your building',
    ],
    metaTitle: 'Local Movers in South Florida',
    metaDescription:
      'Local moving crews across Miami-Dade, Broward, Palm Beach, and the Keys. Hourly or flat rate, binding written estimates, no deposit to book.',
    sections: [
      {
        heading: 'What a local move day looks like',
        body: [
          'A local move is anything that starts and ends inside Florida, and for most of our customers that means a same-day job. The crew arrives in a window you pick, walks the home with you, confirms the inventory against the estimate, and starts protecting the route before anything moves — floor runners down, door jambs padded, banisters wrapped.',
          'Loading is the part that decides whether anything gets damaged. Everything soft-sided gets a pad and shrink wrap. Drawers stay in dressers when the piece can take it, and come out when it cannot. Beds, tables, and modular sofas come apart, and the hardware goes in a labelled bag taped to the frame so reassembly is not a scavenger hunt.',
          'On the other end we place furniture where you want it, rebuild what we took apart, and put boxes in the rooms marked on the label. Debris and used wrap leave with the truck.',
        ],
      },
      {
        heading: 'Hourly or flat rate — how to choose',
        body: [
          'Hourly is usually cheaper for studios and one-bedrooms with elevator access and a short carry. You pay for the crew and truck by the hour, portal to portal, and if the job runs short you pay less.',
          'Flat rate is the safer choice when there are stairs, a long carry from the door to the truck, or a tight loading dock window — anything where the clock is outside your control. We quote it from the inventory, and the number does not move as long as the inventory does not.',
          'We will tell you which one is likely cheaper for your specific job during the estimate. It is not in our interest to put you on the wrong one; a surprised customer is not a repeat customer.',
        ],
      },
      {
        heading: 'Buildings, COIs, and elevator reservations',
        body: [
          'Most condo and rental buildings in South Florida require a certificate of insurance naming the association before they will let a crew in the door, and many restrict moving to specific hours or a reserved service elevator.',
          'Send us the building rules when you book and we file the COI directly with management. If a building has a nonstandard endorsement requirement, we would rather find out two weeks ahead than at the loading dock on a Saturday.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does a local move take?',
        answer:
          'A studio or one-bedroom with elevator access is typically three to five hours. A two-bedroom runs five to seven. A three-bedroom house is usually a full day. Stairs, long carries, and packing add time, which is why we ask about them up front rather than discovering them on the day.',
      },
      {
        question: 'Do I need to empty my dresser drawers?',
        answer:
          'Usually not for clothing in a solid wood dresser — we wrap it and move it loaded. Empty anything glass, liquid, or heavy, and empty particle-board furniture entirely, because it flexes and can come apart under load.',
      },
      {
        question: 'Do you charge for travel time?',
        answer:
          'On hourly jobs we charge a single drive-time fee that covers getting the truck to you and back to the yard, disclosed on the estimate before you book. We do not bill the clock in both directions.',
      },
    ],
  },
  {
    slug: 'long-distance-moving',
    num: '02',
    name: 'Long-distance & interstate moving',
    shortName: 'Long distance',
    cardBlurb: 'Dedicated trucks to all 48 states. No shared loads or transfers.',
    summary:
      'Dedicated truck to all 48 states. No warehouse transfers, no shared loads, no mystery two-week delivery windows.',
    points: [
      'Same crew loads and unloads',
      '1–3 day delivery window, in writing',
      'GPS tracking and a direct line to your driver',
      'Full-value protection available',
    ],
    metaTitle: 'Long-Distance & Interstate Movers',
    metaDescription:
      'Dedicated-truck interstate moving from South Florida to all 48 states. Same crew loads and unloads, 1–3 day delivery window in writing, no shared loads.',
    sections: [
      {
        heading: 'Dedicated truck, not shared freight',
        body: [
          'Most long-distance quotes you will get are for consolidated freight: your shipment is weighed, loaded alongside two or three other households, and delivered inside a window that can stretch to two weeks because the truck is routed around everyone else on it.',
          'We run dedicated. Your shipment is the only shipment on the truck, the crew that loads you drives it, and the delivery window we put in writing is one to three days. It costs more per pound than consolidated freight. It is worth it if you cannot afford to sit in an empty house for a fortnight waiting on a call.',
        ],
      },
      {
        heading: 'How interstate pricing actually works',
        body: [
          'Interstate moves are priced on weight and distance, with accessorials for things like stairs, long carries, shuttle trucks, and packing. Federal rules require the carrier to give you a written estimate and to hand you the FMCSA booklet Your Rights and Responsibilities When You Move.',
          'Ask any mover whether the estimate is binding, non-binding, or binding-not-to-exceed, and get the answer in writing. A non-binding estimate is legally allowed to grow, and the low quotes you find online are almost always non-binding.',
          'Be especially careful with brokers. A broker is not a mover — they sell your job to whichever carrier bids lowest, which is how people end up with a truck full of their belongings held hostage over a re-weigh. Check any company you are considering at safer.fmcsa.dot.gov: a real carrier has its own USDOT number and its own trucks.',
        ],
      },
      {
        heading: 'Valuation is not insurance',
        body: [
          'Every interstate move includes released-value protection at no charge. That is 60 cents per pound per article — a 40-pound television is covered for $24. It is the federal minimum, not real coverage.',
          'Full-value protection means the carrier repairs, replaces, or pays the current market value of a damaged item. It costs extra and it is what we recommend for anyone shipping electronics, art, or anything they would actually miss.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How far in advance should I book an interstate move?',
        answer:
          'Four to six weeks is comfortable, and longer if you are moving between mid-May and Labor Day or landing on the first or last few days of a month. Those are the peaks, and dedicated trucks book out first.',
      },
      {
        question: 'Can I track my shipment?',
        answer:
          'Yes. You get GPS tracking on the truck and the driver’s direct number. Because it is a dedicated truck, the driver can tell you where your things are without checking with a dispatcher first.',
      },
      {
        question: 'What if my new place is not ready on the delivery date?',
        answer:
          'We can hold the shipment in our Fort Lauderdale warehouse and redeliver when you are ready. Tell us as early as you can — storage-in-transit is far cheaper to plan than to arrange from the road.',
      },
    ],
  },
  {
    slug: 'packing-unpacking',
    num: '03',
    name: 'Packing & unpacking',
    shortName: 'Packing',
    cardBlurb: 'Full or partial. We bring materials and haul the empties away.',
    summary:
      'Full-service, partial, or just the kitchen. We bring the materials, and on unpack day we take the empties with us.',
    points: [
      'Dish packs, wardrobe boxes, custom crating',
      'Room-by-room labeled inventory',
      'Fragile-only or whole-home options',
      'Debris and box removal included',
    ],
    metaTitle: 'Professional Packing & Unpacking Services',
    metaDescription:
      'Full-service or partial packing in South Florida. Dish packs, wardrobe boxes, and custom crating, with room-by-room labeling and free debris removal.',
    sections: [
      {
        heading: 'Full, partial, or fragile-only',
        body: [
          'Full packing means we pack everything: a two-person crew usually clears a two-bedroom in a day, arriving the afternoon before move day. Partial packing means you handle the easy rooms and we take the kitchen, the closets, and anything breakable — which is where most self-packed damage happens anyway.',
          'Fragile-only is the option most people should consider. Dishes, glassware, art, lamps, and electronics are the items that break, and they are the ones that benefit most from dish packs, cell dividers, and double-boxing.',
        ],
      },
      {
        heading: 'Why self-packed boxes are not covered',
        body: [
          'This surprises people, so it is worth saying plainly: when you pack a box yourself, the carrier is generally not liable for breakage inside it, because no one can verify how it was packed. Cartons we pack are covered under whatever valuation you selected.',
          'That is not a sales tactic, it is standard across the industry and it is written into the tariff. If you are going to self-pack, at minimum let us handle the dish packs.',
        ],
      },
      {
        heading: 'Unpacking day',
        body: [
          'Unpacking is booked separately and usually happens a day or two after delivery. We open cartons, place contents on flat surfaces in the room they belong to, reassemble what needs it, and take every empty box and all the used paper away with us.',
          'We do not put your things into cabinets unless you ask us to, because most people would rather decide where the plates live themselves.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many boxes will I need?',
        answer:
          'Rough rule of thumb: about 20 cartons for a studio, 30 for a one-bedroom, 45 for a two-bedroom, and 65 or more for a three-bedroom house. Full packing runs higher because we use more, smaller boxes for fragile items. The estimator on our homepage gives you a starting figure.',
      },
      {
        question: 'Do you take the empty boxes away?',
        answer:
          'Yes, debris and box removal is included when we do the unpacking. If you packed yourself and just want the empties gone after, ask and we will schedule a pickup.',
      },
      {
        question: 'Can you pack just the kitchen?',
        answer:
          'Yes. Kitchen-only is one of our most common partial packs, because it is the slowest room to do yourself and the easiest to do badly.',
      },
    ],
  },
  {
    slug: 'storage',
    num: '04',
    name: 'Storage',
    shortName: 'Storage',
    cardBlurb: 'Climate-controlled vaults with an itemized photo inventory.',
    summary:
      'Climate-controlled warehouse space in Fort Lauderdale for a week or a year, with an itemized photo inventory of every piece.',
    points: [
      '24/7 monitored, climate-controlled facility',
      'Vaulted storage — your goods stay palletized',
      'Photo inventory accessible online',
      'One call to schedule redelivery',
    ],
    metaTitle: 'Climate-Controlled Moving Storage in Fort Lauderdale',
    metaDescription:
      'Vaulted, climate-controlled storage in Fort Lauderdale for a week or a year. Itemized photo inventory, 24/7 monitoring, one call to schedule redelivery.',
    sections: [
      {
        heading: 'Why climate control matters in South Florida',
        body: [
          'Summer humidity here sits above 70% for months. In an uncontrolled unit that means mould on upholstery, warped solid wood, delaminated veneer, cloudy photographs, and adhesive failure in anything laminated. It is not a hypothetical — it is the single most common cause of damage to stored household goods in Florida.',
          'Our warehouse holds temperature and relative humidity year-round. It costs more than a drive-up unit off the turnpike. If you are storing a mattress, a sofa, or anything wooden through a Florida summer, it is not optional.',
        ],
      },
      {
        heading: 'Vaulted storage, not a rented room',
        body: [
          'Your goods are loaded into wooden vaults at your home, sealed, and stacked in the warehouse. Nothing is unpacked and repacked, nothing is stacked loose against someone else’s furniture, and nothing gets handled again until redelivery.',
          'You get an itemized inventory with photographs, accessible online, so you can confirm what is in storage without driving out to look.',
        ],
      },
      {
        heading: 'Common reasons people need it',
        body: [
          'Closing dates that slip. Renovations. A lease that ends three weeks before the next one starts. Downsizing where the family has not decided what to keep. Snowbird seasonal storage. Storage-in-transit on a long-distance move where the destination is not ready.',
          'All of those are routine for us, and all of them are cheaper if you tell us at booking rather than on moving day.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the minimum storage period?',
        answer:
          'One month. After the first month it is prorated, so you are not paying for weeks you did not use if your closing lands mid-month.',
      },
      {
        question: 'Can I access my things while they are in storage?',
        answer:
          'Yes, with advance notice — vaults have to be pulled and staged, so we ask for two business days. If you expect to need regular access, tell us and we will stage your vaults accordingly.',
      },
      {
        question: 'Is my property insured while in storage?',
        answer:
          'Storage valuation is separate from transit valuation and is quoted per month based on declared value. We will walk you through what your homeowner’s or renter’s policy may already cover before you buy anything from us.',
      },
    ],
  },
  {
    slug: 'piano-specialty-moving',
    num: '05',
    name: 'Piano & specialty item moving',
    shortName: 'Piano & specialty',
    cardBlurb: 'Grands, safes, slate tables, and gallery art with custom crating.',
    summary:
      'Uprights, grands, safes, slate pool tables, aquariums, and gallery art. Specialty crew, specialty gear, extra insurance.',
    points: [
      'Skid boards, piano boards, and stair climbers',
      'Custom wood crating for art and marble',
      'Rigging for tight staircases and balconies',
      'Tuning referral after delivery',
    ],
    metaTitle: 'Piano Movers & Specialty Item Moving',
    metaDescription:
      'Specialty crews for uprights, grands, gun safes, slate pool tables, aquariums, and gallery art. Custom crating, rigging, and dedicated equipment.',
    sections: [
      {
        heading: 'Pianos',
        body: [
          'An upright weighs 300 to 900 pounds and a concert grand can pass 1,300. The weight is not the hard part — the hard part is that the load is unbalanced, the legs and pedal lyre are structurally weak, and the finish marks if you look at it wrong.',
          'Grands come off their legs and onto a padded piano board on their side, then get strapped, wrapped, and dollied. Uprights travel upright on a four-wheel dolly with the keyboard lid secured. Either way, plan on re-tuning a few weeks after delivery once the instrument has settled into the new humidity — we will refer you to a tuner we trust.',
        ],
      },
      {
        heading: 'Safes, pool tables, and marble',
        body: [
          'Gun safes over 600 pounds need stair climbers and, above roughly 1,000 pounds, a structural check on whether the floor will take the point load at the destination. We will tell you if we think it will not.',
          'Slate pool tables are disassembled — rails, felt, and slate come off separately, and the slate is crated. Anyone who offers to move a slate table intact is going to crack it. Marble and stone tops travel vertically in custom crates, never flat.',
        ],
      },
      {
        heading: 'Art, antiques, and aquariums',
        body: [
          'Gallery art and mirrors over about 40 inches get custom wood crates built to size. Antiques with fragile joinery get blanket-wrapped and crated rather than shrink-wrapped, because shrink wrap traps moisture against old finishes.',
          'Aquariums have to be fully drained and the livestock rehomed before move day — we will move the tank and stand, but nothing can travel with water or fish in it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you move pianos up and down stairs?',
        answer:
          'Yes, with a stair-climbing dolly and enough crew for the weight. Tell us the number of flights, whether there is a turn or a landing, and the width at the narrowest point when you book, so we bring the right gear and the right headcount.',
      },
      {
        question: 'Will my piano need tuning after the move?',
        answer:
          'Almost certainly, though usually because of the change in humidity rather than the move itself. Wait two to four weeks for the instrument to acclimate, then have it tuned.',
      },
      {
        question: 'Is specialty moving covered by standard valuation?',
        answer:
          'High-value items should be declared in writing before the move. Ask us about full-value protection with a declared item — the standard per-pound valuation is nowhere near the value of a grand piano or an original work.',
      },
    ],
  },
  {
    slug: 'commercial-office-moving',
    num: '06',
    name: 'Commercial & office moving',
    shortName: 'Commercial',
    cardBlurb: 'Nights and weekends so your team never loses a business day.',
    summary:
      'Nights and weekends so your team never loses a business day. IT disconnect and reconnect coordinated with your vendor.',
    points: [
      'Workstation labeling and floor-plan placement',
      'Server and IT equipment handling',
      'After-hours and weekend scheduling',
      'COI and building compliance handled',
    ],
    metaTitle: 'Commercial & Office Movers in South Florida',
    metaDescription:
      'After-hours and weekend office relocation across South Florida. Workstation labeling, floor-plan placement, IT coordination, and full building compliance.',
    sections: [
      {
        heading: 'The plan matters more than the truck',
        body: [
          'An office move is a logistics problem wearing a moving company’s clothes. The physical work is straightforward; what makes or breaks Monday morning is whether every workstation, monitor, docking station, and chair ends up at the right desk on the new floor plan.',
          'We label to your floor plan, not to ours. Every crate, monitor, and CPU gets a tag keyed to a seat number, the destination floor gets matching signage, and the crew places to the tag. That is the difference between a team that starts working at nine and a team that spends a day hunting for their second monitor.',
        ],
      },
      {
        heading: 'After hours, by default',
        body: [
          'We schedule commercial moves for Friday evening through Sunday, or overnight for anything that has to happen mid-week. Both buildings usually need freight elevator reservations and certificates of insurance, and both usually have a security desk that needs a crew list in advance. We handle all of it.',
        ],
      },
      {
        heading: 'IT, servers, and what we will not touch',
        body: [
          'We move and place server racks, but we coordinate the disconnect and reconnect with your IT vendor rather than doing it ourselves — the last thing you want is a moving crew improvising a rack rebuild.',
          'Give us your vendor’s contact when you book and we will schedule around their window. If you do not have one, tell us early enough that you can line one up.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much notice do you need for an office move?',
        answer:
          'Four to eight weeks for anything above about 20 people, mostly because building approvals, COIs, and elevator reservations take longer than the move does. Small suites can go faster.',
      },
      {
        question: 'Can you provide crates instead of boxes?',
        answer:
          'Yes. Reusable plastic crates are standard for office moves — they stack better, they do not need taping, and we collect them afterwards, so there is no cardboard to dispose of.',
      },
      {
        question: 'Do you handle furniture installation?',
        answer:
          'We disassemble and reassemble standard systems furniture and desks. For proprietary cubicle systems that require a certified installer, we will coordinate with the manufacturer’s installer rather than risk voiding a warranty.',
      },
    ],
  },
  {
    slug: 'senior-downsizing-moves',
    num: '07',
    name: 'Senior & downsizing moves',
    shortName: 'Senior moves',
    cardBlurb: 'Downsizing at a slower pace, with donation runs included.',
    summary:
      'Slower pace, more hands, and coordination with family or a placement agency. We handle donation and disposal runs too.',
    points: [
      'Sorting and donation haul-away',
      'Coordination with retirement communities',
      'Full setup — bed made, TV mounted',
      'Patient crews trained for senior moves',
    ],
    metaTitle: 'Senior Moving & Downsizing Services',
    metaDescription:
      'Patient, unhurried senior moving and downsizing across South Florida. Sorting help, donation haul-away, community coordination, and full setup on arrival.',
    sections: [
      {
        heading: 'A different kind of move day',
        body: [
          'Downsizing out of a home someone has lived in for thirty years is not primarily a logistics problem. The crew we send to these jobs is chosen for patience, and we schedule more hours than the inventory strictly needs so nobody is rushed into decisions about what to keep.',
          'If family are coordinating from out of state, we will do a video walkthrough and keep one point of contact updated through the day.',
        ],
      },
      {
        heading: 'Sorting, donation, and disposal',
        body: [
          'Most downsizing moves leave more behind than they take. We sort into keep, donate, and dispose, run donations to a local charity, and provide the receipt for tax purposes. Disposal runs are charged by volume.',
          'We work regularly with senior move managers and placement agencies, and we are happy to take direction from one you have already hired.',
        ],
      },
      {
        heading: 'Setup at the community',
        body: [
          'Independent and assisted living communities almost always have restricted move-in hours and a required certificate of insurance. We coordinate directly with the community’s move-in office.',
          'Setup is included: the bed is made, the television is mounted and plugged in, the lamps work, and the phone is on its charger before we leave. Nobody should spend their first night in a new apartment surrounded by boxes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you help decide what to keep?',
        answer:
          'We can sort and stage so the decisions are easier to make, but we do not make them for you. For hands-on help with the decisions themselves, a certified senior move manager is the right professional, and we work alongside them often.',
      },
      {
        question: 'Do you take donations away the same day?',
        answer:
          'Usually yes, if the volume fits the truck after the load. Larger clear-outs get a separate run, and we provide the donation receipt either way.',
      },
      {
        question: 'Can you coordinate with the retirement community directly?',
        answer:
          'Yes. Give us the community name and move-in coordinator when you book, and we will handle the COI, the elevator reservation, and the arrival window without putting that on the family.',
      },
    ],
  },
]

/** Homepage card grid — the seven services plus supplies. */
export const homeServiceCards = [
  ...services.map((service) => ({
    num: service.num,
    name: service.shortName,
    blurb: service.cardBlurb,
    href: `/services/${service.slug}`,
  })),
  {
    num: '08',
    name: 'Boxes & supplies',
    blurb: 'Cartons, wardrobe boxes, and wrap delivered before move day.',
    href: '/services/packing-unpacking',
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export const serviceSlugs = services.map((service) => service.slug)
