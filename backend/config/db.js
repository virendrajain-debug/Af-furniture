// ============================================================
// Database Configuration - MySQL Connection Pool
// ============================================================
// This file creates a connection pool to MySQL database.
// A pool manages multiple connections efficiently instead of
// creating a new connection for every query.
//
// The pool is exported and used by all route files to run queries.
// ============================================================

import mysql from 'mysql2/promise'; // MySQL driver with Promise support
import dotenv from 'dotenv';         // Load .env variables

dotenv.config(); // Load DATABASE_HOST, DATABASE_USER, etc. from .env

// Create a connection pool with configuration from .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,      // e.g., 'localhost'
  user: process.env.DB_USER,      // e.g., 'root'
  password: process.env.DB_PASSWORD, // e.g., '' (empty for local MySQL)
  database: process.env.DB_NAME,  // e.g., 'af_furniture'
  waitForConnections: true,       // Wait for available connection if pool is empty
  connectionLimit: 10,            // Max 10 simultaneous connections
  queueLimit: 0,                  // Unlimited queue (wait for connections)
});

// Export the pool so other files can use it
// Usage in routes:
//   import pool from '../config/db.js';
//   const [rows] = await pool.execute('SELECT * FROM products');
export default pool;
