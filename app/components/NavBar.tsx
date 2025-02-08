'use client';

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user?email=${session.user.email}&year=${'20'+session?.user?.email?.slice(2, 4)}`);
          const data = await response.json();
          if (data.profile_pic) {
            setProfilePic(data.profile_pic);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };

    if (session) {
      fetchProfilePic();
    }
  }, [session]);

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/profile/my' });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 w-48"></div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
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
                    {profilePic ? (
                      <Image
                        src={profilePic}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      // Fallback to session image or default avatar
                      <Image
                        src={session.user?.image || '/default-avatar.png'}
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

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 bg-black/95 transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="/profile/year"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors"
            >
              YEAR
            </Link>

            {status === "loading" ? (
              <div className="h-10 w-20 animate-pulse bg-white/10 rounded" />
            ) : session ? (
              <div className="space-y-4">
                <Link
                  href="/profile/my"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                >
                  {profilePic ? (
                    <Image
                      src={profilePic}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={session.user?.image || '/default-avatar.png'}
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
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="w-full border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignIn();
                }}
                className="w-full border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors"
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}