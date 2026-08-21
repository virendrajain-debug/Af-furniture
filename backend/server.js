// ============================================================
// AF Furnishings - Main Server Entry Point
// ============================================================
// This file sets up the Express.js server, configures middleware,
// connects all API route groups, and starts listening for requests.
//
// HOW TO RUN:
//   1. Make sure MySQL is running and database 'af_furniture' exists
//   2. Run: npm run migrate  (creates tables)
//   3. Run: npm run seed     (creates admin user + sample data)
//   4. Run: npm run dev      (starts server on port 5000)
// ============================================================

import express from 'express';       // Web framework for Node.js
import cors from 'cors';             // Cross-Origin Resource Sharing middleware
import dotenv from 'dotenv';         // Loads .env file into process.env
import path from 'path';             // For working with file paths
import { fileURLToPath } from 'url'; // Convert ES module URL to file path

// --- Import all API route modules ---
import authRoutes from './routes/auth.js';           // Authentication (login, register, OTP, profile)
import productRoutes from './routes/products.js';    // Product CRUD operations
import categoryRoutes from './routes/categories.js'; // Category CRUD operations
import aboutRoutes from './routes/about.js';         // About page content
import termsRoutes from './routes/terms.js';         // Terms & Conditions content
import enquiryRoutes from './routes/enquiries.js';   // Customer enquiries
import dashboardRoutes from './routes/dashboard.js'; // Dashboard statistics

// Load environment variables from .env file
dotenv.config();

// Convert ES module __filename and __dirname (ES modules don't have these by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 5000; // Port from .env or default 5000

// ============================================================
// MIDDLEWARE CONFIGURATION
// ============================================================

// Enable CORS - allows frontend (on different port) to call this API
app.use(cors());

// Parse JSON request bodies (for POST/PUT requests with JSON data)
// 10mb limit allows large product image base64 data if needed
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded form data (for HTML form submissions)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically (product images)
// When a request comes for /uploads/filename.jpg, it serves from backend/uploads/
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================================
// API ROUTES - All endpoints are prefixed with /api
// ============================================================

// Auth routes: POST /api/auth/login, /api/auth/forgot-password, etc.
app.use('/api/auth', authRoutes);

// Product routes: GET /api/products, POST /api/products, etc.
app.use('/api/products', productRoutes);

// Category routes: GET /api/categories, POST /api/categories, etc.
app.use('/api/categories', categoryRoutes);

// About page routes: GET /api/about, PUT /api/about
app.use('/api/about', aboutRoutes);

// Terms & Conditions routes: GET /api/terms, PUT /api/terms
app.use('/api/terms', termsRoutes);

// Enquiry routes: GET /api/enquiries, POST /api/enquiries
app.use('/api/enquiries', enquiryRoutes);

// Dashboard stats route: GET /api/dashboard (requires auth)
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint - useful to test if server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================
// START THE SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Health Check: http://localhost:${PORT}/api/health`);
});
