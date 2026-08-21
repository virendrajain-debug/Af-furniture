// ============================================================
// Categories API Routes
// ============================================================
// Handles category management:
//   GET    /api/categories       - List all categories with product counts
//   POST   /api/categories       - Create new category (protected)
//   DELETE /api/categories/:id   - Delete category (protected)
// ============================================================

import { Router } from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// -----------------------------------------------------------
// GET /api/categories
// -----------------------------------------------------------
// List all categories with product count. PUBLIC endpoint.
//
// RESPONSE:
//   [
//     { "id": 1, "name": "Living Room", "product_count": 4, ... },
//     { "id": 2, "name": "Bedroom", "product_count": 4, ... },
//     ...
//   ]
// -----------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.execute(`
      SELECT c.*, COUNT(p.id) as product_count 
      FROM categories c 
      LEFT JOIN products p ON c.id = p.category_id 
      GROUP BY c.id 
      ORDER BY c.name
    `);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// POST /api/categories
// -----------------------------------------------------------
// Create a new category. REQUIRES AUTHENTICATION.
//
// HEADERS: Authorization: Bearer <token>
// BODY: { "name": "Office" }
// -----------------------------------------------------------
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    // Check for duplicates
    const [existing] = await pool.execute('SELECT id FROM categories WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const [result] = await pool.execute('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Category created', id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// DELETE /api/categories/:id
// -----------------------------------------------------------
// Delete a category. REQUIRES AUTHENTICATION.
// Products in this category will have category_id set to NULL.
// -----------------------------------------------------------
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
