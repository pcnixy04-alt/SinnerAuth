"use client"

import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { ApiSection } from "@/components/landing/api-section"
import { SecuritySection } from "@/components/landing/security-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <DashboardPreview />
      <ApiSection />
      <SecuritySection />
      <PricingSection />

      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-6">
              Ready to Secure Your Application?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
              Join thousands of developers who trust SinnerAuth for their authentication infrastructure.
              Get started in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-black font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Start Building For Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-white font-semibold hover:border-primary/50 transition-all"
              >
                Read Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
