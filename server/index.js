const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

app.use(bodyParser.json());

app.post('/api/obfuscate', (req, res) => {
    const { code } = req.body;
    // Save code to a temporary file and run the Lua obfuscator
    exec(`lua /path/to/obfuscate.lua "${code}"`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ error: 'Error obfuscating code' });
        }
        res.json({ obfuscatedCode: stdout });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
