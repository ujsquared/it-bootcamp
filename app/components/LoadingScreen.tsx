'use client';
import { useState, useEffect } from 'react';

const quotes = [
    "The best way to predict the future is to create it.",
    "Code is poetry in motion.",
    "Every expert was once a beginner.",
    "Technology is best when it brings people together.",
];

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // increased to 2.5s to give more time to read the quote

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <div className="text-4xl text-white font-light tracking-[0.2em] mb-8">IT BOOTCAMP</div>
            <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-white animate-loadingBar"></div>
            </div>
            <p className="text-gray-400 text-sm tracking-wider font-light max-w-md text-center px-4">
                {randomQuote}
            </p>
        </div>
    );
} 