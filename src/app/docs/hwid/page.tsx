"use client"

import { Fingerprint, Shield, Code2, AlertTriangle } from "lucide-react"

export default function HwidPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">HWID Verification</h1>
        <p className="text-muted text-lg">Hardware-based device fingerprinting for tamper-proof security.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-primary" />
          How HWID Works
        </h2>
        <p className="text-sm text-muted mb-4">
          SinnerAuth generates a unique hardware identifier (HWID) by combining multiple system components:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            "CPU Serial Number",
            "Motherboard ID",
            "MAC Address",
            "HDD/SSD Serial",
            "GPU Identifier",
            "RAM Serial Numbers",
            "BIOS Version",
            "TPM Module ID",
          ].map((item) => (
            <div key={item} className="p-3 rounded-lg border border-border bg-gradient-glass">
              <span className="text-sm text-muted">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Implementation
        </h2>
        <div className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
          <div className="p-4">
            <pre className="overflow-x-auto">
              <code className="text-sm font-mono text-muted">{`// Get hardware ID
const hwid = await client.getHardwareId();

// Register device with HWID
const device = await client.registerDevice({
  hwid: hwid,
  name: "User's PC",
  platform: "windows"
});

// Verify device integrity
const integrity = await client.verifyIntegrity({
  hwid: hwid,
  checksum: calculateChecksum()
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security Features
        </h2>
        <div className="space-y-3">
          {[
            { title: "Anti-Tampering", desc: "HWID calculation uses cryptographic hashing to prevent manipulation" },
            { title: "Spoof Detection", desc: "Advanced algorithms detect virtualized or spoofed hardware" },
            { title: "Device History", desc: "Track HWID changes over time to detect suspicious modifications" },
            { title: "Trust Scoring", desc: "Each device gets a trust score based on consistency and history" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-gradient-glass">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
