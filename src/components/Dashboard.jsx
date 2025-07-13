import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaBell, FaCalendarAlt, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40 flex items-center justify-between px-4 lg:px-6">
      {/* Sidebar Toggle + Brand */}
      <div className="flex items-center gap-4">
        <FaBars
          className="text-gray-700 cursor-pointer text-xl"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-lg font-semibold text-gray-800">TableTrack</span>
      </div>

      {/* Right Icons + Dropdown */}
      <div className="flex items-center gap-4">
        <FaCog className="text-gray-600 cursor-pointer" />
        <FaCalendarAlt className="text-gray-600 cursor-pointer" />
        <FaBell className="text-gray-600 cursor-pointer" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-8 h-8 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-sm"
          >
            JD
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
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
