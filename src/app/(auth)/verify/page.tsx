"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur-2xl p-8 shadow-premium text-center">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 justify-center">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">
                Sinner<span className="text-primary">Auth</span>
              </span>
            </Link>

            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-primary" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-sm text-muted max-w-sm mx-auto">
              We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/login">
              <Button variant="default" className="w-full">
                Go to Sign In
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button className="text-primary hover:underline">resend verification</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
