const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Function to initialize the database
async function initializeDatabase() {
  try {
    // Create a table for drinks
    await pool.query(`
      CREATE TABLE IF NOT EXISTS drinks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(5,2) NOT NULL
      )
    `);
    
    console.log('Drinks table created successfully');
    
    // Check if data already exists
    const result = await pool.query('SELECT COUNT(*) FROM drinks');
    const count = parseInt(result.rows[0].count);
    
    if (count === 0) {
      // Insert initial drink options
      await pool.query(`
        INSERT INTO drinks (name, price) VALUES
        ('Pepsi', 1.99),
        ('Coke', 2.99),
        ('Sprite', 0.99)
      `);
      
      console.log('Initial drinks data inserted successfully');
    } else {
      console.log(`Database already contains ${count} drinks, skipping insertion`);
    }
    
    // Verify the data
    const drinks = await pool.query('SELECT * FROM drinks');
    console.log('Current drinks in database:');
    console.table(drinks.rows);
    
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    // Close the pool
    await pool.end();
    console.log('Database connection closed');
  }
}

// Run the initialization
initializeDatabase();