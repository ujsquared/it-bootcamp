'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: "/profile",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors"
    >
      {isLoading ? "Loading..." : "Sign In"}
    </button>
  );
} 