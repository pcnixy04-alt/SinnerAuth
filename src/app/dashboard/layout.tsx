"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Crown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showReminder, setShowReminder] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const plan = session?.user?.plan
  const planExpiresAt = session?.user?.planExpiresAt
  const daysLeft = plan === "PROFESSIONAL" && planExpiresAt
    ? Math.max(0, Math.ceil((new Date(planExpiresAt).getTime() - Date.now()) / 86400000))
    : null

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        {showReminder && daysLeft !== null && daysLeft > 0 && daysLeft <= 30 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-warning/10 border-b border-warning/20 px-8 py-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-sm">
              <Crown className="w-4 h-4 text-warning" />
              <span className="text-warning font-medium">Professional Plan</span>
              <span className="text-muted">
                {daysLeft === 1
                  ? "expires tomorrow — renew to keep access"
                  : `expires in ${daysLeft} days — renew to keep access`}
              </span>
            </div>
            <button onClick={() => setShowReminder(false)} className="text-muted hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
