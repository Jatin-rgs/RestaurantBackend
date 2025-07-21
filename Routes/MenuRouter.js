const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// Get all menus
router.get('/', async (req, res) => {
  const menus = await Menu.find();
  res.json(menus);
});

// Add menu
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newMenu = new Menu({ name, items: [] });
  await newMenu.save();
  res.json(newMenu);
});

// Update menu name
router.put('/:id', async (req, res) => {
  const updated = await Menu.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(updated);
});

// Delete menu
router.delete('/:id', async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: 'Menu deleted' });
});

module.exports = router;
