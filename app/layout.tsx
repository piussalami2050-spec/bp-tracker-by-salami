import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BP Tracker by Salami",
  description: "Nigeria Hypertension tracking application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
