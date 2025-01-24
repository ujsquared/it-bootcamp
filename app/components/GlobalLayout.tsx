'use client';
import ParticleBackground from "./ParticleBackground";
import NavBar from "./NavBar";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-black">
            {/* Particle background with lower z-index */}
            <div className="fixed inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Navigation and content with higher z-index */}
            <div className="relative z-10">
                <NavBar />
                {/* Mobile Menu Button */}
                <div className="fixed top-6 right-4 md:hidden z-20">
                    <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
} 