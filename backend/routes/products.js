// ============================================================
// Products API Routes
// ============================================================
// Handles all product operations:
//   GET    /api/products       - List products (with filters)
//   GET    /api/products/:id   - Get single product by ID
//   POST   /api/products       - Create new product (protected)
//   PUT    /api/products/:id   - Update product (protected)
//   DELETE /api/products/:id   - Delete product (protected)
//
// QUERY PARAMETERS for GET /api/products:
//   ?category=Living Room    - Filter by category name
//   ?search=sofa             - Search in name and description
//   ?featured=true           - Only featured products
//   ?new_arrival=true        - Only new arrivals
//   ?limit=4                 - Limit number of results
// ============================================================

import { Router } from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import multer from 'multer';      // For handling file uploads
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

const router = Router();

// -----------------------------------------------------------
// GET /api/products
// -----------------------------------------------------------
// List all products with optional filters.
// This is a PUBLIC endpoint (no auth required) for the website.
//
// EXAMPLES:
//   GET /api/products                          - All products
//   GET /api/products?category=Bedroom         - Bedroom products only
//   GET /api/products?featured=true            - Featured products only
//   GET /api/products?search=table             - Search for "table"
//   GET /api/products?limit=4                  - Only 4 products
// -----------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, new_arrival, limit } = req.query;
    
    // Build query dynamically based on filters
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    // Filter by category name
    if (category) {
      query += ' AND c.name = ?';
      params.push(category);
    }
    
    // Search in product name and description
    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    // Filter featured products only
    if (featured === 'true') {
      query += ' AND p.featured = 1';
    }
    
    // Filter new arrivals only
    if (new_arrival === 'true') {
      query += ' AND p.new_arrival = 1';
    }

    query += ' ORDER BY p.created_at DESC';
    
    // Limit number of results
    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const [products] = await pool.execute(query, params);
    
    // Parse images JSON string into JavaScript array
    const parsed = products.map(p => ({
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// GET /api/products/:id
// -----------------------------------------------------------
// Get a single product by its ID.
//
// EXAMPLE: GET /api/products/5
// -----------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const [products] = await pool.execute(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [req.params.id]
    );
    if (products.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = products[0];
    product.images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// POST /api/products
// -----------------------------------------------------------
// Create a new product. REQUIRES AUTHENTICATION.
//
// HEADERS: Authorization: Bearer <token>
// BODY (multipart/form-data for image uploads):
//   name, category_id, mrp, selling_price, discounted_price,
//   description, stock, material, color, size, dimensions,
//   weight, warranty, delivery_info, featured, new_arrival
//   images (file uploads)
// -----------------------------------------------------------
router.post('/', authenticateToken, upload.array('images', 10), async (req, res) => {
  try {
    const {
      name, category_id, mrp, selling_price, discounted_price, description,
      stock, material, color, size, dimensions, weight, warranty, delivery_info,
      featured, new_arrival
    } = req.body;

    // Validate required fields
    if (!name || !mrp) {
      return res.status(400).json({ message: 'Name and MRP are required' });
    }

    // Convert uploaded files to URL paths
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    // Insert product into database
    const [result] = await pool.execute(
      `INSERT INTO products (name, category_id, mrp, selling_price, discounted_price, description, stock, material, color, size, dimensions, weight, warranty, delivery_info, featured, new_arrival, images) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, category_id || null, mrp, selling_price || null, discounted_price || null, description || null, stock || 0, material || null, color || null, size || null, dimensions || null, weight || null, warranty || null, delivery_info || null, featured === 'true' || featured === true ? 1 : 0, new_arrival === 'true' || new_arrival === true ? 1 : 0, JSON.stringify(images)]
    );

    res.status(201).json({ message: 'Product created successfully', id: result.insertId });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// PUT /api/products/:id
// -----------------------------------------------------------
// Update an existing product. REQUIRES AUTHENTICATION.
// -----------------------------------------------------------
router.put('/:id', authenticateToken, upload.array('images', 10), async (req, res) => {
  try {
    const {
      name, category_id, mrp, selling_price, discounted_price, description,
      stock, material, color, size, dimensions, weight, warranty, delivery_info,
      featured, new_arrival, existing_images
    } = req.body;

    // Combine existing images with newly uploaded ones
    let images = existing_images ? JSON.parse(existing_images) : [];
    if (req.files && req.files.length > 0) {
      images = [...images, ...req.files.map(f => `/uploads/${f.filename}`)];
    }

    await pool.execute(
      `UPDATE products SET name=?, category_id=?, mrp=?, selling_price=?, discounted_price=?, description=?, stock=?, material=?, color=?, size=?, dimensions=?, weight=?, warranty=?, delivery_info=?, featured=?, new_arrival=?, images=? WHERE id=?`,
      [name, category_id || null, mrp, selling_price || null, discounted_price || null, description || null, stock || 0, material || null, color || null, size || null, dimensions || null, weight || null, warranty || null, delivery_info || null, featured === 'true' || featured === true ? 1 : 0, new_arrival === 'true' || new_arrival === true ? 1 : 0, JSON.stringify(images), req.params.id]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------------------------------------
// DELETE /api/products/:id
// -----------------------------------------------------------
// Delete a product by ID. REQUIRES AUTHENTICATION.
// -----------------------------------------------------------
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
