// ============================================================
// Enquiries API Routes
// ============================================================
// Handles customer enquiry/interest forms:
//   GET    /api/enquiries           - List enquiries (protected)
//   POST   /api/enquiries           - Submit new enquiry (public)
//   PUT    /api/enquiries/:id/status - Update enquiry status (protected)
//   DELETE /api/enquiries/:id        - Delete enquiry (protected)
//
// ENQUIRY TYPES:
//   - "product": Customer clicked "Add to enquiry" on a product
//   - "contact": Customer filled the Contact form
// ============================================================

import { Router } from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// -----------------------------------------------------------
// GET /api/enquiries
// -----------------------------------------------------------
// List all enquiries. REQUIRES AUTHENTICATION.
// QUERY: ?type=product&status=pending (both optional)
// -----------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = 'SELECT * FROM enquiries WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';
    const [enquiries] = await pool.execute(query, params);
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// POST /api/enquiries
// -----------------------------------------------------------
// Submit a new enquiry. PUBLIC endpoint (no auth needed).
// Used by both the website product cards and the contact form.
//
// BODY: { "name": "John", "email": "john@example.com", "product_id": 1, "message": "...", "type": "product" }
// -----------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, product_id, product_name, message, type } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO enquiries (name, email, phone, product_id, product_name, message, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone || null, product_id || null, product_name || null, message || null, type || 'product']
    );

    res.status(201).json({ message: 'Enquiry submitted successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// PUT /api/enquiries/:id/status
// -----------------------------------------------------------
// Update enquiry status (pending -> replied -> closed).
// REQUIRES AUTHENTICATION.
// -----------------------------------------------------------
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// DELETE /api/enquiries/:id
// -----------------------------------------------------------
// Delete an enquiry. REQUIRES AUTHENTICATION.
// -----------------------------------------------------------
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM enquiries WHERE id = ?', [req.params.id]);
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
