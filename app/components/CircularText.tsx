'use client';
import { useEffect, useRef } from 'react';

interface CircularTextProps {
    text: string;
    radius: number;
}

export default function CircularText({ text, radius }: CircularTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let angle = 0;
        let currentCharIndex = 0;
        const characters = text.split('');
        const angleIncrement = (Math.PI * 2) / (characters.length * 2);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw each character
            for (let i = 0; i <= currentCharIndex; i++) {
                const charAngle = -Math.PI / 2 + (i * angleIncrement) + angle;
                const x = canvas.width / 2 + Math.cos(charAngle) * radius;
                const y = canvas.height / 2 + Math.sin(charAngle) * radius;

                ctx.font = '16px Helvetica Neue';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Rotate each character to follow the circle
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(charAngle + Math.PI / 2);
                ctx.fillText(characters[i], 0, 0);
                ctx.restore();
            }

            // Increment angle for rotation
            angle += 0.005;

            // Add new character every few frames
            if (currentCharIndex < characters.length - 1) {
                currentCharIndex += 0.1;
            }

            requestAnimationFrame(animate);
        };

        canvas.width = radius * 3;
        canvas.height = radius * 3;
        animate();
    }, [text, radius]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        />
    );
} 