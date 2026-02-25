import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Skills = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;

        let cw = container.clientWidth || container.offsetWidth;
        let ch = container.clientHeight || container.offsetHeight;
        const dpr = window.devicePixelRatio || 1;
        const isMobile = cw < 600;
        const scaleFactor = isMobile ? 0.7 : 1;

        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        canvas.style.width = cw + 'px';
        canvas.style.height = ch + 'px';
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        const engine = Engine.create({ gravity: { x: 0, y: 0 } });
        const world = engine.world;

        const skills = [
            { label: 'Figma', cat: 'primary', r: 42, icon: 'figma' },
            { label: 'React', cat: 'primary', r: 42, icon: 'react' },
            { label: 'Python', cat: 'primary', r: 40, icon: 'python' },
            { label: 'Java', cat: 'primary', r: 40, icon: 'java' },
            { label: 'HTML5', cat: 'frontend', r: 34, icon: 'html5' },
            { label: 'CSS', cat: 'frontend', r: 34, icon: 'css3' },
            { label: 'JavaScript', cat: 'frontend', r: 38, icon: 'javascript' },
            { label: 'TypeScript', cat: 'frontend', r: 36, icon: 'typescript' },
            { label: 'Firebase', cat: 'frontend', r: 34, icon: 'firebase' },
            { label: 'Node.js', cat: 'systems', r: 36, icon: 'nodedotjs' },
            { label: 'MySQL', cat: 'systems', r: 36, icon: 'mysql' },
            { label: 'Three.js', cat: 'systems', r: 35, icon: 'threedotjs' },
            { label: 'Adobe', cat: 'uxr', r: 38, icon: 'adobe' },
            { label: 'Canva', cat: 'uxr', r: 34, icon: 'canva' },
            { label: 'Git', cat: 'pm', r: 32, icon: 'git' },
            { label: 'Jira', cat: 'pm', r: 32, icon: 'jira' },
            { label: 'Agile', cat: 'pm', r: 32, icon: 'scrumalliance' },
        ];

        const catColors = {
            primary: { stroke: '#00F3FF', glowRGB: '0, 243, 255' },
            frontend: { stroke: '#00F3FF', glowRGB: '0, 243, 255' },
            systems: { stroke: '#BCFF00', glowRGB: '188, 255, 0' },
            uxr: { stroke: '#66FFD0', glowRGB: '102, 255, 208' },
            pm: { stroke: '#FFFFFF', glowRGB: '255, 255, 255' },
        };

        const iconCache = {};
        const localOverrides = {
            'Adobe': 'assets/adobe.png',
            'Canva': 'assets/canva.png',
            'Java': 'assets/java.png',
            'CSS': 'assets/css.png'
        };

        skills.forEach(s => {
            const img = new Image();
            if (localOverrides[s.label]) {
                img.src = localOverrides[s.label];
            } else {
                const color = catColors[s.cat].stroke.replace('#', '');
                img.src = `https://cdn.simpleicons.org/${s.icon}/${color}`;
            }
            iconCache[s.label] = img;
        });

        const orbs = skills.map(s => {
            const x = 100 + Math.random() * (cw - 200);
            const y = 100 + Math.random() * (ch - 200);
            const body = Bodies.circle(x, y, s.r * scaleFactor, {
                restitution: 0.95,
                frictionAir: 0.006,
                label: s.label
            });
            Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
            body._skill = { ...s, r: s.r * scaleFactor };
            return body;
        });

        const thick = 300;
        const walls = [
            Bodies.rectangle(cw / 2, ch + thick / 2, cw * 2, thick, { isStatic: true }),
            Bodies.rectangle(cw / 2, -thick / 2, cw * 2, thick, { isStatic: true }),
            Bodies.rectangle(-thick / 2, ch / 2, thick, ch * 2, { isStatic: true }),
            Bodies.rectangle(cw + thick / 2, ch / 2, thick, ch * 2, { isStatic: true }),
        ];

        Composite.add(world, [...orbs, ...walls]);

        const mouse = Mouse.create(canvas);
        mouse.pixelRatio = dpr;
        const mConstraint = MouseConstraint.create(engine, {
            mouse, constraint: { stiffness: 0.2, render: { visible: false } }
        });
        Composite.add(world, mConstraint);

        let hovered = null;
        Events.on(mConstraint, 'mousemove', e => {
            const found = Matter.Query.point(orbs, e.mouse.position);
            hovered = found.length > 0 ? found[0] : null;
            canvas.style.cursor = hovered ? 'grab' : 'default';
        });

        Events.on(engine, 'afterUpdate', () => {
            if (mConstraint.body) {
                hovered = mConstraint.body;
            }
        });

        let animationId;
        const draw = () => {
            Engine.update(engine, 16.666);
            ctx.clearRect(0, 0, cw, ch);
            const time = Date.now() * 0.002;

            orbs.forEach(body => {
                if (Math.random() < 0.015) {
                    Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.0008,
                        y: (Math.random() - 0.5) * 0.0008
                    });
                }

                const s = body._skill;
                const c = catColors[s.cat] || catColors.pm;
                const { x, y } = body.position;
                const h = body === hovered;

                const pulse = Math.sin(time + s.r) * 0.2 + 0.8;
                const glowScale = s.r + (h ? 25 : 12) * pulse;
                const g = ctx.createRadialGradient(x, y, s.r * 0.4, x, y, glowScale);
                g.addColorStop(0, `rgba(${c.glowRGB}, ${h ? 0.45 : 0.18})`);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.beginPath(); ctx.arc(x, y, glowScale, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();

                const bg = ctx.createRadialGradient(x - s.r * 0.3, y - s.r * 0.3, s.r * 0.1, x, y, s.r);
                bg.addColorStop(0, `rgba(${c.glowRGB}, 0.35)`);
                bg.addColorStop(0.7, `rgba(${c.glowRGB}, 0.15)`);
                bg.addColorStop(1, `rgba(${c.glowRGB}, 0.05)`);
                ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();

                ctx.strokeStyle = c.stroke;
                ctx.lineWidth = h ? 3 : 2;
                ctx.stroke();

                const img = iconCache[s.label];
                if (img && img.complete && img.naturalWidth !== 0) {
                    const iconSize = s.r * 1.1;
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(body.angle);
                    ctx.globalAlpha = h ? 1 : 0.9;
                    ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
                    ctx.restore();
                } else {
                    ctx.fillStyle = c.stroke;
                    ctx.font = `600 ${s.r < 35 ? 8 : 10}px monospace`;
                    ctx.textAlign = 'center';
                    ctx.fillText(s.label.substring(0, 3).toUpperCase(), x, y);
                }

                if (h) {
                    ctx.save();
                    const labelY = y - s.r - 20;
                    ctx.font = `600 12px 'JetBrains Mono', monospace`;
                    const textWidth = ctx.measureText(s.label).width;

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(x - (textWidth + 14) / 2, labelY - 10, textWidth + 14, 20, 5);
                    } else {
                        ctx.rect(x - (textWidth + 14) / 2, labelY - 10, textWidth + 14, 20);
                    }
                    ctx.fill();
                    ctx.strokeStyle = c.stroke;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.fillStyle = c.stroke;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(s.label.toUpperCase(), x, labelY);
                    ctx.restore();
                }
            });

            animationId = requestAnimationFrame(draw);
        };
        draw();

        const handleResize = () => {
            cw = container.clientWidth || container.offsetWidth;
            ch = container.clientHeight || container.offsetHeight;
            if (cw <= 0 || ch <= 0) return;
            canvas.width = cw * dpr; canvas.height = ch * dpr;
            canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
            ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);

            orbs.forEach(body => {
                let nx = body.position.x;
                let ny = body.position.y;
                if (nx < 0) nx = 20;
                if (nx > cw) nx = cw - 20;
                if (ny < 0) ny = 20;
                if (ny > ch) ny = ch - 20;
                Body.setPosition(body, { x: nx, y: ny });
            });

            Body.setPosition(walls[0], { x: cw / 2, y: ch + thick / 2 });
            Body.setPosition(walls[1], { x: cw / 2, y: -thick / 2 });
            Body.setPosition(walls[2], { x: -thick / 2, y: ch / 2 });
            Body.setPosition(walls[3], { x: cw + thick / 2, y: ch / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            Engine.clear(engine);
        };
    }, []);

    return (
        <section id="skills">
            <div className="section-header">
                <span className="section-tag">&lt;/skills&gt;</span>
                <h2 className="section-title">SKILLS GRAVITY FIELD</h2>
                <p className="section-desc">Drag, toss, and interact with the skill orbs. Physics-enabled.</p>
            </div>
            <div className="skills-legend">
                <span className="legend-item"><span className="legend-dot cyan-dot"></span> Primary Tech</span>
                <span className="legend-item"><span className="legend-dot cyan-dot" style={{ opacity: 0.6 }}></span> Frontend &amp; Web</span>
                <span className="legend-item"><span className="legend-dot lime-dot"></span> Systems &amp; Logic</span>
                <span className="legend-item"><span className="legend-dot"
                    style={{ background: '#66FFD0', boxShadow: '0 0 8px rgba(102,255,208,0.5)' }}></span> UI/UX Research</span>
                <span className="legend-item"><span className="legend-dot white-dot"></span> Project Management</span>
            </div>
            <div id="skills-container" ref={containerRef}>
                <canvas id="skills-canvas" ref={canvasRef}></canvas>
            </div>
        </section>
    );
};

export default Skills;
