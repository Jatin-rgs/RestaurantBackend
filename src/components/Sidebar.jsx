import React from 'react';
import {
  FaHome,
  FaUtensils,
  FaChair,
  FaBell,
  FaCalendarAlt,
  FaCashRegister,
  FaClipboardList,
  FaUsers,
  FaUserTie,
  FaMotorcycle,
  FaCreditCard,
  FaChartBar,
  FaBoxes,
  FaHamburger,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const Sidebar = ({ sidebarToggle }) => {
  const menuItems = [
    { label: 'Dashboard', icon: <FaHome /> },
    { label: 'Menu', icon: <FaUtensils /> },
    { label: 'Tables', icon: <FaChair /> },
    { label: 'Waiter Requests', icon: <FaBell /> },
    { label: 'Reservations', icon: <FaCalendarAlt /> },
    { label: 'POS', icon: <FaCashRegister /> },
    { label: 'Orders', icon: <FaClipboardList /> },
    { label: 'Customers', icon: <FaUsers /> },
    { label: 'Staff', icon: <FaUserTie /> },
    { label: 'Delivery Executive', icon: <FaMotorcycle /> },
    { label: 'Payments', icon: <FaCreditCard /> },
    { label: 'Reports', icon: <FaChartBar /> },
    { label: 'Inventory', icon: <FaBoxes /> },
    { label: 'Kitchen', icon: <FaHamburger /> },
  ];

  return (
    <aside
      className={`${
        sidebarToggle ? 'hidden' : 'block'
      } w-64 bg-white fixed h-screen p-4 border-r overflow-y-auto shadow-sm`}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
          T
        </div>
        <h1 className="text-lg font-semibold text-gray-800">Demo Restaurant</h1>
      </div>

      {/* Location */}
      <div className="px-2 mb-6">
        <button className="w-full text-sm text-purple-600 bg-purple-100 py-2 px-3 rounded-md font-medium hover:bg-purple-200 transition">
          📍 North Laishaside
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        {menuItems.map((item, idx) => (
          <a
            href="#"
            key={idx}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-md transition text-sm"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-6 px-3">
        <a
          href="#"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700"
        >
          Customer Site <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
