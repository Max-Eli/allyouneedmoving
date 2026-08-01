/**
 * Pre-launch claim audit.
 *
 *   npm run audit:claims          → report only, always exits 0
 *   npm run audit:claims -- --ci  → exits 1 while unverified claims remain
 *
 * `npm run build` runs the CI form when SITE_ENV=production, so a deploy cannot
 * ship a fabricated licence number, review count, or performance statistic.
 *
 * The audit also re-reads src/config/business.ts and compares each registered
 * placeholder against the value actually in the file. If someone edits a value
 * but forgets to clear its registry entry, that shows up as DRIFTED rather than
 * silently passing.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const configPath = join(__dirname, '..', 'src', 'config', 'business.ts')
const source = readFileSync(configPath, 'utf8')

const ci = process.argv.includes('--ci')

const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const DIM = '\x1b[2m'

/** Pull the PLACEHOLDER_CLAIMS entries out of the TypeScript source. */
function parseClaims(src) {
  const start = src.indexOf('export const PLACEHOLDER_CLAIMS')
  if (start === -1) return []
  const body = src.slice(start)
  const claims = []
  const entryRe = /\{\s*path:\s*'([^']+)',\s*currentValue:\s*'([^']*)',\s*action:\s*'((?:[^'\\]|\\.)*)',\s*risk:\s*'([^']+)',\s*why:\s*'((?:[^'\\]|\\.)*)',?\s*\}/g
  let m
  while ((m = entryRe.exec(body)) !== null) {
    claims.push({
      path: m[1],
      currentValue: m[2],
      action: m[3].replace(/\\'/g, "'"),
      risk: m[4],
      why: m[5].replace(/\\'/g, "'"),
    })
  }
  return claims
}

/** Read `business` and resolve a dotted path against the raw source text. */
function valueAtPath(src, path) {
  const businessStart = src.indexOf('export const business =')
  if (businessStart === -1) return null
  const segments = path.split('.')
  const leaf = segments[segments.length - 1]

  // Narrow to the enclosing object literal when the path is nested.
  let scope = src.slice(businessStart)
  for (const segment of segments.slice(0, -1)) {
    const keyIdx = scope.indexOf(`${segment}: {`)
    if (keyIdx === -1) return null
    scope = scope.slice(keyIdx)
    const open = scope.indexOf('{')
    let depth = 0
    let end = open
    for (let i = open; i < scope.length; i++) {
      if (scope[i] === '{') depth++
      else if (scope[i] === '}') {
        depth--
        if (depth === 0) {
          end = i
          break
        }
      }
    }
    scope = scope.slice(open, end + 1)
  }

  const valueRe = new RegExp(`\\b${leaf}:\\s*(?:'([^']*)'|([0-9.]+))`)
  const match = scope.match(valueRe)
  if (!match) return null
  return match[1] !== undefined ? match[1] : match[2]
}

const claims = parseClaims(source)

if (claims.length === 0) {
  console.log(`${GREEN}${BOLD}✓ No placeholder claims registered.${RESET}`)
  console.log(`${DIM}  Every factual claim in src/config/business.ts has been verified.${RESET}`)
  process.exit(0)
}

const drifted = []
const outstanding = []

for (const claim of claims) {
  const actual = valueAtPath(source, claim.path)
  if (actual !== null && actual !== claim.currentValue) {
    drifted.push({ ...claim, actual })
  } else {
    outstanding.push(claim)
  }
}

const byRisk = { legal: [], high: [], medium: [] }
for (const claim of outstanding) {
  ;(byRisk[claim.risk] ?? byRisk.medium).push(claim)
}

console.log('')
console.log(`${BOLD}Pre-launch claim audit${RESET}`)
console.log(`${DIM}${'─'.repeat(72)}${RESET}`)
console.log('')

const labels = {
  legal: `${RED}LEGAL RISK${RESET}   regulatory or FTC exposure if published as-is`,
  high: `${YELLOW}HIGH${RESET}         misleading to customers, or breaks a conversion path`,
  medium: `${DIM}MEDIUM${RESET}       should be confirmed, lower exposure`,
}

for (const risk of ['legal', 'high', 'medium']) {
  const group = byRisk[risk]
  if (group.length === 0) continue
  console.log(`${labels[risk]}`)
  console.log('')
  for (const claim of group) {
    console.log(`  ${BOLD}${claim.path}${RESET} ${DIM}= ${JSON.stringify(claim.currentValue)}${RESET}`)
    console.log(`    → ${claim.action}`)
    console.log(`    ${DIM}${claim.why}${RESET}`)
    console.log('')
  }
}

if (drifted.length > 0) {
  console.log(`${YELLOW}${BOLD}DRIFTED${RESET} — value changed but still registered as a placeholder`)
  console.log('')
  for (const claim of drifted) {
    console.log(`  ${BOLD}${claim.path}${RESET}`)
    console.log(`    registry says ${JSON.stringify(claim.currentValue)}, file has ${JSON.stringify(claim.actual)}`)
    console.log(`    ${DIM}If this value is now verified, delete its entry from PLACEHOLDER_CLAIMS.${RESET}`)
    console.log('')
  }
}

const legalCount = byRisk.legal.length
const total = outstanding.length + drifted.length

console.log(`${DIM}${'─'.repeat(72)}${RESET}`)
console.log(
  `${BOLD}${total} claim${total === 1 ? '' : 's'} outstanding${RESET}` +
    (legalCount > 0 ? ` ${RED}(${legalCount} with legal exposure)${RESET}` : ''),
)
console.log(`${DIM}Registry: src/config/business.ts → PLACEHOLDER_CLAIMS${RESET}`)
console.log('')

if (ci) {
  console.error(`${RED}${BOLD}✗ Refusing to build for production with unverified claims.${RESET}`)
  console.error(`${DIM}  Verify the values above and remove their PLACEHOLDER_CLAIMS entries.${RESET}`)
  console.error(`${DIM}  To build anyway (staging, previews), leave SITE_ENV unset.${RESET}`)
  console.error('')
  process.exit(1)
}

process.exit(0)
