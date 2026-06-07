"use client"

import { useSession, signOut as nextSignOut } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user ?? null,
    isLoading: status === "loading",
    signOut: () => nextSignOut(),
  }
}

export { SessionProvider } from "next-auth/react"
