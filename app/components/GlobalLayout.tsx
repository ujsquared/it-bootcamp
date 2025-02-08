'use client';
import NavBar from "./NavBar";
import { useEffect, useState } from 'react';

// Add custom type for the style object
type CharStyle = React.CSSProperties & {
    '--char-index': number;
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPlaying(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Top Navigation */}
            <div className="relative z-20">
                <NavBar />
            </div>

            {/* VHS Title */}
            <div className="vhs-title">
                {"IT BOOTCAMP".split('').map((char, i) => (
                    <span key={i} className="char" style={{ '--char-index': i } as CharStyle}>
                        {char}
                    </span>
                ))}
            </div>

            {/* Record Speed */}
            <div className="recordSpeed">
                {isPlaying ? "SLP" : "   "} 0:00:00
            </div>

            {/* VHS Screen Box */}
            <div className="fixed inset-0 flex items-center justify-center z-0">
                <div className="vhs-screen">
                    <div className="vhs-content">
                        {children}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="fixed top-6 right-4 md:hidden z-20">
                <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}