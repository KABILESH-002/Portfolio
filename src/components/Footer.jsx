import React from 'react';

const Footer = ({ children }) => {
    return (
        <footer>
            <div className="footer-content">
                <span className="footer-logo">[KK]</span>
                <span className="footer-text">© 2025 Kabileshwar Kumuthavannan. Engineered with precision.</span>
                <span className="footer-signal">
                    <span className="signal-dot"></span> ALL SYSTEMS OPERATIONAL
                </span>
            </div>
            {children}
        </footer>
    );
};

export default Footer;
