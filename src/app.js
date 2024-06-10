import express from 'express';
import { pool } from './db.js';
import {PORT} from './config.js';

const app = express();


app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
});

app.get('/ping', async (req, res) => {
    // Consulta de prueba
    const [result] = await pool.query('SELECT "hello world" as RESULT');
    res.json(result[0]);
});

app.get('/create', async (req, res) => {
    try {
        const result = await pool.query(
            `INSERT INTO user (userName, userLastName, userEmail, userPassword, userRole, userGender, userTelephone, currentHashedRefreshToken, isRegisteredWithGoogle)
            VALUES ('Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user', 'Female', 987654321, 'anotherhashedtoken', 0)`
        );
        res.json(result);
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Error inserting user' });
    }
});

app.listen(PORT)
console.log(`Server running on port ${PORT}`);
