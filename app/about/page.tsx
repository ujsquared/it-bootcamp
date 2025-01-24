'use client';
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - About Text */}
          <div className="animate-float">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 sm:mb-8 tracking-wide">
              About Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed tracking-wide font-light max-w-xl">
              This is IT Bootcamp of IIIT Bhubaneswar, has batches 2025, 2026, 2027, 2028
            </p>
          </div>

          {/* Right side - Creators Box */}
          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10 hover:-translate-y-2 transition-all duration-500 animate-float">
            <h3 className="text-2xl font-light text-white mb-8 tracking-wide text-center">Site Creators</h3>
            
            {/* Ujjwal Kala */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl text-gray-300 font-light">Ujjwal Kala</p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/ujjwal-kala-8a854328a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a 
                    href="https://github.com/ujsquared"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
              <p className="text-gray-400 font-light">Backend</p>
            </div>

            {/* Ansh Malgotra */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl text-gray-300 font-light">Ansh Malgotra</p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/ansh-malgotra-7b39b1274/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a 
                    href="https://github.com/shokuyansh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
              <p className="text-gray-400 font-light">Frontend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
