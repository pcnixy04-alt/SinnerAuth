"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/admin/seed", { method: "POST" }).catch(() => {})
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }
    if (status === "authenticated" && session?.user?.id) {
      fetch("/api/admin/dashboard")
        .then((res) => {
          if (res.status === 403) {
            setIsAdmin(false)
            router.push("/dashboard")
          } else if (res.ok) {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
            router.push("/dashboard")
          }
        })
        .catch(() => {
          setIsAdmin(false)
          router.push("/dashboard")
        })
    }
  }, [status, session, router])

  if (status === "loading" || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
