'use client';
import { useEffect, useRef } from 'react';

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;

    constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update(canvas: HTMLCanvasElement, attractorX: number, attractorY: number) {
        // Calculate distance to center
        const dx = attractorX - this.x;
        const dy = attractorY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only bounce when hitting the central orb
        const bounceRadius = 80;
        if (distance < bounceRadius) {
            // Normalize the direction vector
            const nx = dx / distance;
            const ny = dy / distance;

            // Reflect the velocity vector
            const dotProduct = 2 * (this.speedX * nx + this.speedY * ny);
            this.speedX = this.speedX - dotProduct * nx;
            this.speedY = this.speedY - dotProduct * ny;

            // Add some energy to the bounce
            this.speedX *= 1.1;
            this.speedY *= 1.1;
        }

        // Apply speed limits
        const maxSpeed = 3;
        const speedMagnitude = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speedMagnitude > maxSpeed) {
            this.speedX = (this.speedX / speedMagnitude) * maxSpeed;
            this.speedY = (this.speedY / speedMagnitude) * maxSpeed;
        }

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create more particles
        particlesRef.current = Array(200).fill(null).map(() => new Particle(canvas));

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw central orb with softer glow
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Outer glow
            const outerGlow = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, 120
            );
            outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
            outerGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)');
            outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = outerGlow;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
            ctx.fill();

            // Inner orb
            const innerGlow = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, 80
            );
            innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            innerGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.05)');
            innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = innerGlow;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
            ctx.fill();

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.update(canvas, centerX, centerY);
                particle.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full bg-black"
            style={{ zIndex: -1 }}
        />
    );
} 