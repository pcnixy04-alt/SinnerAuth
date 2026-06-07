"use client"

import { motion } from "framer-motion"
import {
  Fingerprint,
  Shield,
  Terminal,
  Cloud,
  Users,
  BarChart3,
  Code2,
  Webhook,
  FileSearch,
  Globe,
  Siren,
  Activity,
} from "lucide-react"

const features = [
  {
    icon: Fingerprint,
    title: "Advanced HWID Fingerprinting",
    description: "Hardware-based device identification with sophisticated fingerprinting algorithms for tamper-proof security.",
    gradient: "from-[#00E5FF] to-[#6E56CF]",
  },
  {
    icon: Shield,
    title: "Device Integrity Validation",
    description: "Real-time device integrity checks ensuring only trusted hardware can access your protected resources.",
    gradient: "from-[#6E56CF] to-[#FF2D55]",
  },
  {
    icon: Terminal,
    title: "Enterprise Session Management",
    description: "Complete control over user sessions with real-time monitoring, termination, and analytics.",
    gradient: "from-[#FF2D55] to-[#F59E0B]",
  },
  {
    icon: Cloud,
    title: "Remote Configuration Delivery",
    description: "Deliver dynamic configurations to authenticated clients instantly with over-the-air updates.",
    gradient: "from-[#F59E0B] to-[#10B981]",
  },
  {
    icon: Users,
    title: "Role Based Access Control",
    description: "Granular permission system with custom roles, hierarchies, and fine-grained access policies.",
    gradient: "from-[#10B981] to-[#00E5FF]",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Comprehensive analytics dashboard with live metrics, usage patterns, and security insights.",
    gradient: "from-[#00E5FF] to-[#3B82F6]",
  },
  {
    icon: Code2,
    title: "Multi-Language SDK Support",
    description: "Native SDKs for C++, Rust, Python, Go, JavaScript, TypeScript, C#, and Java.",
    gradient: "from-[#3B82F6] to-[#6E56CF]",
  },
  {
    icon: Webhook,
    title: "Developer Friendly API",
    description: "RESTful API with comprehensive documentation, SDKs, and developer tools for rapid integration.",
    gradient: "from-[#6E56CF] to-[#FF2D55]",
  },
  {
    icon: FileSearch,
    title: "Webhook Integrations",
    description: "Event-driven webhooks for real-time notifications and seamless third-party integrations.",
    gradient: "from-[#FF2D55] to-[#F59E0B]",
  },
  {
    icon: Globe,
    title: "Audit Logging",
    description: "Immutable audit trails with comprehensive logging of all authentication events and system changes.",
    gradient: "from-[#F59E0B] to-[#10B981]",
  },
  {
    icon: Activity,
    title: "IP Reputation Detection",
    description: "Advanced IP reputation scoring with real-time threat intelligence and geolocation analysis.",
    gradient: "from-[#10B981] to-[#00E5FF]",
  },
  {
    icon: Siren,
    title: "Threat Monitoring",
    description: "24/7 automated threat detection with instant alerts and proactive security responses.",
    gradient: "from-[#00E5FF] to-[#3B82F6]",
  },
]

export function Features() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-4">
            Enterprise-Grade Features
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Everything you need to secure your application with enterprise-grade authentication and device management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative p-6 rounded-xl border border-border bg-gradient-glass backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
