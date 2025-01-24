'use client';
import { useEffect, useState } from 'react';
import { getRandomFont } from './components/FontLoader';
import Image from "next/image";
import Link from "next/link";
import ParticleBackground from "./components/ParticleBackground";
import { signIn } from "next-auth/react";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center">
          {/* Empty for particles, but container is responsive */}
        </div>
      </div>
    </div>
  );
}
