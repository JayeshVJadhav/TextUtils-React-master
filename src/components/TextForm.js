import React, { useMemo, useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [originalText, setOriginalText] = useState('');

    const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);
    const characterCount = text.length;
    const readTime = Math.max(1, Math.ceil(words.length / 200));
    const topWords = useMemo(() => {
        const counts = words.reduce((acc, word) => {
            const key = word.toLowerCase();
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);
    }, [words]);

    const handleUpClick = () => {
        setText(text.toUpperCase());
        props.showAlert('Converted to uppercase!', 'success');
    };

    const handleLoClick = () => {
        setText(text.toLowerCase());
        props.showAlert('Converted to lowercase!', 'success');
    };

    const handleClearClick = () => {
        setText('');
        setOriginalText('');
        props.showAlert('Text cleared!', 'success');
    };

    const handleOnChange = (event) => {
        const nextValue = event.target.value;
        setText(nextValue);
        setOriginalText(nextValue);
    };

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        props.showAlert('Copied to clipboard!', 'success');
    };

    const handleExtraSpaces = () => {
        setText(text.split(/\s+/).filter(Boolean).join(' '));
        props.showAlert('Extra spaces removed!', 'success');
    };

    const handleReverseText = () => {
        setText(text.split('').reverse().join(''));
        props.showAlert('Text reversed!', 'success');
    };

    const handleTitleCase = () => {
        setText(text.toLowerCase().replace(/(^|\s)\w/g, (match) => match.toUpperCase()));
        props.showAlert('Title case applied!', 'success');
    };

    const handleRestoreOriginal = () => {
        if (!originalText) {
            props.showAlert('No original text available yet!', 'warning');
            return;
        }
        setText(originalText);
        props.showAlert('Original text restored!', 'success');
    };

    return (
        <>
            <section className="hero-card">
                <h1 className="display-6 fw-bold">{props.heading}</h1>
                <p className="text-muted mb-0" style={{ color: props.mode === 'dark' ? 'var(--app-muted)' : '#526173' }}>
                    Craft polished copy with quick formatting tools, smart insights, and a modern editing experience.
                </p>
                <div className="hero-chip-row">
                    <span className="hero-chip">Word insights</span>
                    <span className="hero-chip">Clipboard ready</span>
                    <span className="hero-chip">Responsive layout</span>
                </div>
            </section>

            <div className="text-panel">
                <div className="glass-card p-3">
                    <label className="form-label fw-semibold" htmlFor="myBox">Your text</label>
                    <textarea
                        className="text-editor form-control"
                        value={text}
                        onChange={handleOnChange}
                        id="myBox"
                        rows="10"
                        placeholder="Paste or type your content here..."
                    />
                    <div className="action-grid">
                        <button disabled={text.length === 0} className="action-btn" onClick={handleUpClick}>Uppercase</button>
                        <button disabled={text.length === 0} className="action-btn secondary" onClick={handleLoClick}>Lowercase</button>
                        <button disabled={text.length === 0} className="action-btn secondary" onClick={handleTitleCase}>Title Case</button>
                        <button disabled={text.length === 0} className="action-btn secondary" onClick={handleReverseText}>Reverse Text</button>
                        <button disabled={text.length === 0} className="action-btn secondary" onClick={handleExtraSpaces}>Trim Spaces</button>
                        <button disabled={text.length === 0} className="action-btn secondary" onClick={handleRestoreOriginal}>Restore Original</button>
                        <button disabled={text.length === 0} className="action-btn secondary" onClick={handleCopy}>Copy</button>
                        <button disabled={text.length === 0} className="action-btn danger" onClick={handleClearClick}>Clear</button>
                    </div>
                </div>

                <div className="preview-card">
                    <h2 className="h5 fw-bold">Quick summary</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <strong>{words.length}</strong>
                            <span>Words</span>
                        </div>
                        <div className="stat-card">
                            <strong>{characterCount}</strong>
                            <span>Characters</span>
                        </div>
                        <div className="stat-card">
                            <strong>{readTime} min</strong>
                            <span>Read time</span>
                        </div>
                        <div className="stat-card">
                            <strong>{topWords.length}</strong>
                            <span>Top keywords</span>
                        </div>
                    </div>
                    <div className="preview-content">
                        {text.length > 0 ? text : 'Your polished preview will appear here as you type.'}
                    </div>
                    {topWords.length > 0 && (
                        <div className="mt-3">
                            <h3 className="h6 fw-semibold">Most frequent words</h3>
                            <div className="hero-chip-row">
                                {topWords.map(([word, count]) => (
                                    <span key={word} className="hero-chip">{word} · {count}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
