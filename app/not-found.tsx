'use client';
import Link from 'next/link';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative">
            {/* Gradient background with animation */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-teal-900/30 animate-gradient" />

            {/* Animated particles or stars effect */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent" />
            </div>

            <div className="min-h-screen flex flex-col relative z-10">
                <NavBar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0s' }}>
                        <h1 className="text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4 animate-glitch">
                            404
                        </h1>
                    </div>
                    <div className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-2xl text-gray-300 mb-8">Page Not Found</h2>
                    </div>
                    <div className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.4s' }}>
                        <p className="text-gray-400 mb-8 text-center max-w-md">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    <div className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.6s' }}>
                        <Link
                            href="/"
                            className="px-8 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-white rounded-lg transition-all duration-300 tracking-[0.15em] text-sm hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}