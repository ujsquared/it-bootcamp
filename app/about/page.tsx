'use client';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center -mt-16">
      <div className="grid grid-cols-2 gap-8 w-full max-w-6xl px-4">
        {/* About Content */}
        <div className="hover-animation">
          <div className="glass p-8 rounded-xl">
            <h1 className="text-4xl font-light mb-6 tracking-wider text-white">About Us</h1>
            <div className="h-0.5 w-12 bg-white/20 mb-6"></div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Welcome to the IT Bootcamp of IIIT Bhubaneswar, where funding never meets education.
            </p>
          </div>
        </div>

        {/* Creators Section */}
        <div className="hover-animation-delayed">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-light mb-6 tracking-wider text-white">Site Creators</h2>
            <div className="space-y-6">
              {/* Ujjwal Kala */}
              <div className="flex flex-col">
                <span className="text-white text-lg mb-2">Ujjwal Kala</span>
                <span className="text-gray-400 text-sm mb-3">Backend Developer</span>
                <div className="flex space-x-4">
                  <Link href="https://www.linkedin.com/" className="text-gray-400 transition-colors">
                    <FaLinkedin size={20} />
                  </Link>
                  <Link href="https://github.com/" className="text-gray-400 transition-colors">
                    <FaGithub size={20} />
                  </Link>
                </div>
              </div>

              {/* Ansh Malgotra */}
              <div className="flex flex-col">
                <span className="text-white text-lg mb-2">Ansh Malgotra</span>
                <span className="text-gray-400 text-sm mb-3">Frontend Developer</span>
                <div className="flex space-x-4">
                  <Link href="https://www.linkedin.com/" className="text-gray-400 transition-colors">
                    <FaLinkedin size={20} />
                  </Link>
                  <Link href="https://github.com/" className="text-gray-400 transition-colors">
                    <FaGithub size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
