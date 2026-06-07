"use client"

import { BookOpen, Code2, Link as LinkIcon } from "lucide-react"

const endpoints = [
  { method: "POST", path: "/api/v1/authenticate", desc: "Authenticate with license key and HWID" },
  { method: "POST", path: "/api/v1/validate", desc: "Validate a session token" },
  { method: "POST", path: "/api/v1/refresh", desc: "Refresh an expiring session" },
  { method: "DELETE", path: "/api/v1/sessions/:id", desc: "Terminate a session" },
  { method: "GET", path: "/api/v1/sessions", desc: "List active sessions" },
  { method: "POST", path: "/api/v1/devices/register", desc: "Register a new device" },
  { method: "POST", path: "/api/v1/devices/verify", desc: "Verify device integrity" },
  { method: "GET", path: "/api/v1/devices", desc: "List registered devices" },
  { method: "PUT", path: "/api/v1/devices/:id/ban", desc: "Ban a device" },
  { method: "GET", path: "/api/v1/licenses", desc: "List license keys" },
  { method: "POST", path: "/api/v1/licenses/generate", desc: "Generate a new license" },
  { method: "PUT", path: "/api/v1/licenses/:id/revoke", desc: "Revoke a license" },
  { method: "GET", path: "/api/v1/analytics", desc: "Get analytics data" },
  { method: "GET", path: "/api/v1/audit-logs", desc: "Query audit logs" },
]

export default function ReferencesPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Developer References</h1>
        <p className="text-muted text-lg">Complete API reference for all SinnerAuth endpoints.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-primary" />
          Base URL
        </h2>
        <div className="rounded-xl border border-border bg-gradient-glass p-4">
          <code className="text-sm font-mono text-primary">https://api.sinnerauth.com/v1</code>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Authentication
        </h2>
        <p className="text-sm text-muted mb-4">
          All API requests require authentication via an API key in the header:
        </p>
        <div className="rounded-xl border border-border bg-gradient-glass p-4">
          <code className="text-sm font-mono text-primary">Authorization: Bearer sk_your_api_key_here</code>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Endpoints</h2>
        <div className="space-y-2">
          {endpoints.map((ep) => (
            <div key={ep.path} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-gradient-glass">
              <span className={`px-2 py-0.5 rounded text-xs font-mono shrink-0 ${
                ep.method === "GET" ? "bg-success/10 text-success" :
                ep.method === "POST" ? "bg-primary/10 text-primary" :
                ep.method === "PUT" ? "bg-warning/10 text-warning" :
                "bg-accent/10 text-accent"
              }`}>
                {ep.method}
              </span>
              <code className="text-sm font-mono text-muted flex-1">{ep.path}</code>
              <span className="text-xs text-muted">{ep.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Rate Limits</h2>
        <div className="rounded-xl border border-border bg-gradient-glass p-6">
          <div className="space-y-3">
            {[
              { tier: "Free", limit: "100 req/min" },
              { tier: "Professional", limit: "1,000 req/min" },
              { tier: "Enterprise", limit: "10,000 req/min" },
            ].map((item) => (
              <div key={item.tier} className="flex items-center justify-between">
                <span className="text-sm text-white font-medium">{item.tier}</span>
                <span className="text-sm text-muted">{item.limit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
