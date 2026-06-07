"use client"

import { Code2, Key, Shield, CheckCircle } from "lucide-react"

export default function AuthenticationPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Authentication API</h1>
        <p className="text-muted text-lg">Authenticate users with license keys and hardware identifiers.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" />
          Authenticate Endpoint
        </h2>
        <div className="rounded-xl border border-border bg-gradient-glass overflow-hidden mb-4">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/20">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono">POST</span>
            <span className="text-xs font-mono text-muted">/api/v1/authenticate</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-muted">{`{
  "licenseKey": "XXXX-XXXX-XXXX-XXXX",
  "hwid": "unique-hardware-id",
  "metadata": {
    "version": "1.0.0",
    "platform": "windows"
  }
}`}</code>
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/20">
            <span className="text-xs text-muted">Response</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-muted">{`{
  "success": true,
  "sessionId": "sess_abc123def456",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2026-12-31T23:59:59Z",
  "user": {
    "id": "usr_123",
    "username": "johndoe"
  }
}`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Authentication Flow
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Initialize SDK", desc: "Create a SinnerAuth client with your API key" },
            { step: "2", title: "Collect License Key", desc: "Get the license key from the user" },
            { step: "3", title: "Capture HWID", desc: "Use our SDK to get the device's hardware identifier" },
            { step: "4", title: "Call Authenticate", desc: "Send both credentials to our API" },
            { step: "5", title: "Verify Response", desc: "Check if authentication was successful" },
            { step: "6", title: "Store Session", desc: "Save the session token for future requests" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-gradient-glass">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{item.step}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Code Examples
        </h2>
        <div className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-black/20">
            <span className="text-xs text-muted">TypeScript</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-muted">{`import { SinnerAuth } from 'sinnerauth-sdk';

const client = new SinnerAuth({
  apiKey: process.env.SINNERAUTH_API_KEY
});

async function loginUser(licenseKey: string) {
  try {
    const hwid = await client.getHardwareId();
    
    const result = await client.authenticate({
      licenseKey,
      hwid,
      metadata: {
        version: appVersion,
        platform: navigator.platform,
      },
    });
    
    if (result.success) {
      // Store session
      localStorage.setItem('session', result.sessionId);
      return result;
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}
