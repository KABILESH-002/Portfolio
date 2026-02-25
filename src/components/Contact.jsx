import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';

const Contact = () => {
    const [terminalLines, setTerminalLines] = useState([]);
    const [typedLine, setTypedLine] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [logs, setLogs] = useState([]);
    const terminalRef = useRef(null);
    const hasStarted = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasStarted.current) {
                hasStarted.current = true;
                startTypingSequence();
            }
        }, { threshold: 0.5 });

        if (terminalRef.current) {
            observer.observe(terminalRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const startTypingSequence = async () => {
        const sequence = [
            { type: 'system', text: '> INITIALIZING SECURE CHANNEL...' },
            { type: 'system', text: '> CONNECTION ESTABLISHED: 200 OK' },
            { type: 'typed', text: 'HELLO, I AM KABILESWHAR. READY TO INITIALIZE NEW PROJECTS.' },
            { type: 'system', text: '> AWAITING TRANSMISSION...' }
        ];

        for (const item of sequence) {
            if (item.type === 'system') {
                setTerminalLines(prev => [...prev, item]);
                await new Promise(r => setTimeout(r, 400));
            } else {
                setIsTyping(true);
                let currentText = '';
                for (let i = 0; i < item.text.length; i++) {
                    currentText += item.text[i];
                    setTypedLine(currentText);
                    await new Promise(r => setTimeout(r, 40));
                }
                setTerminalLines(prev => [...prev, { ...item, text: currentText }]);
                setTypedLine('');
                setIsTyping(false);
                await new Promise(r => setTimeout(r, 500));
            }
        }
        setIsComplete(true);
    };

    const handleDownloadCV = (e) => {
        e.preventDefault();
        const element = document.createElement('div');
        element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 40px; color: #333;">
        <h1 style="color: #00F3FF; margin-bottom: 10px;">Kabileshwar Kumuthavannan</h1>
        <p style="font-weight: bold; margin-bottom: 20px;">BSc (Hons) Computer Science Student</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 30px;">
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px; margin-bottom: 15px;">EDUCATION</h2>
          <p><strong>BSc (Hons) Computer Science</strong> (2022 - Present)<br>IIT Sri Lanka & University of Westminster, UK</p>
        </div>
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px; margin-bottom: 15px;">TECHNICAL SKILLS</h2>
          <p>React, JavaScript, Python, Java, Figma, UI/UX Design, Firebase, Node.js, MySQL</p>
        </div>
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px; margin-bottom: 15px;">CONTACT</h2>
          <p>Email: kabieshking02@gmail.com<br>Phone: +94786322193<br>Location: colombo, sri lanka</p>
        </div>
      </div>
    `;

        const opt = {
            margin: 0,
            filename: 'Kabileshwar_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().catch(err => {
            console.error('PDF Generation failed, falling back to printer:', err);
            const win = window.open('', '_blank');
            win.document.write(element.innerHTML);
            win.document.close();
            win.print();
        });
    };

    const handleSendTransmission = () => {
        setLogs(prev => [...prev, 'Attempting to open transmission channel...']);
        setTimeout(() => {
            setLogs(prev => [...prev, 'Error: Central Uplink not configured.']);
            setLogs(prev => [...prev, 'Redirecting to manual relay (email)...']);
            setTimeout(() => {
                window.location.href = "mailto:kabieshking02@gmail.com?subject=Incoming Transmission";
            }, 1500);
        }, 1000);
    };

    return (
        <section id="contact">
            <div className="section-header">
                <span className="section-tag">&lt;/contact&gt;</span>
                <h2 className="section-title">ESTABLISH CHANNEL</h2>
                <p className="section-desc">Initialize communication or acquire technical schematics.</p>
            </div>

            <div className="terminal-wrapper" ref={terminalRef}>
                <div className="terminal-top-bar">
                    <div className="terminal-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <div className="terminal-title">TERMINAL@PORTFOLIO:~</div>
                    <div className="terminal-minimize">_ □ ×</div>
                </div>
                <div className="terminal-body">
                    <div className="terminal-output" id="terminal-content">
                        {terminalLines.map((line, idx) => (
                            <div key={idx} className={`terminal-line ${line.type === 'system' ? 'system-line' : ''}`}>
                                {line.text}
                            </div>
                        ))}
                        {isTyping && <div className="terminal-line typed-line">{typedLine}</div>}
                    </div>

                    <div className="contact-grid">
                        <div className="contact-card">
                            <div className="contact-icon">✉</div>
                            <div className="contact-label">UPLINK</div>
                            <div className="contact-value">
                                <a href="mailto:kabieshking02@gmail.com" className="contact-link">kabieshking02@gmail.com</a>
                            </div>
                        </div>
                        <div className="contact-card">
                            <div className="contact-icon">⦿</div>
                            <div className="contact-label">LOCATION</div>
                            <div className="contact-value">colombo, sri lanka</div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">📞</div>
                            <div className="contact-label">PHONE</div>
                            <div className="contact-value">
                                <a href="tel:+94786322193" className="contact-link">+94 78 632 2193</a>
                            </div>
                        </div>
                        <div className="contact-card">
                            <div className="contact-icon">🌐</div>
                            <div className="contact-label">LINKEDIN</div>
                            <div className="contact-value">
                                <a href="https://www.linkedin.com/in/kabileshwar-kumuthavannan-309a61359" target="_blank" rel="noopener noreferrer" className="contact-link">View Profile</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-actions">
                        <a href="#" id="cv-download" className="btn-download" onClick={handleDownloadCV}>
                            <span className="btn-icon">⬇</span> ACQUIRE SCHEMATICS
                        </a>
                        <button id="btn-send" className="btn-transmit" onClick={handleSendTransmission}>
                            <span className="btn-icon">▸</span> SEND TRANSMISSION
                        </button>
                    </div>

                    {logs.length > 0 && (
                        <div className="terminal-log">
                            {logs.map((log, idx) => (
                                <div key={idx} className="log-success">{`[${new Date().toLocaleTimeString()}] ${log}`}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
