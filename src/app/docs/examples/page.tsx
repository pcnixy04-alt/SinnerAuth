"use client"

import { BookOpen, Code2, Copy, Check } from "lucide-react"
import { useState } from "react"

const examples = [
  {
    title: "User Authentication",
    lang: "TypeScript",
    code: `import { SinnerAuth } from 'sinnerauth-sdk';

const auth = new SinnerAuth({ apiKey: 'sk_...' });

// Authenticate with license + HWID
async function authenticate() {
  const hwid = await auth.getHardwareId();
  const result = await auth.authenticate({
    licenseKey: 'XXXX-XXXX-XXXX-XXXX',
    hwid,
  });
  return result;
}`,
  },
  {
    title: "Session Validation",
    lang: "TypeScript",
    code: `// Validate an existing session
async function validateSession(token: string) {
  const session = await auth.validateSession(token);
  
  if (!session.valid) {
    // Session expired or invalid
    return await auth.refreshSession(token);
  }
  
  return session;
}`,
  },
  {
    title: "Device Management",
    lang: "Python",
    code: `from sinnerauth import SinnerAuth

client = SinnerAuth(api_key="sk_...")

# List registered devices
devices = client.list_devices(
    project_id="proj_123",
    status="active"
)

# Ban suspicious device
client.ban_device(
    device_id="dev_456",
    reason="Suspicious activity detected"
)`,
  },
  {
    title: "Webhook Handling",
    lang: "JavaScript",
    code: `// Express.js webhook handler
app.post('/webhooks/sinnerauth', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'license.activated':
      console.log('License activated:', event.data);
      break;
    case 'session.terminated':
      console.log('Session ended:', event.data);
      break;
    case 'threat.detected':
      console.log('Threat detected:', event.data);
      break;
  }
  
  res.sendStatus(200);
});`,
  },
  {
    title: "Rate Limiting",
    lang: "TypeScript",
    code: `// Configure rate limits per license
const config = await auth.updateConfig({
  rateLimit: {
    enabled: true,
    maxRequests: 1000,
    windowMs: 60000,  // 1 minute
    penaltyMs: 300000, // 5 minute ban
  }
});`,
  },
  {
    title: "Audit Log Query",
    lang: "Python",
    code: `from sinnerauth import SinnerAuth
from datetime import datetime, timedelta

client = SinnerAuth(api_key="sk_...")

# Query audit logs
logs = client.get_audit_logs(
    start_date=datetime.now() - timedelta(days=7),
    actions=["LOGIN", "LOGIN_FAILED"],
    limit=100
)

for log in logs:
    print(f"{log.timestamp}: {log.action} by {log.user}")`,
  },
]

export default function ExamplesPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Examples</h1>
        <p className="text-muted text-lg">Real-world code examples for common use cases.</p>
      </div>

      <div className="space-y-6">
        {examples.map((example, i) => (
          <div key={example.title} className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-black/20">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted">{example.lang}</span>
                <button
                  onClick={() => copyCode(example.code, i)}
                  className="p-1 text-muted hover:text-white transition-colors"
                >
                  {copiedIndex === i ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-muted">{example.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
