"use client"

import { Code2, Package, Download, ChevronRight } from "lucide-react"

const sdks = [
  { name: "C++", install: "vcpkg install sinnerauth", desc: "Native C++ SDK for Windows, Linux, and macOS" },
  { name: "Rust", install: "cargo add sinnerauth", desc: "Safe and fast Rust SDK with async support" },
  { name: "Python", install: "pip install sinnerauth", desc: "Python SDK with type hints and async" },
  { name: "Go", install: "go get github.com/sinnerauth/go-sdk", desc: "Go SDK with goroutine support" },
  { name: "JavaScript", install: "npm install sinnerauth-sdk", desc: "Browser and Node.js SDK" },
  { name: "TypeScript", install: "npm install sinnerauth-sdk", desc: "Full type definitions included" },
  { name: "C#", install: "dotnet add package SinnerAuth", desc: ".NET SDK for C# and F#" },
  { name: "Java", install: `// build.gradle
implementation 'com.sinnerauth:sdk:1.0.0'`, desc: "Java SDK for JVM applications" },
]

export default function SdkPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">SDK Installation</h1>
        <p className="text-muted text-lg">Choose your language and install the SinnerAuth SDK.</p>
      </div>

      <div className="space-y-4">
        {sdks.map((sdk) => (
          <div key={sdk.name} className="rounded-xl border border-border bg-gradient-glass overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-white">{sdk.name}</h3>
                </div>
                <span className="text-xs text-muted">{sdk.desc}</span>
              </div>
              <div className="rounded-lg bg-black/30 p-3">
                <code className="text-sm font-mono text-primary">{sdk.install}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-gradient-glass p-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          SDK Initialization
        </h2>
        <p className="text-sm text-muted mb-4">After installation, initialize the SDK with your API key:</p>
        <div className="rounded-lg bg-black/30 p-4">
          <code className="text-sm font-mono text-muted">
{`// All SDKs follow the same pattern:
const client = new SinnerAuth({
  apiKey: "sk_your_api_key",
  timeout: 5000,        // optional
  retryCount: 3,        // optional
  environment: "prod"   // optional
});`}
          </code>
        </div>
      </div>
    </div>
  )
}
