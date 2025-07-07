import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const Sidebar = ({ sidebarToggle }) => {
  const [expanded, setExpanded] = useState(null);

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, href: '/' },
    {
      label: 'Menu',
      icon: <FaUtensils />,
      children: [
        { label: 'Menus', href: '/menus' },
        { label: 'Menu Items', href: '/menu-items' },
        { label: 'Item Categories', href: '/item-categories' },
        { label: 'Modifier Groups', href: '/modifier-groups' },
        { label: 'Item Modifiers', href: '/item-modifiers' },
      ],
    },
    {
      label: 'Tables',
      icon: <FaChair />,
      children: [
        { label: 'Areas', href: '/areas' },
        { label: 'Tables', href: '/tables' },
        { label: 'Table Codes', href: '/table-codes' },
      ],
    },
    { label: 'Waiter Requests', icon: <FaBell />, href: '/waiter-requests' },
    { label: 'Reservations', icon: <FaCalendarAlt />, href: '/reservations' },
    { label: 'POS', icon: <FaCashRegister />, href: '/pos' },
    { label: 'Orders', icon: <FaClipboardList />, href: '/orders' },
    { label: 'Customers', icon: <FaUsers />, href: '/customers' },
    { label: 'Staff', icon: <FaUserTie />, href: '/staff' },
    { label: 'Delivery Executive', icon: <FaMotorcycle />, href: '/delivery-executive' },
    {
      label: 'Payments',
      icon: <FaCreditCard />,
      children: [
        { label: 'Due Payments', href: '/due-payments' },
        { label: 'Expenses', href: '/expenses' },
        { label: 'Expense Categories', href: '/expense-categories' },
      ],
    },
    {
      label: 'Reports',
      icon: <FaChartBar />,
      children: [
        { label: 'Sales Report', href: '/sales-report' },
        { label: 'Item Report', href: '/item-report' },
        { label: 'Category Report', href: '/category-report' },
        { label: 'Expense Report', href: '/expense-report' },
      ],
    },
    {
      label: 'Inventory',
      icon: <FaBoxes />,
      children: [
        { label: 'Dashboard', href: '/inventory-dashboard' },
        { label: 'Units', href: '/inventory-units' },
        { label: 'Inventory Items', href: '/inventory-items' },
        { label: 'Item Categories', href: '/inventory-item-categories' },
        { label: 'Inventory Stock', href: '/inventory-stock' },
        { label: 'Inventory Movement', href: '/inventory-movement' },
        { label: 'Recipes', href: '/recipes' },
        { label: 'Purchase Orders', href: '/purchase-orders' },
        { label: 'Suppliers', href: '/suppliers' },
        { label: 'Reports', href: '/inventory-reports' },
      ],
    },
    {
      label: 'Kitchen',
      icon: <FaHamburger />,
      children: [
        { label: 'All Kitchen', href: '/all-kitchens' },
        { label: 'Default Kitchen', href: '/default-kitchen' },
        { label: 'Veg Kitchen', href: '/veg-kitchen' },
        { label: 'Non-Veg Kitchen', href: '/nonveg-kitchen' },
      ],
    },
  ];

  const toggleSubMenu = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

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

      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {item.children ? (
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-md transition text-sm"
                onClick={() => toggleSubMenu(item.label)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {expanded === item.label ? (
                  <FaChevronUp className="w-3 h-3" />
                ) : (
                  <FaChevronDown className="w-3 h-3" />
                )}
              </button>
            ) : (
              <Link
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-md transition text-sm"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )}

            {/* Submenu */}
            {item.children && expanded === item.label && (
              <div className="ml-6 mt-1 space-y-1">
                {item.children.map((child, childIdx) => (
                  <Link
                    to={child.href}
                    key={childIdx}
                    className="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 rounded-md hover:bg-purple-50 hover:text-purple-700 transition group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-300 group-hover:bg-purple-600"></span>
                    <span>{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
