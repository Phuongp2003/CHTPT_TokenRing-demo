const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

app.use(cors()); // Sử dụng cors
app.use(express.json());

let token = null;
let clients = [];
let currentClientIndex = 0;

app.post('/register', (req, res) => {
    const clientId = req.body.clientId;
    if (!clients.includes(clientId)) {
        clients.push(clientId);
    } console.log('Registered')
    res.send('Registered');
});

app.get('/token', (req, res) => {
    if (token === null && clients.length > 0) {
        token = clients[currentClientIndex];
    } console.log({ token })
    res.json({ token });
});

app.post('/token', (req, res) => {
    const clientId = req.body.clientId;
    if (clientId === token) {
        currentClientIndex = (currentClientIndex + 1) % clients.length;
        token = clients[currentClientIndex];
    } console.log('Token passed')
    res.send('Token passed');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
