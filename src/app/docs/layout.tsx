"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, BookOpen, Menu, X, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/docs", label: "Overview", icon: BookOpen },
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/authentication", label: "Authentication API" },
  { href: "/docs/sdk", label: "SDK Installation" },
  { href: "/docs/session-management", label: "Session Management" },
  { href: "/docs/hwid", label: "HWID Verification" },
  { href: "/docs/errors", label: "Error Codes" },
  { href: "/docs/examples", label: "Examples" },
  { href: "/docs/webhooks", label: "Webhook Guide" },
  { href: "/docs/references", label: "Developer References" },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{ href: string; label: string }[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const results = sidebarLinks.filter(
        link => link.label !== "Overview" && link.label.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <Input
                  placeholder="Search docs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-black shadow-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-16 bottom-0 w-72 bg-surface border-r border-border p-6 overflow-y-auto">
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          )}

          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={pathname}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
