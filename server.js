const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully. Current time:', res.rows[0].now);
  }
});

// API endpoint to get all drinks
app.get('/api/drinks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drinks ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching drinks:', err);
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/drinks.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'drinks.html'));
});

app.get('/meals.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'meals.html'));
});

app.get('/oops.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'oops.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});