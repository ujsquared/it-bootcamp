'use client';
import PacmanGame from './components/PacmanGame'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <PacmanGame />
    </main>
  );
}
