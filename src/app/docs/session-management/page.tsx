"use client"

import { Radio, Shield, Clock, XCircle, RefreshCw } from "lucide-react"

export default function SessionManagementPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Session Management</h1>
        <p className="text-muted text-lg">Manage and monitor user sessions in real-time.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Radio className="w-5 h-5 text-primary" />
          Session Lifecycle
        </h2>
        <div className="space-y-4">
          {[
            { icon: RefreshCw, title: "Token Generation", desc: "Upon successful authentication, a JWT token is generated with a configurable expiration time." },
            { icon: Clock, title: "Token Refresh", desc: "Sessions can be automatically refreshed using refresh tokens before expiration." },
            { icon: Shield, title: "Validation", desc: "Every API request validates the session token, checking expiration and revocation status." },
            { icon: XCircle, title: "Termination", desc: "Sessions can be manually terminated or automatically expire based on configured rules." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-gradient-glass">
                <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-muted mt-1">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">API Endpoints</h2>
        <div className="space-y-3">
          {[
            { method: "POST", endpoint: "/api/v1/sessions/validate", desc: "Validate a session token" },
            { method: "POST", endpoint: "/api/v1/sessions/refresh", desc: "Refresh an expiring session" },
            { method: "DELETE", endpoint: "/api/v1/sessions/:id", desc: "Terminate a specific session" },
            { method: "GET", endpoint: "/api/v1/sessions", desc: "List all active sessions" },
          ].map((item) => (
            <div key={item.endpoint} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-gradient-glass">
              <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                item.method === "GET" ? "bg-success/10 text-success" :
                item.method === "POST" ? "bg-primary/10 text-primary" :
                "bg-accent/10 text-accent"
              }`}>
                {item.method}
              </span>
              <span className="text-sm font-mono text-muted">{item.endpoint}</span>
              <span className="text-xs text-muted ml-auto">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Session Configuration</h2>
        <div className="rounded-xl border border-border bg-gradient-glass p-6">
          <pre className="overflow-x-auto">
            <code className="text-sm font-mono text-muted">{`{
  "session": {
    "tokenExpiration": "24h",
    "refreshTokenExpiration": "7d",
    "maxActiveSessions": 10,
    "allowConcurrentSessions": true,
    "requireReauthentication": false,
    "sessionTimeout": 3600
  }
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}
