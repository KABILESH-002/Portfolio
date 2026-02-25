import React from 'react';

const Education = () => {
    const educationData = [
        {
            year: '2022 - PRESENT',
            degree: 'BSc (Hons) Computer Science',
            institution: 'Informatics Institute of Technology (IIT) Sri Lanka',
            location: 'Colombo, Sri Lanka',
            tags: ['Algorithms', 'Software Engineering', 'UI/UX'],
            badge: 'CURRENTLY PURSUING',
            dotClass: '',
            cardClass: ''
        },
        {
            year: '2022 - PRESENT',
            degree: 'BSc (Hons) Computer Science',
            institution: 'University of Westminster',
            location: 'London, UK (Remote/Dual)',
            tags: ['Systems Design', 'Web Dev', 'Java'],
            badge: 'DUAL DEGREE PROGRAM',
            dotClass: 'lime-node',
            cardClass: 'lime-card',
            tagClass: 'lime-tag'
        },
        {
            year: 'GRADUATED 2021',
            degree: 'Secondary Education',
            institution: 'Gateway College Colombo',
            location: 'Colombo, Sri Lanka',
            tags: ['Mathematics', 'Physics', 'Computer Science'],
            badge: 'AL COMPLETED',
            dotClass: 'white-node',
            cardClass: 'white-card',
            tagClass: 'white-tag'
        }
    ];

    return (
        <section id="education">
            <div className="section-header">
                <span className="section-tag">&lt;/journey&gt;</span>
                <h2 className="section-title">ACADEMIC TIMELINE</h2>
                <p className="section-desc">My educational background and professional technical foundation.</p>
            </div>

            <div className="timeline">
                <div className="timeline-line"></div>
                {educationData.map((edu, idx) => (
                    <div key={idx} className="timeline-item">
                        <div className="timeline-node">
                            <span className="node-year">{edu.year}</span>
                            <div className={`node-dot ${edu.dotClass}`}></div>
                        </div>
                        <div className={`timeline-card ${edu.cardClass}`}>
                            <div className="timeline-badge">{edu.badge}</div>
                            <h3 className="timeline-degree">{edu.degree}</h3>
                            <div className="timeline-institution">{edu.institution}</div>
                            <div className="timeline-location">
                                <span className="location-icon">📍</span> {edu.location}
                            </div>
                            <div className="timeline-highlights">
                                {edu.tags.map(tag => (
                                    <span key={tag} className={`timeline-tag ${edu.tagClass || ''}`}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
