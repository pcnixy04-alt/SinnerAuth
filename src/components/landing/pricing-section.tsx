"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "free forever",
    description: "Perfect for small projects and prototyping.",
    features: [
      "1 Project",
      "100 Users",
      "Basic Analytics",
      "Community Support",
      "Standard API Access",
      "1 SDK Integration",
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
    features: [
      "10 Projects",
      "10,000 Users",
      "Advanced Analytics",
      "Priority Support",
      "Full API Access",
      "All SDKs",
      "Webhook Integrations",
      "Custom Branding",
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
    features: [
      "Unlimited Projects",
      "Unlimited Users",
      "Dedicated Infrastructure",
      "Priority Support",
      "Custom Integrations",
      "SLA Guarantee",
      "On-Premise Option",
      "Dedicated Account Manager",
      "Custom Contracting",
    ],
    cta: "Contact Sales",
    href: "https://discord.gg/V2eVZkby5V",
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Start for free. Scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-primary/30 bg-gradient-glass shadow-glow"
                  : "border-border bg-gradient-glass hover:border-primary/20"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-black text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
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
          ))}
        </div>
      </div>
    </section>
  )
}
