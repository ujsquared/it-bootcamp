'use client';
import { useEffect, useState } from 'react';
import { getRandomFont } from './components/FontLoader';
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import PacmanGame from './components/PacmanGame'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <PacmanGame />
    </main>
  );
}
