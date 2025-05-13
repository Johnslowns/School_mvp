const { Pool } = require('pg');

// Create a new Pool instance to manage database connections
const pool = new Pool({
    user: 'postgres', // Default PostgreSQL user
    host: 'localhost', // Database server address
    database: 'school_mvp', // Your database name
    password: 'Johnhejobs254*?', // Password you set during installation
    port: 5432, // Default PostgreSQL port
  });
  
  // Test the connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Database connected successfully:', res.rows[0]);
    }
  });
  
  // Export the pool object for use in other files
  module.exports = pool;