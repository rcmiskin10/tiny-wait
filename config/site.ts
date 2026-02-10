import { Zap, Users, BarChart, Globe, Clock, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'TinyWait',
  tagline: 'Beautiful waitlist pages for indie hackers',
  description: 'Waitlist and launch page builder with email capture, referral tracking, and countdown timers for indie hackers.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'TinyWait',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Templates', href: '/templates' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Waitlist Pages', href: '/dashboard/entities' },
    { title: 'Analytics', href: '/dashboard/analytics' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Built for Indie Hackers',
    headline: 'Launch Your Waitlist Page',
    headlineHighlight: 'In Under 10 Minutes',
    subheadline: 'Create a stunning coming-soon page with built-in email capture, viral referral tracking, and a live countdown timer. No design skills needed. Free to start, just $12/mo to go Pro.',
    primaryCta: { text: 'Create Your Page Free', href: '/register' },
    secondaryCta: { text: 'See Templates', href: '/templates' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers', rating: '4.9/5' },
  },

  features: [
    {
      icon: Zap,
      title: '10-Minute Setup',
      description: 'Answer a few questions and get a polished, mobile-responsive waitlist page live instantly — no drag-and-drop complexity.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Users,
      title: 'Viral Referral Engine',
      description: 'Every subscriber gets a unique referral link with leaderboard tracking and milestone rewards to supercharge your growth.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: BarChart,
      title: 'Real-Time Analytics',
      description: 'Track signups, referral sources, conversion rates, and signup velocity with a clean, actionable analytics dashboard.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Globe,
      title: 'Custom Domains',
      description: 'Point your own domain to your waitlist page with simple CNAME setup. Build credibility from day one.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Clock,
      title: 'Launch Countdown Timer',
      description: 'Build urgency with a beautiful, real-time countdown timer that shows visitors exactly when you\'re going live.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Sparkles,
      title: 'Stunning Templates',
      description: 'Choose from curated, modern templates with dark mode options and gradient accents — every page looks professionally designed.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Vercel', color: 'bg-gray-900 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Templates', href: '/templates' },
        { title: 'Changelog', href: '/changelog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' }
      ],
    }
  ],

  footerCopyright: '2026 TinyWait. All rights reserved.',

  social: {
    discord: 'https://discord.gg/tinywait',
    github: 'https://github.com/tinywait',
    twitter: 'https://twitter.com/tinywait'
  },
}
