import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
    const canvasRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);

    // State machine for cinematic sequence
    const [phase, setPhase] = useState('ARMED'); // Set to ARMED immediately for global effects
    const [triggerGlitch, setTriggerGlitch] = useState(false);

    useEffect(() => {
        // Particle Background Logic (Match script.js exactly)
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles = [], mouse = { x: null, y: null };
        const PARTICLE_COUNT = 80;
        const CONNECT_DIST = 150;

        const resize = () => {
            w = canvas.width = canvas.parentElement.offsetWidth;
            h = canvas.height = canvas.parentElement.offsetHeight;
        };

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.r = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) { this.vx += dx * 0.00015; this.vy += dy * 0.00015; }
                }
                this.vx *= 0.999; this.vy *= 0.999;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 243, 255, 0.6)';
                ctx.fill();
            }
        }

        const init = () => {
            particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(); p.draw(); });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 243, 255, ${0.12 * (1 - dist / CONNECT_DIST)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize(); init(); animate();
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        // Typewriter Logic
        const text1 = "Engineering Human-Centric Systems:";
        const text2 = "Where Logic Meets Design.";
        const type = (element, text, speed, callback) => {
            let i = 0;
            element.innerHTML = "";
            element.classList.add('typing');
            const step = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(step, speed);
                } else {
                    element.classList.remove('typing');
                    if (callback) callback();
                }
            };
            step();
        };
        const startTypewriter = setTimeout(() => {
            if (line1Ref.current) {
                type(line1Ref.current, text1, 50, () => {
                    setTimeout(() => {
                        if (line2Ref.current) type(line2Ref.current, text2, 60);
                    }, 500);
                });
            }
        }, 800);
        return () => clearTimeout(startTypewriter);
    }, []);

    const isArmed = phase === 'ARMED' || phase === 'SUITING_UP';
    const isScanning = phase === 'SCANNING' || phase === 'LOCKED';

    return (
        <section id="hero" className={`${isArmed ? 'protocol-armed' : ''} ${isScanning ? 'protocol-scanning' : ''} ${triggerGlitch ? 'trigger-glitch' : ''}`}>
            <canvas ref={canvasRef} id="particle-canvas"></canvas>
            <div className="hero-hud-grid"></div>
            <div className="hero-glitch-overlay"></div>

            <div className="hero-content">
                <div className="hero-photo-wrapper">
                    <video
                        src="assets/profile-video.mp4"
                        className="hero-photo"
                        autoPlay
                        muted
                        playsInline
                        onTimeUpdate={(e) => {
                            if (e.target.currentTime >= 5) {
                                e.target.pause();
                            }
                        }}
                    ></video>
                </div>

                <div className="hero-text">
                    <h1 className="hero-headline">
                        <span ref={line1Ref}></span><br />
                        <span ref={line2Ref} className="headline-accent"></span>
                    </h1>
                    <p className="hero-subheadline">
                        Bridging the gap between Computer Science fundamentals and high-fidelity UX.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn-primary">▸ EXPLORE PROJECTS</a>
                        <a href="#contact" className="btn-secondary">◉ INITIALIZE CONTACT</a>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-line"></div>
                <span>SCROLL</span>
            </div>
        </section>
    );
};

export default Hero;
