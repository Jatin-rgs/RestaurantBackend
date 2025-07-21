import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const timeSlots = ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

const NewReservationPanel = ({ onClose, onReservationAdded }) => {
  const [form, setForm] = useState({
    date: "",
    guests: 1,
    meal: "Lunch",
    slot: "",
    notes: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSlotSelect = (slot) => {
    setForm({ ...form, slot });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/reservations", {
        ...form,
        date: new Date(`${form.date} ${form.slot}`),
      });
      if (res.data) {
        onReservationAdded(res.data);
      }
    } catch (err) {
      console.error("Reservation failed:", err);
      alert("Reservation failed");
    }
  };

  return (
    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 transition-transform duration-300">
      <div className="p-6 relative h-full overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">New Reservation</h2>

        <div className="space-y-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          <div className="flex gap-2">
            <select name="guests" value={form.guests} onChange={handleChange} className="flex-1 border p-2 rounded-md">
              {[...Array(10)].map((_, i) => (
                <option key={i + 1}>{i + 1} Guest{ i > 0 && 's' }</option>
              ))}
            </select>
            <select name="meal" value={form.meal} onChange={handleChange} className="flex-1 border p-2 rounded-md">
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Select Time Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleSlotSelect(slot)}
                  className={`border px-2 py-1 rounded ${
                    form.slot === slot ? "bg-purple-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            rows={3}
            placeholder="Any special request?"
          ></textarea>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Customer Name" className="border p-2 rounded-md" />
            <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="Phone" className="border p-2 rounded-md" />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" className="border p-2 rounded-md" />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-600"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReservationPanel;
