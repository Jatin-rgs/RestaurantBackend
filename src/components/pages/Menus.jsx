import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Menus = () => {
  const [selectedMenu, setSelectedMenu] = useState("North Indian Delights");
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/menus?menu=${selectedMenu}`);
      setItems(res.data.items);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedMenu]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/menus/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleAddMenu = async () => {
    if (!newMenuName.trim()) return;

    try {
      await axios.post("http://localhost:8080/menus", {
        name: "Sample Item",
        desc: "Description",
        price: 0,
        category: "General",
        menu: newMenuName,
        image: "",
        available: true,
        showOnCustomerSite: true
      });
      setNewMenuName("");
      setIsAddMenuOpen(false);
      setSelectedMenu(newMenuName); // switch to new menu tab
    } catch (error) {
      console.error("Error adding new menu:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menus = [
    { name: "North Indian Delights" },
    { name: "South Indian Sensations" },
    { name: "Indo-Chinese Fusion" },
    ...[...new Set(items.map(item => item.menu))]
      .filter(menuName => !["North Indian Delights", "South Indian Sensations", "Indo-Chinese Fusion"].includes(menuName))
      .map(name => ({ name }))
  ];

  return (
    <div className="p-4 md:p-8 relative">
      <h1 className="text-2xl font-bold mb-4">Menus</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search your menu here"
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="border px-4 py-2 rounded text-sm"
            onClick={() => alert("Organize feature coming soon!")}
          >
            Organize Menu Items
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600"
            onClick={() => setIsAddMenuOpen(true)}
          >
            Add Menu
          </button>
        </div>
      </div>

      {/* Menu Filters */}
      <div className="flex gap-4 overflow-x-auto mb-6">
        {menus.map((menu, index) => (
          <button
            key={index}
            className={`rounded-lg px-6 py-4 text-left border flex-shrink-0 w-full md:w-auto ${
              selectedMenu === menu.name
                ? "bg-purple-500 text-white border-purple-500"
                : "bg-white text-gray-800 border-gray-200"
            }`}
            onClick={() => setSelectedMenu(menu.name)}
          >
            <div className="font-medium">{menu.name}</div>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">ITEM NAME</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">ITEM CATEGORY</th>
              <th className="px-4 py-2">MENU NAME</th>
              <th className="px-4 py-2">IS AVAILABLE</th>
              <th className="px-4 py-2">SHOW ON CUSTOMER SITE</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-semibold flex items-center gap-1">
                      <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.category}</td>
                <td className="text-center">{item.menu}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={item.available}
                    readOnly
                    className="accent-purple-500"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={item.showOnCustomerSite}
                    readOnly
                    className="accent-purple-500"
                  />
                </td>
                <td className="text-center flex gap-2 justify-center">
                  <button
                    className="flex items-center gap-1 border px-2 py-1 rounded hover:bg-gray-100"
                    onClick={() => navigate(`/update-menu/${item._id}`)}
                  >
                    <FaEdit className="text-sm" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide-in Panel for Add Menu */}
      {isAddMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsAddMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg p-6 z-50 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">ADD MENU</h2>
              <button onClick={() => setIsAddMenuOpen(false)} className="text-xl">&times;</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enter the menu name below to create a new menu.
            </p>
            <label className="text-sm font-semibold block mb-1">Menu Name (English)</label>
            <input
              type="text"
              placeholder="e.g. Breakfast"
              value={newMenuName}
              onChange={(e) => setNewMenuName(e.target.value)}
              className="border w-full px-3 py-2 rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded"
                onClick={handleAddMenu}
              >
                Save
              </button>
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsAddMenuOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menus;