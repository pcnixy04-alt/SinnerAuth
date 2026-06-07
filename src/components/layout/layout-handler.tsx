"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

export function LayoutHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
