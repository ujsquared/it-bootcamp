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
    <>
      <ParticleBackground />

      <NavBar />
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Removed all text content to keep only particles visible */}
          </div>
        </div>
      </div>
    </>
  );
}
