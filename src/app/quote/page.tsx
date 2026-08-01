import { QuoteWizard } from '@/components/quote-wizard'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Get a Free Moving Quote',
  description:
    'Five questions and a coordinator calls back within one business hour with a written estimate. No account, no deposit, no spam.',
  path: '/quote',
})

export default function QuotePage() {
  return <QuoteWizard />
}
