import React, { useState } from 'react';
import './App.css';

function App() {
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('/api/obfuscate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        const data = await response.json();
        setResult(data.obfuscatedCode);
    };

    return (
        <div className="App">
            <h1>Lua Obfuscator</h1>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter Lua code here" />
            <button onClick={handleSubmit}>Obfuscate</button>
            <pre>{result}</pre>
        </div>
    );
}

export default App;
