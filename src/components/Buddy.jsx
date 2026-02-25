import React, { useState, useEffect, useRef } from 'react';

const Buddy = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'system', text: 'BUDDY-AI v.2.0.4 initialized.' },
        { type: 'assistant', text: 'Hello! I am Buddy, Kabileshwar\'s technical assistant. How can I help you navigate his portfolio?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleCommand = (cmd) => {
        const lowerCmd = cmd.toLowerCase().trim();
        let response = "";

        if (lowerCmd.includes('hello') || lowerCmd.includes('hi')) {
            response = "Greetings! I am ready to process your query. You can ask about projects, skills, or even how to contact Kabileshwar.";
        } else if (lowerCmd.includes('project')) {
            response = "Kabileshwar has worked on several high-fidelity projects like Hunger SL, Hydro Alert, and Weather Forecast. You can find them in the PROJECTS section!";
        } else if (lowerCmd.includes('skills') || lowerCmd.includes('tech')) {
            response = "His core tech stack includes React, JavaScript, Python, and Java, alongside extensive experience in UI/UX design and Matter.js physics.";
        } else if (lowerCmd.includes('contact') || lowerCmd.includes('email')) {
            response = "You can reach him via the CONTACT section or direct email at kabieshking02@gmail.com. He is currently based in colombo, sri lanka.";
        } else if (lowerCmd.includes('help') || lowerCmd === '?') {
            response = "Available commands: 'projects', 'skills', 'contact', 'clear', 'about'. Or just ask me anything!";
        } else if (lowerCmd === 'clear') {
            setMessages([
                { type: 'system', text: 'Chat buffer cleared.' },
                { type: 'assistant', text: 'How else can I assist you?' }
            ]);
            return;
        } else if (lowerCmd.includes('about')) {
            response = "I am a custom AI widget built using React to demonstrate Kabileshwar's ability to integrate complex interactive logic with clean UI.";
        } else {
            response = "Command not recognized in current context. Type 'help' for available directives.";
        }

        setMessages(prev => [...prev, { type: 'assistant', text: response }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInputValue('');
        handleCommand(userMsg);
    };

    return (
        <div id="ai-assistant">
            <div id="ai-widget-trigger" onClick={toggleChat}>
                <div className="ai-glow"></div>
                <span className="ai-icon">❈</span>
                <span className="ai-status">CORE</span>
            </div>

            <div id="ai-chat-window" className={isOpen ? '' : 'hidden'}>
                <div className="chat-header">
                    <span className="chat-title">BUDDY_ASSIST_v2.0</span>
                    <button id="chat-close" onClick={toggleChat}>×</button>
                </div>
                <div id="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.type === 'system' ? 'system-message' : msg.type === 'assistant' ? 'assistant-message' : 'user-message'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <form className="chat-input-wrapper" onSubmit={handleSubmit}>
                    <span className="input-prompt">&gt;</span>
                    <input
                        type="text"
                        id="ai-input"
                        placeholder="Type a command..."
                        autoComplete="off"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
};

export default Buddy;
