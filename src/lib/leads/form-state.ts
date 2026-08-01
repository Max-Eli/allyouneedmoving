/**
 * Shared form state for the lead actions.
 *
 * This lives outside actions.ts on purpose: a `'use server'` module may only
 * export async functions. Exporting the `initialFormState` object from there
 * builds fine but throws at runtime on the first submission —
 * "A 'use server' file can only export async functions, found object."
 */
export interface FormState {
  status: 'idle' | 'success' | 'error'
  /** Reference shown to the customer on success. */
  reference?: string
  /** Field-level validation messages, keyed by field name. */
  errors?: Record<string, string>
  /** Message shown at the top of the form when the whole submission failed. */
  message?: string
}

export const initialFormState: FormState = { status: 'idle' }
