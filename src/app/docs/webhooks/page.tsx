"use client"

import { Webhook, Bell, Code2, Shield } from "lucide-react"

const events = [
  { event: "license.created", desc: "A new license key has been generated" },
  { event: "license.activated", desc: "A license has been activated by a user" },
  { event: "license.revoked", desc: "A license has been revoked or suspended" },
  { event: "license.expired", desc: "A license has reached its expiration date" },
  { event: "session.created", desc: "A new user session has been created" },
  { event: "session.terminated", desc: "A user session has been terminated" },
  { event: "device.registered", desc: "A new device has been registered" },
  { event: "device.banned", desc: "A device has been banned" },
  { event: "threat.detected", desc: "A security threat has been detected" },
  { event: "user.verified", desc: "A user has verified their email" },
]

export default function WebhooksPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Webhook Guide</h1>
        <p className="text-muted text-lg">Receive real-time notifications about events in your account.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Webhook className="w-5 h-5 text-primary" />
          Setup
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-gradient-glass p-6">
            <ol className="space-y-3">
              {[
                "Go to Dashboard > Webhooks",
                "Click 'Create Webhook'",
                "Enter your endpoint URL (must be HTTPS)",
                "Select the events you want to subscribe to",
                "Copy the signing secret for verification",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Available Events
        </h2>
        <div className="space-y-2">
          {events.map((evt) => (
            <div key={evt.event} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-gradient-glass">
              <code className="text-sm font-mono text-primary shrink-0">{evt.event}</code>
              <span className="text-sm text-muted">{evt.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security
        </h2>
        <div className="rounded-xl border border-border bg-gradient-glass p-6">
          <p className="text-sm text-muted mb-4">
            Verify webhook signatures to ensure requests are from SinnerAuth:
          </p>
          <pre className="overflow-x-auto">
            <code className="text-sm font-mono text-muted">{`// Verify webhook signature
import { verifyWebhook } from 'sinnerauth-sdk';

app.post('/webhooks/sinnerauth', (req, res) => {
  const signature = req.headers['x-sinnerauth-signature'];
  const valid = verifyWebhook(
    req.body,
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!valid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  res.sendStatus(200);
});`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}
