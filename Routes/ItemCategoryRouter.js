const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await ItemCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a category
router.post('/', async (req, res) => {
  try {
    const category = new ItemCategory(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update category
router.put('/:id', async (req, res) => {
  try {
    const updated = await ItemCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    await ItemCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
