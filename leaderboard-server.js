const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let leaderboard = [];

// Endpoint to get top 10 scores
app.get('/leaderboard', (req, res) => {
  leaderboard.sort((a, b) => b.score - a.score);
  res.json(leaderboard.slice(0, 10));
});

// Endpoint to submit a new score
app.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid name or score' });
  }
  leaderboard.push({ name, score });
  res.status(201).json({ message: 'Score added' });
});

app.listen(port, () => {
  console.log(`Leaderboard server running at http://localhost:${port}`);
});
