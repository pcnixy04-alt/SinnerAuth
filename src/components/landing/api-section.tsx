"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, ChevronRight } from "lucide-react"

const languages = [
  { name: "C++", value: "cpp" },
  { name: "Rust", value: "rust" },
  { name: "Python", value: "python" },
  { name: "Go", value: "go" },
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "typescript" },
  { name: "C#", value: "csharp" },
  { name: "Java", value: "java" },
]

const snippets: Record<string, string> = {
  cpp: `#include <SinnerAuth/SinnerAuth.h>

int main() {
    SinnerAuth auth("sk_your_api_key");
    
    // Authenticate with HWID
    AuthResult result = auth.authenticate({
        .licenseKey = "XXXX-XXXX-XXXX-XXXX",
        .hwid = getHardwareId(),
        .metadata = {
            {"version", "1.0.0"},
            {"platform", "windows"}
        }
    });
    
    if (result.success) {
        printf("Authenticated! Session: %s\\n", 
               result.sessionId.c_str());
    }
    return 0;
}`,
  rust: `use sinnerauth::{Client, Config};

#[tokio::main]
async fn main() {
    let client = Client::new("sk_your_api_key");
    
    let result = client
        .authenticate(AuthRequest {
            license_key: "XXXX-XXXX-XXXX-XXXX",
            hwid: get_hardware_id(),
            metadata: HashMap::from([
                ("version", "1.0.0"),
            ]),
        })
        .await;
    
    match result {
        Ok(session) => println!("Session: {}", session.id),
        Err(e) => eprintln!("Auth failed: {}", e),
    }
}`,
  python: `from sinnerauth import SinnerAuth

client = SinnerAuth(api_key="sk_your_api_key")

# Authenticate with device fingerprint
result = client.authenticate(
    license_key="XXXX-XXXX-XXXX-XXXX",
    hwid=get_hardware_id(),
    metadata={
        "version": "1.0.0",
        "platform": "linux"
    }
)

if result.success:
    print(f"Session: {result.session_id}")
    print(f"Expires: {result.expires_at}")`,
  go: `package main

import (
    "fmt"
    "github.com/sinnerauth/go-sdk"
)

func main() {
    client := sinnerauth.New("sk_your_api_key")
    
    result, err := client.Authenticate(&sinnerauth.AuthRequest{
        LicenseKey: "XXXX-XXXX-XXXX-XXXX",
        HWID:       getHardwareID(),
        Metadata: map[string]string{
            "version": "1.0.0",
        },
    })
    
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Session: %s\\n", result.SessionID)
}`,
  javascript: `import { SinnerAuth } from 'sinnerauth-sdk';

const client = new SinnerAuth({
  apiKey: 'sk_your_api_key'
});

// Authenticate with HWID
const result = await client.authenticate({
  licenseKey: 'XXXX-XXXX-XXXX-XXXX',
  hwid: getHardwareId(),
  metadata: {
    version: '1.0.0',
    platform: 'windows'
  }
});

console.log('Session:', result.sessionId);`,
  typescript: `import { SinnerAuth, AuthResult } from 'sinnerauth-sdk';

const client = new SinnerAuth({
  apiKey: 'sk_your_api_key'
});

interface AuthResponse extends AuthResult {
  sessionId: string;
  expiresAt: Date;
}

const result = await client.authenticate<AuthResponse>({
  licenseKey: 'XXXX-XXXX-XXXX-XXXX',
  hwid: getHardwareId(),
  metadata: {
    version: '1.0.0',
  },
});

console.log('Session:', result.sessionId);`,
  csharp: `using SinnerAuth;

var client = new SinnerAuthClient("sk_your_api_key");

var result = await client.AuthenticateAsync(
    new AuthRequest
    {
        LicenseKey = "XXXX-XXXX-XXXX-XXXX",
        HWID = GetHardwareId(),
        Metadata = new Dictionary<string, string>
        {
            ["version"] = "1.0.0"
        }
    }
);

Console.WriteLine($"Session: {result.SessionId}");`,
  java: `import com.sinnerauth.*;

public class Example {
    public static void main(String[] args) {
        SinnerAuth client = new SinnerAuth("sk_your_api_key");
        
        AuthResult result = client.authenticate(
            AuthRequest.newBuilder()
                .licenseKey("XXXX-XXXX-XXXX-XXXX")
                .hwid(getHardwareId())
                .putMetadata("version", "1.0.0")
                .build()
        );
        
        System.out.println("Session: " + result.getSessionId());
    }
}`,
}

export function ApiSection() {
  const [activeLang, setActiveLang] = useState("typescript")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippets[activeLang])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/[0.02] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm sm:text-display-md font-bold text-white mb-4">
            Developer-First API
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Native SDKs for every major programming language. Copy-paste integration in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-surface/80 backdrop-blur-2xl overflow-hidden shadow-premium"
        >
          <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-black/20">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setActiveLang(lang.value)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                  activeLang === lang.value
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 z-10 p-2 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="p-6 overflow-x-auto">
              <code className="text-sm font-mono text-muted leading-relaxed">
                {snippets[activeLang]}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
