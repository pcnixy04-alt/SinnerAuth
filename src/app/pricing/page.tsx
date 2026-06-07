"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles, Shield, Zap, Users, Globe, HeadphonesIcon, Infinity } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "free forever",
    description: "Perfect for small projects and prototyping.",
    icon: Zap,
    features: [
      "1 Project",
      "100 Users",
      "Basic Analytics",
      "Community Support",
      "Standard API Access",
      "1 SDK Integration",
      "Rate Limiting",
      "Email Support",
    ],
    cta: "Get Started",
    href: "/register",
    featured: false,
  },
  {
    name: "Professional",
    price: "$19",
    period: "per month",
    description: "Ideal for growing businesses and teams.",
    icon: Shield,
    features: [
      "10 Projects",
      "10,000 Users",
      "Advanced Analytics",
      "Priority Support",
      "Full API Access",
      "All SDKs",
      "Webhook Integrations",
      "Custom Branding",
      "API Access Logs",
      "Team Members",
    ],
    cta: "Start Free Trial",
    href: "/register",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large-scale deployments with custom needs.",
    icon: Globe,
    features: [
      "Unlimited Projects",
      "Unlimited Users",
      "Dedicated Infrastructure",
      "24/7 Priority Support",
      "Custom Integrations",
      "99.99% SLA Guarantee",
      "On-Premise Option",
      "Dedicated Account Manager",
      "Custom Contracting",
      "SSO/SAML",
      "Audit Logs Retention",
      "Early Access Features",
    ],
    cta: "Contact Sales",
    href: "https://discord.gg/V2eVZkby5V",
    featured: false,
  },
]

const comparisons = [
  { feature: "Projects", starter: "1", pro: "10", enterprise: "Unlimited" },
  { feature: "Users", starter: "100", pro: "10,000", enterprise: "Unlimited" },
  { feature: "API Rate Limit", starter: "100/min", pro: "1,000/min", enterprise: "10,000/min" },
  { feature: "SDKs", starter: "1", pro: "All", enterprise: "All + Custom" },
  { feature: "Webhooks", starter: false, pro: true, enterprise: true },
  { feature: "Custom Branding", starter: false, pro: true, enterprise: true },
  { feature: "Priority Support", starter: false, pro: true, enterprise: "24/7 Dedicated" },
  { feature: "SLA", starter: false, pro: "99.9%", enterprise: "99.99%" },
  { feature: "SSO/SAML", starter: false, pro: false, enterprise: true },
  { feature: "On-Premise", starter: false, pro: false, enterprise: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-display-sm sm:text-display-md font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Start for free. Scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                    plan.featured
                      ? "border-primary/30 bg-gradient-glass shadow-glow"
                      : "border-border bg-gradient-glass hover:border-primary/20"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-black text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-sm text-muted">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-muted">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href}>
                    <Button
                      variant={plan.featured ? "default" : "outline"}
                      className={`w-full ${plan.featured ? "bg-primary text-black hover:bg-primary/90" : ""}`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">Compare Plans</h2>
            <div className="rounded-2xl border border-border bg-gradient-glass overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-white">Feature</th>
                    <th className="text-center p-4 text-sm font-semibold text-muted">Starter</th>
                    <th className="text-center p-4 text-sm font-semibold text-primary">Professional</th>
                    <th className="text-center p-4 text-sm font-semibold text-muted">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr key={row.feature} className="border-b border-border last:border-0">
                      <td className="p-4 text-sm text-white">{row.feature}</td>
                      <td className="p-4 text-center text-sm text-muted">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? <Check className="w-4 h-4 text-primary mx-auto" /> : <span className="text-muted">—</span>
                        ) : row.starter}
                      </td>
                      <td className="p-4 text-center text-sm text-muted">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <Check className="w-4 h-4 text-primary mx-auto" /> : <span className="text-muted">—</span>
                        ) : row.pro}
                      </td>
                      <td className="p-4 text-center text-sm text-muted">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? <Check className="w-4 h-4 text-primary mx-auto" /> : <span className="text-muted">—</span>
                        ) : row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
