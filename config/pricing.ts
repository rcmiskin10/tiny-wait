export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'freemium',

  defaultLimits: {
    entities: 1,
    signups: 100
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for validating your first idea',
      price: { monthly: 0 },
      limits: {
        entities: 1,
        signups: 100
      },
      features: [
        '1 waitlist page',
        'Up to 100 email signups',
        'Basic referral link tracking',
        'Launch countdown timer',
        'Real-time signup counter',
        'Community templates',
        'Daily signups chart',
        'Powered by TinyWait badge'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Everything you need to launch like a pro',
      price: { monthly: 12, yearly: 96 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1,
        signups: -1
      },
      features: [
        'Unlimited waitlist pages',
        'Unlimited email signups',
        'Custom domain support (CNAME)',
        'Remove TinyWait branding',
        'Advanced analytics & referral breakdown',
        'Referral leaderboard & milestones',
        'CSV & API export of signups',
        'ConvertKit, Mailchimp & Zapier integrations',
        'Discord & Slack signup notifications',
        'Priority email support'
      ],
      highlighted: true,
      cta: 'Upgrade to Pro',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For agencies and serial launchers',
      price: { monthly: 29, yearly: 240 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        entities: -1,
        signups: -1
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        '50+ waitlist pages',
        'White-label (no TinyWait references)',
        'Client-facing analytics reports',
        'API access for programmatic management',
        'A/B test page variants',
        'Priority support with 24h response'
      ],
      cta: 'Start Team Plan',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}
