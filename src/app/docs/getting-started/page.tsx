"use client"

import { motion } from "framer-motion"
import { Code2, Terminal, Package, ArrowRight } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Getting Started</h1>
        <p className="text-muted text-lg">
          Learn how to integrate SinnerAuth into your application in minutes.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            Prerequisites
          </h2>
          <div className="rounded-xl border border-border bg-gradient-glass p-6 space-y-3">
            <p className="text-muted">Before you begin, make sure you have:</p>
            <ul className="space-y-2">
              {[
                "A SinnerAuth account (sign up for free)",
                "Your API key from the dashboard",
                "Node.js 18+ or your preferred language SDK",
                "A project created in the dashboard",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Installation
          </h2>
          <div className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/20">
              <span className="text-xs text-muted">npm</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-muted">npm install sinnerauth-sdk</code>
            </pre>
          </div>
          <div className="mt-3 rounded-xl border border-border bg-gradient-glass overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/20">
              <span className="text-xs text-muted">yarn</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-muted">yarn add sinnerauth-sdk</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Quick Start
          </h2>
          <div className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/20">
              <span className="text-xs text-muted">TypeScript</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-muted leading-relaxed">
{`import { SinnerAuth } from 'sinnerauth-sdk';

// Initialize the client
const client = new SinnerAuth({
  apiKey: 'sk_your_api_key_here'
});

// Authenticate a user
const result = await client.authenticate({
  licenseKey: 'XXXX-XXXX-XXXX-XXXX',
  hwid: getUserHardwareId(),
});

console.log('Authenticated:', result.sessionId);`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Next Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Authentication API", href: "/docs/authentication", desc: "Learn about authentication flows" },
              { title: "SDK Installation", href: "/docs/sdk", desc: "Set up SDKs for other languages" },
              { title: "Session Management", href: "/docs/session-management", desc: "Manage user sessions" },
              { title: "HWID Verification", href: "/docs/hwid", desc: "Implement device fingerprinting" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="p-4 rounded-xl border border-border bg-gradient-glass hover:border-primary/30 transition-all group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
