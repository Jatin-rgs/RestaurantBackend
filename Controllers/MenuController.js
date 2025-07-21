const MenuItem = require("../Models/MenuItemModel");

// GET all items or by menu
const getMenuItems = async (req, res) => {
  try {
    const { menu } = req.query;
    const filter = menu ? { menu } : {};
    const items = await MenuItem.find(filter);
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error });
  }
};

// GET single item
const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item", error });
  }
};

// ADD new item
const addMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to add item", error });
  }
};

// UPDATE item
const updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update item", error });
  }
};

// DELETE item
const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
};
