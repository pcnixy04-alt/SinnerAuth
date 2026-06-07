import type { Metadata } from "next"
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SessionProvider } from "@/hooks/useAuth"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: {
    default: "SinnerAuth - Enterprise Authentication Platform",
    template: "%s | SinnerAuth",
  },
  description:
    "Enterprise authentication platform built for developers who demand performance, security, and control.",
  keywords: [
    "authentication",
    "HWID",
    "fingerprinting",
    "security",
    "enterprise",
    "SaaS",
    "session management",
    "API",
  ],
  authors: [{ name: "SinnerAuth" }],
  creator: "SinnerAuth",
  publisher: "SinnerAuth",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sinnerauth.com",
    siteName: "SinnerAuth",
    title: "SinnerAuth - Enterprise Authentication Platform",
    description:
      "Enterprise authentication platform built for developers who demand performance, security, and control.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SinnerAuth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SinnerAuth - Enterprise Authentication Platform",
    description:
      "Enterprise authentication platform built for developers who demand performance, security, and control.",
    images: ["/og-image.png"],
    creator: "@sinnerauth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://sinnerauth.com"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0A0A0A",
                border: "1px solid #1A1A1A",
                color: "#FFFFFF",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
