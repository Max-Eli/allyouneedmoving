/* ============================================================
   AllYouNeedMovers — site behaviour
   Ported from the "AllYouNeedMovers v2" Claude Design component.
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Config — the design exposed these as component props.
  ------------------------------------------------------------------ */
  var CONFIG = {
    showEstimator: true,
    showZipChecker: true
  };

  /* ------------------------------------------------------------------
     Content
  ------------------------------------------------------------------ */
  var SIZES = [
    { id: 'studio', short: 'Studio', label: 'Studio / 1 room',      crew: 2, truck: '16 ft',    hours: '3–4',  boxes: 20 },
    { id: '1br',    short: '1 BR',   label: '1 bedroom',            crew: 2, truck: '20 ft',    hours: '4–5',  boxes: 30 },
    { id: '2br',    short: '2 BR',   label: '2 bedrooms',           crew: 3, truck: '26 ft',    hours: '5–7',  boxes: 45 },
    { id: '3br',    short: '3 BR',   label: '3 bedrooms / house',   crew: 4, truck: '26 ft',    hours: '7–9',  boxes: 65 },
    { id: '4br',    short: '4+ BR',  label: '4+ bedrooms / office', crew: 5, truck: '2 × 26 ft', hours: '9–12', boxes: 95 }
  ];

  var EXTRAS = [
    { id: 'stairs',  label: 'Stairs / walk-up' },
    { id: 'piano',   label: 'Piano or safe' },
    { id: 'packing', label: 'Full packing' },
    { id: 'storage', label: 'Storage needed' }
  ];

  var ADDONS = [
    { id: 'packing',     label: 'Packing service' },
    { id: 'unpacking',   label: 'Unpacking' },
    { id: 'storage',     label: 'Storage' },
    { id: 'piano',       label: 'Piano / specialty' },
    { id: 'supplies',    label: 'Boxes & supplies' },
    { id: 'disassembly', label: 'Furniture assembly' }
  ];

  var MOVE_TYPES = [
    { id: 'local',      title: 'Local move',         desc: 'Within South Florida, same day' },
    { id: 'long',       title: 'Long distance',      desc: 'Out of state, anywhere in the 48' },
    { id: 'commercial', title: 'Commercial / office', desc: 'Business relocation, after hours' },
    { id: 'storage',    title: 'Storage only',       desc: 'Pickup, store, redeliver later' }
  ];

  var SERVICES = [
    { num: '01', name: 'Local moving',      blurb: 'Miami-Dade, Broward, Palm Beach, and the Keys — crews out daily.' },
    { num: '02', name: 'Long distance',     blurb: 'Dedicated trucks to all 48 states. No shared loads or transfers.' },
    { num: '03', name: 'Packing',           blurb: 'Full or partial. We bring materials and haul the empties away.' },
    { num: '04', name: 'Storage',           blurb: 'Climate-controlled vaults with an itemized photo inventory.' },
    { num: '05', name: 'Piano & specialty', blurb: 'Grands, safes, slate tables, and gallery art with custom crating.' },
    { num: '06', name: 'Commercial',        blurb: 'Nights and weekends so your team never loses a business day.' },
    { num: '07', name: 'Senior moves',      blurb: 'Downsizing at a slower pace, with donation runs included.' },
    { num: '08', name: 'Boxes & supplies',  blurb: 'Cartons, wardrobe boxes, and wrap delivered before move day.' }
  ];

  var STEPS = [
    { n: '1', title: 'Tell us the scope', body: 'Five questions online or one phone call. Video walkthrough for bigger homes.' },
    { n: '2', title: 'Get it in writing', body: 'A binding estimate with the crew size, truck, and window — no asterisks.' },
    { n: '3', title: 'We wrap and load',  body: 'Pads, shrink, floor runners. Every item inventoried before it hits the truck.' },
    { n: '4', title: 'Set up, not dumped', body: 'Beds rebuilt, boxes in the right rooms, debris gone before we leave.' }
  ];

  var TESTIMONIALS = [
    { q: 'Three-bedroom in Coral Springs to Nashville. Same four guys loaded us Tuesday and unloaded us Thursday morning — nothing broken, nothing missing, and the final invoice matched the estimate to the dollar.', n: 'Danielle R.', m: 'CORAL SPRINGS → NASHVILLE · LONG DISTANCE' },
    { q: 'We moved a 40-person office over a weekend and were fully operational Monday at 9. They labeled every workstation and rebuilt the desks exactly where the floor plan said.', n: 'Andre M.', m: 'BRICKELL · COMMERCIAL' },
    { q: 'My mother is 84 and downsizing was brutal for her emotionally. The crew was patient in a way I did not expect from movers. They packed her china themselves and nothing chipped.', n: 'Sofia L.', m: 'BOCA RATON · SENIOR MOVE' },
    { q: "Called Thursday, moved Saturday. The quote was over the phone and it held. I've used four moving companies in Miami and this is the first one I'd call again.", n: 'Kevin T.', m: 'MIAMI BEACH → DORAL · LOCAL' },
    { q: 'They stored our whole house for eleven weeks while our closing dragged out. Climate-controlled, itemized inventory, and redelivery was scheduled in one phone call.', n: 'Priya N.', m: 'WESTON · STORAGE + LOCAL' }
  ];

  var FAQS = [
    { q: 'How far in advance should I book?', a: 'Two to three weeks is comfortable for a local move, four to six for long distance or anything at the end of the month. That said, we hold same-week slots for cancellations — call and ask.' },
    { q: 'Is the quote binding?', a: 'Your written estimate is binding on scope. If the inventory we quoted is the inventory that shows up on moving day, the price does not move. Add a garage full of boxes we never saw and we re-quote on the spot before we load.' },
    { q: 'Are you licensed and insured?', a: 'Florida intrastate mover registration IM#2417, USDOT 3891204, MC 1187733. Every move includes released-value coverage, and full-value protection is available for a flat add-on.' },
    { q: 'Do you move pianos, safes, and pool tables?', a: 'Yes. Uprights, baby grands, gun safes, slate pool tables, and oversized art all get a specialty crew with the right dollies, skid boards, and crating. Mention it when you book so we schedule the equipment.' },
    { q: 'What can you not move?', a: 'Federal rules keep us from hauling propane, gasoline, paint, ammunition, aerosols, and perishables. We also ask you to carry jewelry, cash, medications, and passports yourself.' },
    { q: 'How does long-distance delivery work?', a: 'Dedicated trucks, not shared freight. The crew that loads you is the crew that unloads you, and we give a delivery window of one to three days rather than the two-week spreads brokers quote.' }
  ];

  var SERVICE_DETAIL = [
    { num: '01', name: 'Local moving', body: 'Daily crews across Miami-Dade, Broward, Palm Beach, and the Keys. Hourly or flat-rate, your call — most apartments finish inside half a day.', points: ['Furniture pads and shrink wrap on everything', 'Floor runners and door jamb protection', 'Disassembly and reassembly of beds and tables', 'Certificate of insurance filed with your building'] },
    { num: '02', name: 'Long-distance & interstate', body: 'Dedicated truck to all 48 states. No warehouse transfers, no shared loads, no mystery two-week delivery windows.', points: ['Same crew loads and unloads', '1–3 day delivery window, in writing', 'GPS tracking and a direct line to your driver', 'Full-value protection available'] },
    { num: '03', name: 'Packing & unpacking', body: 'Full-service, partial, or just the kitchen. We bring the materials, and on unpack day we take the empties with us.', points: ['Dish packs, wardrobe boxes, custom crating', 'Room-by-room labeled inventory', 'Fragile-only or whole-home options', 'Debris and box removal included'] },
    { num: '04', name: 'Storage', body: 'Climate-controlled warehouse space in Fort Lauderdale for a week or a year, with an itemized photo inventory of every piece.', points: ['24/7 monitored, climate-controlled facility', 'Vaulted storage — your goods stay palletized', 'Photo inventory accessible online', 'One call to schedule redelivery'] },
    { num: '05', name: 'Piano & specialty items', body: 'Uprights, grands, safes, slate pool tables, aquariums, and gallery art. Specialty crew, specialty gear, extra insurance.', points: ['Skid boards, piano boards, and stair climbers', 'Custom wood crating for art and marble', 'Rigging for tight staircases and balconies', 'Tuning referral after delivery'] },
    { num: '06', name: 'Commercial & office', body: 'Nights and weekends so your team never loses a business day. IT disconnect and reconnect coordinated with your vendor.', points: ['Workstation labeling and floor-plan placement', 'Server and IT equipment handling', 'After-hours and weekend scheduling', 'COI and building compliance handled'] },
    { num: '07', name: 'Senior & downsizing moves', body: 'Slower pace, more hands, and coordination with family or a placement agency. We handle donation and disposal runs too.', points: ['Sorting and donation haul-away', 'Coordination with retirement communities', 'Full setup — bed made, TV mounted', 'Patient crews trained for senior moves'] }
  ];

  var STATS = [
    { n: '18,400', label: 'MOVES COMPLETED SINCE 2012' },
    { n: '11',     label: 'TRUCKS ACROSS TWO YARDS' },
    { n: '96%',    label: 'JOBS FINISHED AT OR UNDER ESTIMATE' },
    { n: '48',     label: 'STATES WE HOLD AUTHORITY IN' }
  ];

  var VALUES = [
    { t: 'The estimate is the price', b: 'Scope-binding quotes. If nothing changed between the walkthrough and moving day, neither does the number on the invoice.' },
    { t: 'Employees, never day labor', b: 'Every mover is a W-2 employee, background-checked, uniformed, and trained in-house for at least three weeks before they touch your furniture.' },
    { t: 'One crew, end to end', b: 'On long-distance jobs the same team loads and unloads. Your things never sit in a transfer warehouse waiting for a stranger.' },
    { t: 'We fix what we break', b: 'Damage claims are handled by our own office, not an outside adjuster. Most are resolved inside two weeks.' }
  ];

  var MARQUEE = [
    'LICENSED & INSURED', 'FLAT-RATE OPTIONS', 'NO HIDDEN FEES', 'SAME-WEEK AVAILABILITY',
    'FULL-VALUE PROTECTION', 'CLIMATE-CONTROLLED STORAGE', 'W-2 CREWS, NEVER DAY LABOR'
  ];

  var STEP_LABELS = ['Move type', 'Origin & destination', 'Home size', 'Date & add-ons', 'Contact info'];
  var PAGES = ['home', 'services', 'about', 'quote'];
  var LOCAL_ZIP_PREFIXES = ['330', '331', '332', '333', '334', '349'];

  /* ------------------------------------------------------------------
     State
  ------------------------------------------------------------------ */
  var state = {
    page: 'home',
    size: '2br',
    extras: {},
    zip: '',
    zipResult: null,
    t: 0,
    faq: 0,
    step: 1,
    mtype: '',
    from: '',
    to: '',
    qsize: '',
    date: '',
    addons: {},
    name: '',
    phone: '',
    email: '',
    submitted: false
  };

  /* ------------------------------------------------------------------
     Small helpers
  ------------------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function toggleClass(node, className, on) {
    if (node) node.classList.toggle(className, !!on);
  }

  function pad2(n) { return String(n).length < 2 ? '0' + n : String(n); }

  /* ------------------------------------------------------------------
     Static content — rendered once
  ------------------------------------------------------------------ */
  function renderStatic() {
    // Four identical sets so the -50% keyframe lands seamlessly and wide
    // viewports never see the end of the strip.
    var track = $('#marquee-track');
    for (var pass = 0; pass < 4; pass++) {
      var set = el('span', 'marquee__set');
      MARQUEE.forEach(function (word) {
        set.appendChild(el('span', null, word));
        set.appendChild(el('span', null, '◆'));
      });
      track.appendChild(set);
    }

    var servicesGrid = $('#services-grid');
    SERVICES.forEach(function (s) {
      var card = el('a', 'card');
      card.href = '#/services';
      card.appendChild(el('span', 'card__num', s.num));
      card.appendChild(el('h3', 'card__title', s.name));
      card.appendChild(el('p', 'card__body', s.blurb));
      servicesGrid.appendChild(card);
    });

    var stepsGrid = $('#steps-grid');
    STEPS.forEach(function (st) {
      var box = el('div', 'step');
      box.appendChild(el('span', 'step__num', st.n));
      box.appendChild(el('h3', 'step__title', st.title));
      box.appendChild(el('p', 'step__body', st.body));
      stepsGrid.appendChild(box);
    });

    var detail = $('#service-detail');
    SERVICE_DETAIL.forEach(function (d) {
      var section = el('section', 'svc');

      var left = el('div');
      var head = el('div', 'svc__head');
      head.appendChild(el('span', 'svc__num', d.num));
      head.appendChild(el('h2', 'svc__title', d.name));
      left.appendChild(head);
      left.appendChild(el('p', 'svc__body', d.body));
      var cta = el('a', 'btn btn--outline btn--sm', 'Quote this service →');
      cta.href = '#/quote';
      left.appendChild(cta);

      var panel = el('div', 'svc__panel');
      panel.appendChild(el('p', 'svc__panel-head', "WHAT'S INCLUDED"));
      var points = el('div', 'svc__points');
      d.points.forEach(function (p) {
        var row = el('div', 'svc__point');
        row.appendChild(el('span', 'svc__tick', '✓'));
        row.appendChild(el('span', null, p));
        points.appendChild(row);
      });
      panel.appendChild(points);

      section.appendChild(left);
      section.appendChild(panel);
      detail.appendChild(section);
    });

    var statsStrip = $('#stats-strip');
    STATS.forEach(function (st) {
      var box = el('div', 'stat');
      box.appendChild(el('div', 'stat__n', st.n));
      box.appendChild(el('div', 'stat__label', st.label));
      statsStrip.appendChild(box);
    });

    var valuesGrid = $('#values-grid');
    VALUES.forEach(function (v) {
      var box = el('div', 'value-card');
      box.appendChild(el('h3', 'value-card__title', v.t));
      box.appendChild(el('p', 'value-card__body', v.b));
      valuesGrid.appendChild(box);
    });

    var wizardNav = $('#wizard-nav');
    STEP_LABELS.forEach(function (label, i) {
      var li = el('li');
      li.appendChild(el('span', 'wizard__dot', String(i + 1)));
      li.appendChild(el('span', null, label));
      wizardNav.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------
     Estimator
  ------------------------------------------------------------------ */
  var estSizeButtons = [];
  var estExtraButtons = [];

  function buildEstimator() {
    if (!CONFIG.showEstimator) {
      var section = $('#estimator');
      if (section) section.remove();
      return;
    }

    var sizeWrap = $('#est-sizes');
    SIZES.forEach(function (o) {
      var btn = el('button', 'chip', o.short);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        state.size = o.id;
        state.qsize = o.id;
        syncEstimator();
        syncQuoteSizes();
        syncWizardControls();
      });
      estSizeButtons.push({ id: o.id, node: btn });
      sizeWrap.appendChild(btn);
    });

    var extrasWrap = $('#est-extras');
    EXTRAS.forEach(function (x) {
      var btn = el('button', 'chip chip--pill', x.label);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        state.extras[x.id] = !state.extras[x.id];
        syncEstimator();
      });
      estExtraButtons.push({ id: x.id, node: btn });
      extrasWrap.appendChild(btn);
    });
  }

  function currentSize() {
    return SIZES.filter(function (x) { return x.id === state.size; })[0] || SIZES[2];
  }

  function buildEstimateNote(ex) {
    var notes = [];
    if (ex.stairs) notes.push('an extra mover for the walk-up');
    if (ex.piano) notes.push('a specialty crew and rigging gear');
    if (ex.packing) notes.push('a packing day the afternoon before');
    if (ex.storage) notes.push('a vault reserved at the Fort Lauderdale yard');
    if (!notes.length) {
      return 'Typical scope for this size. Stairs, long carries, and packing shift the crew — add them on the left.';
    }
    return 'Based on what you picked, we’d schedule ' +
      notes.join(', ').replace(/,([^,]*)$/, ' and$1') + '.';
  }

  function syncEstimator() {
    if (!CONFIG.showEstimator) return;

    var size = currentSize();
    var ex = state.extras;
    var crew = size.crew;
    var boxes = size.boxes;
    if (ex.stairs) crew += 1;
    if (ex.piano) crew += 1;
    if (ex.packing) boxes = Math.round(boxes * 1.25);

    $('#est-size-label').textContent = size.label;

    estSizeButtons.forEach(function (b) {
      var on = b.id === state.size;
      toggleClass(b.node, 'is-on', on);
      b.node.setAttribute('aria-pressed', String(on));
    });
    estExtraButtons.forEach(function (b) {
      var on = !!state.extras[b.id];
      toggleClass(b.node, 'is-on', on);
      b.node.setAttribute('aria-pressed', String(on));
    });

    var cells = [
      { label: 'CREW SIZE',    value: crew + ' movers',    note: 'Uniformed W-2 employees' },
      { label: 'TRUCK',        value: size.truck,          note: 'Lift gate and ramp included' },
      { label: 'ON-SITE TIME', value: size.hours + ' hrs', note: 'Load, drive, and unload' },
      { label: 'BOX ESTIMATE', value: '~' + boxes,         note: 'Supplies delivered free' }
    ];

    var readout = $('#est-readout');
    readout.textContent = '';
    cells.forEach(function (c) {
      var cell = el('div', 'est__cell');
      cell.appendChild(el('div', 'est__cell-label', c.label));
      cell.appendChild(el('div', 'est__cell-value', c.value));
      cell.appendChild(el('div', 'est__cell-note', c.note));
      readout.appendChild(cell);
    });

    $('#est-note').textContent = buildEstimateNote(ex);
  }

  /* ------------------------------------------------------------------
     ZIP checker
  ------------------------------------------------------------------ */
  function buildZipChecker() {
    if (!CONFIG.showZipChecker) {
      var section = $('#zip-checker');
      if (section) section.remove();
      return;
    }

    var input = $('#zip-input');
    input.addEventListener('input', function () {
      var cleaned = input.value.replace(/\D/g, '').slice(0, 5);
      if (cleaned !== input.value) input.value = cleaned;
      state.zip = cleaned;
    });

    $('#zip-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (state.zip.length !== 5) {
        state.zipResult = 'bad';
      } else {
        var local = LOCAL_ZIP_PREFIXES.indexOf(state.zip.slice(0, 3)) > -1;
        state.zipResult = local ? 'local' : 'long';
      }
      syncZip();
    });
  }

  function syncZip() {
    if (!CONFIG.showZipChecker) return;
    var box = $('#zip-result');
    if (!state.zipResult) {
      box.hidden = true;
      return;
    }
    var title, body;
    if (state.zipResult === 'local') {
      title = 'Good news — local crews run here daily.';
      body = 'Same-week availability is common. Hourly or flat rate, your choice.';
    } else if (state.zipResult === 'long') {
      title = 'Outside South Florida — we run it long distance.';
      body = 'Dedicated truck, same crew both ends, 1–3 day delivery window in writing.';
    } else {
      title = 'That ZIP doesn’t look right.';
      body = 'Enter all five digits and try again.';
    }
    $('#zip-title').textContent = title;
    $('#zip-body').textContent = body;
    box.hidden = false;
  }

  /* ------------------------------------------------------------------
     Testimonials
  ------------------------------------------------------------------ */
  function buildTestimonials() {
    $('#t-prev').addEventListener('click', function () {
      state.t = (state.t - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      syncTestimonial();
    });
    $('#t-next').addEventListener('click', function () {
      state.t = (state.t + 1) % TESTIMONIALS.length;
      syncTestimonial();
    });
  }

  function syncTestimonial() {
    var t = TESTIMONIALS[state.t];
    $('#t-quote').textContent = '“' + t.q + '”';
    $('#t-name').textContent = t.n;
    $('#t-meta').textContent = t.m;
    $('#t-count').textContent = pad2(state.t + 1) + ' / ' + pad2(TESTIMONIALS.length);
  }

  /* ------------------------------------------------------------------
     FAQ accordion
  ------------------------------------------------------------------ */
  var faqItems = [];

  function buildFaq() {
    var list = $('#faq-list');
    FAQS.forEach(function (f, i) {
      var item = el('div', 'faq__item');

      var btn = el('button', 'faq__q');
      btn.type = 'button';
      btn.id = 'faq-q-' + i;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'faq-p-' + i);
      btn.appendChild(el('span', null, f.q));
      var sign = el('span', 'faq__sign', '+');
      btn.appendChild(sign);

      var panel = el('div', 'faq__panel');
      panel.id = 'faq-p-' + i;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', 'faq-q-' + i);
      panel.appendChild(el('p', 'faq__a', f.a));

      btn.addEventListener('click', function () {
        state.faq = state.faq === i ? -1 : i;
        syncFaq();
      });

      item.appendChild(btn);
      item.appendChild(panel);
      list.appendChild(item);
      faqItems.push({ btn: btn, panel: panel, sign: sign });
    });
  }

  function syncFaq() {
    faqItems.forEach(function (it, i) {
      var open = state.faq === i;
      it.sign.textContent = open ? '–' : '+';
      it.btn.setAttribute('aria-expanded', String(open));
      it.panel.style.maxHeight = open ? it.panel.scrollHeight + 'px' : '0px';
    });
  }

  /* ------------------------------------------------------------------
     Quote wizard
  ------------------------------------------------------------------ */
  var moveTypeButtons = [];
  var qSizeButtons = [];
  var addonButtons = [];

  function buildWizard() {
    var typeWrap = $('#move-types');
    MOVE_TYPES.forEach(function (m) {
      var btn = el('button', 'mtype');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.appendChild(el('div', 'mtype__title', m.title));
      btn.appendChild(el('div', 'mtype__desc', m.desc));
      btn.addEventListener('click', function () {
        state.mtype = m.id;
        state.step = 2;
        syncWizard();
      });
      moveTypeButtons.push({ id: m.id, node: btn });
      typeWrap.appendChild(btn);
    });

    var sizeWrap = $('#q-sizes');
    SIZES.forEach(function (o) {
      var btn = el('button', 'size-opt', o.label);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        state.size = o.id;
        state.qsize = o.id;
        syncQuoteSizes();
        syncEstimator();
        syncWizardControls();
      });
      qSizeButtons.push({ id: o.id, node: btn });
      sizeWrap.appendChild(btn);
    });

    var addonWrap = $('#q-addons');
    ADDONS.forEach(function (a) {
      var btn = el('button', 'chip chip--pill', a.label);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        state.addons[a.id] = !state.addons[a.id];
        syncAddons();
      });
      addonButtons.push({ id: a.id, node: btn });
      addonWrap.appendChild(btn);
    });

    bindInput('#q-from', 'from');
    bindInput('#q-to', 'to');
    bindInput('#q-date', 'date');
    bindInput('#q-name', 'name');
    bindInput('#q-phone', 'phone');
    bindInput('#q-email', 'email');

    $('#w-back').addEventListener('click', function () {
      state.step = Math.max(1, state.step - 1);
      syncWizard();
    });

    $('#w-next').addEventListener('click', function () {
      if (state.step === 3 && !state.qsize) return;
      if (state.step === 5) {
        state.submitted = true;
      } else {
        state.step += 1;
      }
      syncWizard();
    });

    $('#restart').addEventListener('click', function () {
      state.step = 1;
      state.submitted = false;
      state.mtype = '';
      state.from = '';
      state.to = '';
      state.qsize = '';
      state.date = '';
      state.addons = {};
      state.name = '';
      state.phone = '';
      state.email = '';
      ['#q-from', '#q-to', '#q-date', '#q-name', '#q-phone', '#q-email'].forEach(function (sel) {
        $(sel).value = '';
      });
      syncWizard();
      window.scrollTo(0, 0);
    });
  }

  function bindInput(selector, key) {
    var node = $(selector);
    node.addEventListener('input', function () { state[key] = node.value; });
  }

  function syncQuoteSizes() {
    qSizeButtons.forEach(function (b) {
      var on = b.id === state.qsize;
      toggleClass(b.node, 'is-on', on);
      b.node.setAttribute('aria-pressed', String(on));
    });
  }

  function syncAddons() {
    addonButtons.forEach(function (b) {
      var on = !!state.addons[b.id];
      toggleClass(b.node, 'is-on', on);
      b.node.setAttribute('aria-pressed', String(on));
    });
  }

  function syncWizardControls() {
    var blocked = state.step === 3 && !state.qsize;
    var next = $('#w-next');
    toggleClass(next, 'is-disabled', blocked);
    next.setAttribute('aria-disabled', String(blocked));
    next.textContent = state.step === 5 ? 'Send my quote request' : 'Continue →';
  }

  function buildSummary() {
    var type = MOVE_TYPES.filter(function (m) { return m.id === state.mtype; })[0];
    var qsize = SIZES.filter(function (x) { return x.id === state.qsize; })[0];
    var chosen = ADDONS.filter(function (a) { return state.addons[a.id]; })
      .map(function (a) { return a.label; });

    return [
      { k: 'MOVE TYPE',   v: type ? type.title : 'Not specified' },
      { k: 'ROUTE',       v: (state.from || 'Origin TBD') + '  →  ' + (state.to || 'Destination TBD') },
      { k: 'HOME SIZE',   v: qsize ? qsize.label : 'Not specified' },
      { k: 'TARGET DATE', v: state.date || 'Flexible' },
      { k: 'ADD-ONS',     v: chosen.length ? chosen.join(', ') : 'None' },
      { k: 'CONTACT',     v: (state.name || 'Name TBD') + ' · ' + (state.phone || state.email || 'no contact given') }
    ];
  }

  function syncWizard() {
    $$('.wstep').forEach(function (node) {
      var key = node.getAttribute('data-step');
      var visible = state.submitted
        ? key === 'done'
        : key === String(state.step);
      node.hidden = !visible;
    });

    $('#progress-bar').style.width = state.submitted ? '100%' : (state.step / 5) * 100 + '%';

    $$('#wizard-nav li').forEach(function (li, i) {
      toggleClass(li, 'is-current', !state.submitted && state.step === i + 1);
    });

    moveTypeButtons.forEach(function (b) {
      var on = b.id === state.mtype;
      toggleClass(b.node, 'is-on', on);
      b.node.setAttribute('aria-pressed', String(on));
    });
    syncQuoteSizes();
    syncAddons();

    $('#wizard-foot').hidden = state.submitted;
    $('#w-back').hidden = state.step <= 1;
    $('#step-counter').textContent = 'STEP ' + state.step + ' OF 5';
    syncWizardControls();

    if (state.submitted) {
      $('#summary-line').textContent =
        'Reference #AYN-' + (2600 + state.t * 7 + state.step) + '. A coordinator is reviewing your details now.';
      var list = $('#summary-list');
      list.textContent = '';
      buildSummary().forEach(function (row) {
        var wrap = el('div', 'summary__row');
        wrap.appendChild(el('dt', 'summary__k', row.k));
        wrap.appendChild(el('dd', 'summary__v', row.v));
        list.appendChild(wrap);
      });
    }
  }

  /* ------------------------------------------------------------------
     Routing
  ------------------------------------------------------------------ */
  function pageFromHash() {
    var raw = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase();
    return PAGES.indexOf(raw) > -1 ? raw : 'home';
  }

  function syncPage(scroll) {
    state.page = pageFromHash();

    $$('.page').forEach(function (node) {
      node.hidden = node.getAttribute('data-page') !== state.page;
    });

    $$('[data-nav]').forEach(function (link) {
      var on = link.getAttribute('data-nav') === state.page;
      toggleClass(link, 'is-active', on);
      if (on) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    document.title = ({
      home: 'AllYouNeedMovers — South Florida Movers, Local & Long Distance',
      services: 'Services — AllYouNeedMovers',
      about: 'About — AllYouNeedMovers',
      quote: 'Get a Free Quote — AllYouNeedMovers'
    })[state.page];

    if (state.page === 'home') syncFaq();
    if (scroll) window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  function init() {
    renderStatic();
    buildEstimator();
    buildZipChecker();
    buildTestimonials();
    buildFaq();
    buildWizard();

    syncEstimator();
    syncZip();
    syncTestimonial();
    syncWizard();
    syncPage(false);
    syncFaq();

    window.addEventListener('hashchange', function () { syncPage(true); });
    window.addEventListener('resize', function () { syncFaq(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
