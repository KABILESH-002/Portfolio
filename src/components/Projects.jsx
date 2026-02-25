import React, { useState } from 'react';

const Projects = () => {
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (id) => {
        setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const projectData = [
        {
            id: 'project-hunger',
            category: 'SOCIAL IMPACT SYSTEM',
            title: 'Hunger SL',
            desc: 'Mobile app connecting food donors with those in need across Sri Lanka.',
            img: 'assets/hunger-sl.jpg',
            tags: ['Figma', 'User Research', 'Mobile UI'],
            logic: [
                { title: 'User Research', text: 'Conducted competitive analysis to identify pain points in food accessibility and distribution systems across Sri Lanka.' },
                { title: 'Personas', list: ['Donor: Local restaurant owners wanting to reduce food waste', 'Recipient: Community organizations coordinating food drives'] },
                { title: 'Architecture', text: 'User flows, information architecture, wireframes, high-fidelity mockups, and interactive prototypes with design systems.' }
            ]
        },
        {
            id: 'project-hydro',
            category: 'FLOOD WARNING SYSTEM',
            categoryClass: 'lime',
            title: 'Hydro Alert',
            desc: 'Real-time flood warning app for Sri Lanka with risk assessment and emergency alerts.',
            img: 'assets/hydro-alert.jpg',
            tags: ['Emergency UX', 'UI Design', 'Alerts'],
            tagClass: 'lime',
            hintClass: 'lime-hint',
            headerClass: 'lime-header',
            iconClass: 'lime-icon',
            backClass: 'hydro-back',
            logic: [
                { title: 'Flood Risk Assessment', text: 'Real-time risk level gauges analyzing rainfall data, river levels, and regional flood history to provide district-level warnings across Sri Lanka.' },
                { title: 'Emergency Alert System', text: 'Push notifications with clear visual hierarchy — color-coded severity levels, impact zone maps, and actionable evacuation guidance for affected districts.' },
                { title: 'Safety Interface', text: 'Comprehensive UI designs for live flood maps, safety guidelines, evacuation routes, and real-time updates from disaster management authorities.' }
            ]
        },
        {
            id: 'project-weather',
            category: 'DATA VISUALIZATION ENGINE',
            title: 'Weather Forecast',
            desc: 'Data-driven weather website with intuitive charts, graphs, and interactive maps.',
            img: 'assets/weather-forecast.jpg',
            tags: ['Charts', 'Responsive', 'Web Design'],
            logic: [
                { title: 'Data Visualization', text: 'Wireframes and visual designs showcasing weather data through intuitive charts, graphs, and interactive maps.' },
                { title: 'Responsive Design', text: 'Layouts ensuring optimal viewing across desktop, tablet, and mobile devices.' },
                { title: 'User Testing', text: 'Incorporated user feedback through iterative design improvements and usability testing sessions.' }
            ]
        },
        {
            id: 'project-scheduler',
            category: 'AI-POWERED PRODUCTIVITY ENGINE',
            categoryClass: 'lime',
            title: 'AI Scheduler',
            desc: 'Intelligent scheduling platform with AI-driven task management and analytics.',
            img: 'assets/scheduler.jpg',
            tags: ['React', 'Python', 'AI/ML'],
            tagClass: 'lime',
            hintClass: 'lime-hint',
            headerClass: 'lime-header',
            iconClass: 'lime-icon',
            backClass: 'hydro-back',
            logic: [
                { title: 'AI Engine', text: 'Machine learning algorithms that analyze study patterns and automatically optimize scheduling for peak productivity.' },
                { title: 'Tech Stack', list: ['Frontend: React with modern component architecture', 'Backend: Python-based AI processing pipeline'] },
                { title: 'Analytics Dashboard', text: 'Real-time progress tracking with interactive charts, completion metrics, and AI-generated study insights.' }
            ]
        }
    ];

    return (
        <section id="projects">
            <div className="section-header">
                <span className="section-tag">&lt;/projects&gt;</span>
                <h2 className="section-title">INTERACTIVE PROJECT ARCHIVE</h2>
                <p className="section-desc">Click any card to reveal the system logic behind the interface.</p>
            </div>

            <div className="projects-grid">
                {projectData.map((project) => (
                    <div
                        key={project.id}
                        className={`project-card ${flipped[project.id] ? 'is-flipped' : ''}`}
                        id={project.id}
                        onClick={() => toggleFlip(project.id)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <div className="card-visual">
                                    <img src={project.img} alt={`${project.title} Mockup`} className="card-mockup-img" />
                                    <div className="card-visual-overlay"></div>
                                </div>
                                <div className="card-info">
                                    <span className={`card-category ${project.categoryClass || ''}`}>{project.category}</span>
                                    <h3 className="card-title">{project.title}</h3>
                                    <p className="card-desc">{project.desc}</p>
                                    <div className="card-tags">
                                        {project.tags.map(tag => (
                                            <span key={tag} className={`tag ${project.tagClass || ''}`}>{tag}</span>
                                        ))}
                                    </div>
                                    <span className={`card-flip-hint ${project.hintClass || ''}`}>
                                        <span className="flip-icon">↻</span> Click to reveal logic
                                    </span>
                                </div>
                            </div>
                            <div className={`card-back ${project.backClass || ''}`}>
                                <div className={`back-header ${project.headerClass || ''}`}>
                                    <span className="back-icon">⚙</span>
                                    <h3>SYSTEM LOGIC</h3>
                                </div>
                                <div className="back-content">
                                    {project.logic.map((item, idx) => (
                                        <div key={idx} className="logic-section">
                                            <h4><span className={`logic-icon ${project.iconClass || ''}`}>◆</span> {item.title}</h4>
                                            {item.text && <p>{item.text}</p>}
                                            {item.list && (
                                                <ul>
                                                    {item.list.map((li, liIdx) => (
                                                        <li key={liIdx} dangerouslySetInnerHTML={{ __html: li }}></li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <span className={`card-flip-hint back-hint ${project.hintClass || ''}`}>
                                    <span className="flip-icon">↻</span> Click to flip back
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
