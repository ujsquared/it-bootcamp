'use client';
import { useEffect, useState } from 'react';
import { getRandomFont } from './components/FontLoader';
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Empty for particles, but container is responsive */}
        </div>
      </main>
    </div>
  );
}
