const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 2000;
const usersFile = path.join(__dirname, 'users.json');

// Helper functions
async function readUsers() {
    try {
        const data = await fs.readFile(usersFile, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeUsers(users) {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Set CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // API: REGISTER
    if (req.url === '/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        
        req.on('end', async () => {
            try {
                const { username, email, password } = JSON.parse(body);
                const users = await readUsers();
                
                if (users.find(u => u.email === email || u.username === username)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'User exists' }));
                    return;
                }
                
                users.push({ id: Date.now().toString(), username, email, password, createdAt: new Date().toISOString() });
                await writeUsers(users);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Registered' }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Server error' }));
            }
        });
        return;
    }
    
    // API: LOGIN
    if (req.url === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        
        req.on('end', async () => {
            try {
                const { username, password } = JSON.parse(body);
                const users = await readUsers();
                const user = users.find(u => u.username === username && u.password === password);
                
                if (!user) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Invalid' }));
                    return;
                }
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Logged in', user: { username: user.username, email: user.email } }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Server error' }));
            }
        });
        return;
    }
    
    // ====== STATIC FILE SERVING ======
    let filePath;
    
    // Default to index.html for root
    if (req.url === '/' || req.url === '') {
        filePath = path.join(__dirname, 'public', 'index.html');
    } else {
        // Remove leading slash and serve from public folder
        const urlPath = req.url.startsWith('/') ? req.url.substring(1) : req.url;
        filePath = path.join(__dirname, 'public', urlPath);
        
        // If no extension, assume HTML
        if (!path.extname(filePath)) {
            filePath += '.html';
        }
    }
    
    // Set content type
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'text/javascript';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.json') contentType = 'application/json';
    
    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        console.log(`File not found: ${filePath}`);
        
        // Try to serve index.html as fallback
        try {
            const content = await fs.readFile(path.join(__dirname, 'public', 'index.html'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        } catch (err) {
            res.writeHead(404);
            res.end('404 - Not Found');
        }
    }
});

server.listen(PORT, () => {
    console.log(`✅ Server: http://localhost:${PORT}`);
    console.log(`📁 Serving: ${path.join(__dirname, 'public')}`);
});