'use client';

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function NavBar() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/profile/my' });
  };

  return (
    <nav className="fixed w-full z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 w-48"></div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-12">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors">
                HOME
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors">
                ABOUT
              </Link>
              <Link href="/profile/year" className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors">
                YEAR
              </Link>
              {status === "loading" ? (
                <div className="h-10 w-20 animate-pulse bg-white/10 rounded" />
              ) : session ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/profile/my"
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                  >
                    {session.user?.image && (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm tracking-[0.15em]">
                      {session.user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors"
                >
                  LOGIN
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 