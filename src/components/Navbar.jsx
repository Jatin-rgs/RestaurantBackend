import React, { useState, useRef, useEffect } from 'react';
import {
  FaBars,
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaCog,
} from 'react-icons/fa';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Sidebar Toggle + Logo */}
      <div className="flex items-center gap-4">
        <FaBars
          className="text-gray-700 cursor-pointer text-xl"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-lg font-semibold text-gray-800">Demo Restaurant</span>
      </div>

      {/* Center: Action Buttons */}
      <div className="hidden md:flex items-center gap-2">
        <button className="px-3 py-1 border border-purple-300 rounded-full text-sm text-purple-600 font-semibold">
          Today Orders <span className="ml-1 bg-purple-100 text-purple-800 rounded-full px-2">4</span>
        </button>
        <button className="px-3 py-1 border border-purple-300 rounded-full text-sm text-purple-600 font-semibold">
          New Reservations <span className="ml-1 bg-purple-100 text-purple-800 rounded-full px-2">0</span>
        </button>
        <button className="px-3 py-1 border border-purple-300 rounded-full text-sm text-purple-600 font-semibold">
          New Waiter Request <span className="ml-1 bg-purple-100 text-purple-800 rounded-full px-2">0</span>
        </button>
      </div>

      {/* Right: Icons and User */}
      <div className="flex items-center gap-4">
        <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-600 border">
          30 days left on trial
        </button>

        <FaCog className="text-gray-600 cursor-pointer" />
        <FaCalendarAlt className="text-gray-600 cursor-pointer" />
        <FaBell className="text-gray-600 cursor-pointer" />

        {/* JD Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-8 h-8 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-sm focus:outline-none"
          >
            JD
          </button>

          {/* Dropdown menu */}
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
