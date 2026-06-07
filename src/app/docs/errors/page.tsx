"use client"

import { FileWarning, AlertTriangle, Info } from "lucide-react"

const errorCodes = [
  { code: "AUTH_001", title: "Invalid License Key", desc: "The provided license key does not exist or has been revoked.", severity: "error" },
  { code: "AUTH_002", title: "License Expired", desc: "The license key has passed its expiration date.", severity: "error" },
  { code: "AUTH_003", title: "Invalid HWID", desc: "The hardware ID does not match the registered device.", severity: "error" },
  { code: "AUTH_004", title: "Device Banned", desc: "The device has been banned from accessing the service.", severity: "error" },
  { code: "AUTH_005", title: "Rate Limit Exceeded", desc: "Too many authentication requests from this IP.", severity: "warning" },
  { code: "AUTH_006", title: "Session Expired", desc: "The session token has expired and needs to be refreshed.", severity: "warning" },
  { code: "AUTH_007", title: "Invalid API Key", desc: "The API key provided is invalid or has been revoked.", severity: "error" },
  { code: "AUTH_008", title: "Max Devices Reached", desc: "The license has reached its maximum device limit.", severity: "warning" },
  { code: "AUTH_009", title: "Region Restricted", desc: "Access is restricted in the current geographic region.", severity: "warning" },
  { code: "AUTH_010", title: "Maintenance Mode", desc: "The service is currently under maintenance.", severity: "info" },
]

export default function ErrorsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Error Codes</h1>
        <p className="text-muted text-lg">Comprehensive list of API error codes and how to handle them.</p>
      </div>

      <div className="space-y-3">
        {errorCodes.map((err) => (
          <div key={err.code} className="p-4 rounded-xl border border-border bg-gradient-glass">
            <div className="flex items-start gap-3">
              {err.severity === "error" && <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />}
              {err.severity === "warning" && <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />}
              {err.severity === "info" && <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <code className="text-sm font-mono text-primary">{err.code}</code>
                  <h3 className="text-sm font-semibold text-white">{err.title}</h3>
                </div>
                <p className="text-sm text-muted">{err.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-gradient-glass p-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-primary" />
          Error Response Format
        </h2>
        <pre className="overflow-x-auto">
          <code className="text-sm font-mono text-muted">{`{
  "error": {
    "code": "AUTH_001",
    "message": "Invalid License Key",
    "details": "The license key ABC-123 does not exist",
    "timestamp": "2026-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}`}</code>
        </pre>
      </div>
    </div>
  )
}
