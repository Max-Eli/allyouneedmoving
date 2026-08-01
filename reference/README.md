# AllYouNeedMovers

Marketing site for AllYouNeedMovers — a South Florida moving company. Four screens
(Home, Services, About, Quote) with a move estimator, ZIP service-area check,
review carousel, FAQ accordion, and a five-step quote wizard.

Implemented from the `AllYouNeedMovers v2.dc.html` component in the
[All You Need Movers Website](https://claude.ai/design/p/f07c6878-6081-457f-9056-1ce314cdd745)
Claude Design project.

## Running it

No build step, no dependencies. Open [index.html](index.html) directly, or serve the
folder over HTTP:

```sh
python -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Contents |
| --- | --- |
| [index.html](index.html) | Page shell and static markup for all four screens |
| [styles.css](styles.css) | Design tokens, components, responsive rules |
| [app.js](app.js) | Copy, state, and all interactive behaviour |

## Routing

Screens are switched by hash: `#/home`, `#/services`, `#/about`, `#/quote`. Any
unrecognised hash falls back to Home. Every screen is present in the DOM at all
times and toggled with `hidden`, so the whole site is one document.

## Configuration

The design exposed two homepage sections as component props. They are the `CONFIG`
object at the top of [app.js](app.js#L12); setting either to `false` removes that
section from the page entirely.

```js
var CONFIG = {
  showEstimator: true,   // "See what your move actually takes" block
  showZipChecker: true   // "Do we cover your ZIP?" block
};
```

## Behaviour notes

- **Home size is shared state.** Picking a size in the homepage estimator also
  answers step 3 of the quote wizard, and vice versa. This is intentional — it
  carries over from the source design.
- **Step 3 is the only gated step.** Continue does nothing until a home size is
  chosen; every other step may be skipped.
- **Crew and box maths.** Stairs and piano each add one mover; full packing
  multiplies the box estimate by 1.25.
- **ZIP matching** is prefix-based against `330`–`334` and `349` (South Florida);
  any other valid five-digit ZIP is treated as long distance.

## Content still to supply

The three hatched `[ PHOTO SLOT ]` / `[ MAP SLOT ]` blocks are placeholders from the
design, annotated with their intended subject and pixel dimensions. Replace the
`.slot` divs with real `<img>` elements when photography is ready.

Phone number, address, and licence numbers are the placeholder values from the
design and should be checked before launch.

## Browser support

Modern evergreen browsers. Uses CSS custom properties, grid, `backdrop-filter`, and
`text-wrap: balance` (which degrades gracefully where unsupported). Honours
`prefers-reduced-motion`.
