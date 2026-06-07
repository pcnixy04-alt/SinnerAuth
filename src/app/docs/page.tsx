"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  Code2,
  Key,
  Shield,
  Terminal,
  Webhook,
  FileWarning,
  GraduationCap,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of SinnerAuth and set up your first project",
    icon: GraduationCap,
    href: "/docs/getting-started",
    color: "from-[#00E5FF] to-[#6E56CF]",
  },
  {
    title: "Authentication API",
    description: "Integrate authentication into your application",
    icon: Key,
    href: "/docs/authentication",
    color: "from-[#6E56CF] to-[#FF2D55]",
  },
  {
    title: "SDK Installation",
    description: "Install and configure our SDKs for your platform",
    icon: Terminal,
    href: "/docs/sdk",
    color: "from-[#FF2D55] to-[#F59E0B]",
  },
  {
    title: "Session Management",
    description: "Manage user sessions and authentication states",
    icon: Shield,
    href: "/docs/session-management",
    color: "from-[#F59E0B] to-[#10B981]",
  },
  {
    title: "HWID Verification",
    description: "Implement hardware-based device verification",
    icon: Code2,
    href: "/docs/hwid",
    color: "from-[#10B981] to-[#00E5FF]",
  },
  {
    title: "Error Codes",
    description: "Understand API error codes and troubleshooting",
    icon: FileWarning,
    href: "/docs/errors",
    color: "from-[#00E5FF] to-[#3B82F6]",
  },
  {
    title: "Examples",
    description: "Real-world examples and code snippets",
    icon: BookOpen,
    href: "/docs/examples",
    color: "from-[#3B82F6] to-[#6E56CF]",
  },
  {
    title: "Webhook Guide",
    description: "Set up webhooks for real-time notifications",
    icon: Webhook,
    href: "/docs/webhooks",
    color: "from-[#6E56CF] to-[#FF2D55]",
  },
]

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-muted text-lg max-w-2xl">
          Everything you need to integrate SinnerAuth into your application. Browse guides, API references, and examples.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={cat.href} className="group block">
                <div className="p-6 rounded-xl border border-border bg-gradient-glass hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} p-2.5 shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">{cat.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="rounded-xl border border-border bg-gradient-glass p-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "API Reference", href: "/docs/references" },
            { label: "SDK Download", href: "/docs/sdk" },
            { label: "Status Page", href: "/status" },
            { label: "GitHub Repository", href: "https://github.com/sinnerauth" },
            { label: "Community Forum", href: "/community" },
            { label: "Support", href: "/support" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
