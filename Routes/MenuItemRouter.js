const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const MenuItem = require("../Models/MenuItemModel");
const Menu = require('../models/Menu');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);

    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    const newItem = await new MenuItem(data).save();

    // ✅ Find Menu by name instead of ID
    const menu = await Menu.findOne({ name: data.menuName });
    if (menu) {
      menu.items.push({ ...newItem.toObject() });
      await menu.save();
    }

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const menuId = data.menuId;

    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, data, { new: true });

    const menu = await Menu.findById(menuId);
    if (menu) {
      const index = menu.items.findIndex((item) => item._id.toString() === req.params.id);
      if (index !== -1) {
        menu.items[index] = {
          ...menu.items[index]._doc,
          ...data,
          imageUrl: data.imageUrl || menu.items[index].imageUrl,
        };
        await menu.save();
      }
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    await Menu.updateMany({}, { $pull: { items: { _id: req.params.id } } });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
