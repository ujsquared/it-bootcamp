"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          IT Bootcamp
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/members">Members</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => signIn("google")}>Sign In</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

