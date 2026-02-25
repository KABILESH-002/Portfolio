import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 1. Scrolled class logic
            setIsScrolled(window.scrollY > 50);

            // 2. Active section detection
            const sections = ['hero', 'projects', 'skills', 'education', 'contact'];
            let current = 'hero';
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Offset of 200 matches script.js logic: top = s.offsetTop - 200
                    if (rect.top <= 200) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav id="main-nav" className={isScrolled ? 'scrolled' : ''}>
            <div className="nav-logo">
                <span className="logo-bracket">[</span><span className="logo-text">KK</span><span className="logo-bracket">]</span>
            </div>
            <div className="nav-links">
                <a
                    href="#hero"
                    className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                    data-section="hero"
                    onClick={(e) => scrollToSection(e, 'hero')}
                >
                    HOME
                </a>
                <a
                    href="#projects"
                    className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                    data-section="projects"
                    onClick={(e) => scrollToSection(e, 'projects')}
                >
                    PROJECTS
                </a>
                <a
                    href="#skills"
                    className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                    data-section="skills"
                    onClick={(e) => scrollToSection(e, 'skills')}
                >
                    SKILLS
                </a>
                <a
                    href="#education"
                    className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
                    data-section="education"
                    onClick={(e) => scrollToSection(e, 'education')}
                >
                    EDUCATION
                </a>
                <a
                    href="#contact"
                    className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                    data-section="contact"
                    onClick={(e) => scrollToSection(e, 'contact')}
                >
                    CONTACT
                </a>
            </div>
            <div className="nav-status">
                <span className="status-dot"></span>
                <span className="status-text">SYSTEM ONLINE</span>
            </div>
        </nav>
    );
};

export default Navbar;
