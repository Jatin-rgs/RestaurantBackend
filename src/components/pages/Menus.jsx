// src/components/pages/Menus.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Menus = () => {
  const [selectedMenu, setSelectedMenu] = useState("North Indian Delights");
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const menus = [
    { name: "North Indian Delights", items},
    { name: "South Indian Sensations", items },
    { name: "Indo-Chinese Fusion", items },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/menus?menu=${selectedMenu}`);
        setItems(res.data.items);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchItems();
  }, [selectedMenu]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/menus/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
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
            onClick={() => navigate("/add-menu")}
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
            <div className="text-sm">{menu.items} Item(s)</div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{selectedMenu}</h2>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded text-sm">Update</button>
          <button className="bg-red-100 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-200">
            Delete
          </button>
        </div>
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
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
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
                  <input type="checkbox" checked={item.available} readOnly className="accent-purple-500" />
                </td>
                <td className="text-center">
                  <input type="checkbox" checked={item.showOnCustomerSite} readOnly className="accent-purple-500" />
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
    </div>
  );
};

export default Menus;