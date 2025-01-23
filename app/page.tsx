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
