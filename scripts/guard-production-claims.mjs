/**
 * Runs automatically before `next build` (npm `prebuild` hook).
 *
 * Staging and preview builds pass straight through. A production build
 * (SITE_ENV=production) runs the claim audit in CI mode, so a deploy cannot ship
 * a fabricated licence number, review count, or performance statistic.
 */

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.SITE_ENV !== 'production') {
  console.log('\x1b[2m› Non-production build — skipping claim audit (set SITE_ENV=production to enforce).\x1b[0m')
  process.exit(0)
}

const result = spawnSync(process.execPath, [join(__dirname, 'audit-claims.mjs'), '--ci'], {
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
