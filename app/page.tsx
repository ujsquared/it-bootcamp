'use client';
import { useEffect, useState } from 'react';
import { getRandomFont } from './components/FontLoader';
import Image from "next/image";
import Link from "next/link";
import ParticleBackground from "./components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      {/* Navigation */}
      <nav className="fixed w-full z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl tracking-[0.2em] text-white opacity-90" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                IT BOOTCAMP
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-12">
                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors">HOME</Link>
                <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors">ABOUT</Link>
                <Link href="/login" className="border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors">LOGIN</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none text-white opacity-90"
              style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              <span className="block font-light">Future of</span>
              <span className="block font-light mt-4">Technology</span>
            </h1>
            <div className="w-24 h-[1px] bg-white/30 mx-auto my-12"></div>
            <p className="text-xl tracking-wide text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the next generation of tech education
            </p>
            <div className="mt-12">
              <button className="border border-white/30 text-white px-12 py-4 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors">
                EXPLORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
