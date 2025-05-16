import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Providers } from "./Redux/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "You-can Measure - Plastic Waste Measurement Tool",
  description:
    "A simple tool to help you estimate the weight of your plastic waste for better recycling and environmental impact tracking."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
