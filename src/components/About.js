import React from 'react';

export default function About(props) {
    return (
        <section className="about-section">
            <div className="hero-card">
                <h1 className="display-6 fw-bold">Built for clear thinking and polished writing</h1>
                <p className="mb-0" style={{ color: props.mode === 'dark' ? 'var(--app-muted)' : '#526173' }}>
                    Text Utility Studio combines a beautiful workspace with practical tools so editing feels effortless on every screen.
                </p>
            </div>

            <div className="about-card">
                <h3>What makes it modern</h3>
                <ul>
                    <li>Responsive layouts that feel polished on mobile, tablet, and desktop.</li>
                    <li>Accessible controls with stronger contrast, spacing, and keyboard-friendly interactions.</li>
                    <li>Useful enhancements like title case, reverse text, and instant word insights.</li>
                </ul>
            </div>

            <div className="about-card">
                <h3>Why it stands out</h3>
                <ul>
                    <li>Clean component structure that is easier to maintain and extend.</li>
                    <li>Thoughtful motion and visual hierarchy to make the experience feel premium.</li>
                    <li>Fast, reliable text operations without losing the original utility focus.</li>
                </ul>
            </div>
        </section>
    );
}
