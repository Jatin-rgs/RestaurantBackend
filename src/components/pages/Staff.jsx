import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: "Waiter" });
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const getStaff = async () => {
    const res = await axios.get("http://localhost:8080/api/staff");
    setStaff(res.data);
  };

  const updateRole = async (id, newRole) => {
    await axios.put(`http://localhost:8080/api/staff/${id}`, { role: newRole });
    getStaff();
  };

  const deleteStaff = async (id) => {
    await axios.delete(`http://localhost:8080/api/staff/${id}`);
    getStaff();
  };

  const addStaff = async () => {
    await axios.post("http://localhost:8080/api/staff", newStaff);
    setShowModal(false);
    setNewStaff({ name: "", email: "", role: "Waiter" });
    getStaff();
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:8080/api/staff/${editingStaff._id}`, editingStaff);
    setShowEditModal(false);
    setEditingStaff(null);
    getStaff();
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="pt-14 pl-14 pr-14">
      {/* Top search and add button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Member
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white shadow-md rounded p-4">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Member Name</th>
              <th className="p-2">Email Address</th>
              <th className="p-2">Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {staff
              .filter((s) =>
                `${s.name} ${s.email}`.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">
                    {s.email === "admin@example.com" ? (
                      <span>You cannot change own role.</span>
                    ) : (
                      <select
                        value={s.role}
                        onChange={(e) => updateRole(s._id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="Waiter">Waiter</option>
                        <option value="Manager">Manager</option>
                      </select>
                    )}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                      onClick={() => {
                        setEditingStaff(s);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit /> Update
                    </button>
                    {s.email !== "admin@example.com" && (
                      <button
                        className="bg-red-200 text-red-700 px-2 py-1 rounded flex items-center gap-1"
                        onClick={() => deleteStaff(s._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full border mb-2 p-2"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border mb-2 p-2"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
            />
            <select
              className="w-full border mb-4 p-2"
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
            >
              <option value="Waiter">Waiter</option>
              <option value="Manager">Manager</option>
            </select>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded"
                onClick={addStaff}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && editingStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Member</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full border mb-2 p-2"
              value={editingStaff.name}
              onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border mb-2 p-2"
              value={editingStaff.email}
              onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
            />
            <select
              className="w-full border mb-4 p-2"
              value={editingStaff.role}
              onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
            >
              <option value="Waiter">Waiter</option>
              <option value="Manager">Manager</option>
            </select>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
