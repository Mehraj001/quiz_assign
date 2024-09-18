const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL@123',
    database: 'quiz'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/questions', (req, res) => {
    const query = 'SELECT * FROM questions';
    db.query(query, (err, results) => {
        if (err) return res.json({ error: err.message });
        res.json(results);
    });
});

app.post('/submit', (req, res) => {
    const studentAnswers = req.body.answers;

    let score = 0;
    const correctAnswers = {
        1: 'Jawaharlal Nehru',    
        2: 'false',   
        3: 'const',    
        4: 'random'  
    };
    if (studentAnswers[1] === correctAnswers[1]) score++;
    if (studentAnswers[2] === correctAnswers[2]) score++;
    if (studentAnswers[3].toLowerCase() === correctAnswers[3].toLowerCase()) score++;

    score += 1; 

    res.json({ score });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
