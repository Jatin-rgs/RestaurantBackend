const router = require("express").Router();
const {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require("../Controllers/MenuController");

// GET /api/menus?menu=MenuName
router.get("/", getMenuItems);

// GET /api/menus/:id
router.get("/:id", getMenuItemById);

// POST /api/menus
router.post("/", addMenuItem);

// PUT /api/menus/:id
router.put("/:id", updateMenuItem);

// DELETE /api/menus/:id
router.delete("/:id", deleteMenuItem);

module.exports = router;
