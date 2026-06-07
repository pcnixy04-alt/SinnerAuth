"use client"

import { motion } from "framer-motion"
import {
  Lock,
  Key,
  RefreshCw,
  Fingerprint,
  Gauge,
  Shield,
  Eye,
  Radio,
  FileText,
  Monitor,
  Siren,
  Scan,
} from "lucide-react"

const securityFeatures = [
  { icon: Lock, title: "AES-256 Encryption", description: "Military-grade encryption for all data at rest and in transit." },
  { icon: Key, title: "JWT Authentication", description: "Secure JSON Web Token-based authentication with RS256 signing." },
  { icon: RefreshCw, title: "Secure Token Rotation", description: "Automatic token rotation with configurable refresh intervals." },
  { icon: Fingerprint, title: "Device Fingerprinting", description: "Advanced hardware and software fingerprinting for device identification." },
  { icon: Gauge, title: "Rate Limiting", description: "Configurable rate limiting to prevent abuse and brute force attacks." },
  { icon: Shield, title: "DDoS Protection", description: "Enterprise-grade DDoS mitigation with Cloudflare integration." },
  { icon: Eye, title: "Session Protection", description: "Real-time session monitoring with anomaly detection and auto-termination." },
  { icon: Radio, title: "Encrypted Transport", description: "End-to-end encryption with TLS 1.3 for all API communications." },
  { icon: FileText, title: "Audit Trails", description: "Immutable audit logs with complete event history and forensic analysis." },
  { icon: Monitor, title: "Real-Time Monitoring", description: "24/7 monitoring with instant alerts and automated incident response." },
  { icon: Siren, title: "Threat Intelligence", description: "Integrated threat intelligence feeds for proactive security measures." },
  { icon: Scan, title: "Vulnerability Scanning", description: "Automated vulnerability scanning and dependency security checks." },
]

export function SecuritySection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/[0.02] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-sm text-accent mb-4">
            <Shield className="w-4 h-4" />
            Enterprise Security
          </div>
          <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-4">
            Security First, Always
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Every layer of our infrastructure is built with security as the primary concern.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="group relative p-5 rounded-xl border border-border bg-gradient-glass backdrop-blur-sm hover:border-accent/30 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
