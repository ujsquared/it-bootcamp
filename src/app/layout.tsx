import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import { AuthProvider } from "./providers/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IT Bootcamp",
  description: "Learn and grow with our IT bootcamp",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

