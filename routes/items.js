// backend/routes/items.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ensure uploads folder
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, UPLOAD_DIR); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2,9) + ext);
  }
});
const upload = multer({ storage });

// In-memory items store (replace with DB calls)
let items = [];

// Create item
// SELL ITEM ROUTE → /api/items/sell
router.post('/sell', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// List items
router.get('/', (req, res) => {
  res.json(items);
});

// Get single item
router.get('/:id', (req, res) => {
  const it = items.find(x => x.id === req.params.id);
  if (!it) return res.status(404).json({ message: 'Not found' });
  res.json(it);
});

module.exports = router;
