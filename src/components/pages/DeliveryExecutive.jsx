import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const DeliveryExecutive = () => {
  const [executives, setExecutives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [newExecutive, setNewExecutive] = useState({
    name: "",
    phone: "",
    orders: 0,
    status: "AVAILABLE",
  });

  const fetchExecutives = async () => {
    const res = await axios.get("http://localhost:8080/api/executives");
    setExecutives(res.data);
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/executives/${id}`);
    fetchExecutives();
  };

  const handleAdd = async () => {
    await axios.post("http://localhost:8080/api/executives", newExecutive);
    setIsPanelOpen(false);
    setNewExecutive({ name: "", phone: "", orders: 0, status: "AVAILABLE" });
    fetchExecutives();
  };

  return (
    <div className="relative p-6 mt-20"> {/* ADDED mt-20 here */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Delivery Executive</h2>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Executive
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, email or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Member Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Total Orders</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {executives
            .filter((ex) =>
              ex.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((ex) => (
              <tr key={ex._id} className="text-center">
                <td className="p-2 border">{ex.name}</td>
                <td className="p-2 border">{ex.phone}</td>
                <td className="p-2 border">{ex.orders} ORDERS</td>
                <td className="p-2 border">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    {ex.status}
                  </span>
                </td>
                <td className="p-2 border">
                  <button className="text-blue-500 mr-2">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(ex._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Slide-In Add Panel */}
      {isPanelOpen && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 z-50 transition-all border-l border-gray-300">
          <h3 className="text-xl font-semibold mb-4">Add Delivery Executive</h3>
          <input
            type="text"
            placeholder="Name"
            value={newExecutive.name}
            onChange={(e) =>
              setNewExecutive({ ...newExecutive, name: e.target.value })
            }
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newExecutive.phone}
            onChange={(e) =>
              setNewExecutive({ ...newExecutive, phone: e.target.value })
            }
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="number"
            placeholder="Total Orders"
            value={newExecutive.orders}
            onChange={(e) =>
              setNewExecutive({ ...newExecutive, orders: e.target.value })
            }
            className="w-full p-2 mb-3 border rounded"
          />
          <select
            value={newExecutive.status}
            onChange={(e) =>
              setNewExecutive({ ...newExecutive, status: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="ON DELIVERY">ON DELIVERY</option>
            <option value="OFF DUTY">OFF DUTY</option>
          </select>

          <div className="flex justify-between">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setIsPanelOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAdd}
            >
              Add Executive
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryExecutive;
