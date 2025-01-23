'use client';
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";

export default function About() {
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
                <Link href="/gallery" className="text-gray-300 hover:text-white px-3 py-2 tracking-[0.15em] text-sm transition-colors">GALLERY</Link>
                <Link href="/login" className="border border-white/30 text-white px-8 py-3 tracking-[0.15em] text-sm hover:bg-white/10 transition-colors">LOGIN</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left side text */}
            <div className="animate-float">
              <h2 className="text-4xl font-light text-white mb-8 tracking-wide">
                About Us
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed tracking-wide font-light">
                This is IT Bootcamp of IIIT Bhubaneswar, has batches 2025, 2026, 2027, 2028
              </p>
              <div className="mt-12 grid grid-cols-2 gap-4">
                {[2025, 2026, 2027, 2028].map((year) => (
                  <div key={year}
                    className="border border-white/10 rounded-lg p-4 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                    <span className="text-white text-xl font-light">{year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side empty for particles */}
            <div className="h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
