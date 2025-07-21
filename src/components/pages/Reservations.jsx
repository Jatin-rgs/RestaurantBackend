import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, subDays } from "date-fns";
import { FaPlus } from "react-icons/fa";
import NewReservationPanel from "./NewReservationPanel";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [openPanel, setOpenPanel] = useState(false);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reservations", {
        params: { start: startDate, end: endDate, search },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [startDate, endDate, search]);

  const handleReservationAdded = (newReservation) => {
    setReservations((prev) => [newReservation, ...prev]);
    setOpenPanel(false);
  };

  return (
    <div className="pt-20 px-6 pb-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          📅 Reservations
        </h1>
        <button
          onClick={() => setOpenPanel(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow"
        >
          <FaPlus size={14} />
          New Reservation
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        <select
          className="border border-gray-300 p-2 rounded-md focus:outline-none"
          defaultValue="current"
        >
          <option value="current">Current Week</option>
          <option value="last">Last Week</option>
          <option value="custom">Custom</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
        <span className="text-gray-600">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-300 p-2 rounded-md"
        />
      </div>

      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((res) => (
            <div key={res._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold">{res.name}</h2>
              <p className="text-sm text-gray-600">📞 {res.phone}</p>
              <p className="text-sm text-gray-600">📧 {res.email}</p>
              <p className="text-sm text-gray-600">📅 {new Date(res.date).toLocaleString()}</p>
              <p className="text-sm text-gray-600">👥 Guests: {res.guests}</p>
              <p className="text-sm text-gray-600">📝 {res.notes || "No notes"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-32">
          <img
            src="https://img.icons8.com/external-flat-icons-inmotus-design/67/null/external-empty-empty-state-flat-icons-inmotus-design.png"
            alt="No reservations"
            className="mx-auto mb-4 w-16 h-16"
          />
          <p className="text-lg">No reservations found.</p>
        </div>
      )}

      {openPanel && (
        <NewReservationPanel
          onClose={() => setOpenPanel(false)}
          onReservationAdded={handleReservationAdded}
        />
      )}
    </div>
  );
};

export default Reservations;
