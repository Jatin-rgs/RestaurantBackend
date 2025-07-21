import React, { useState, useRef, useEffect } from 'react';
import {
  FaBars,
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaCog,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ ADDED

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate(); // ✅ ADDED

  // ✅ Handle logout logic
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b b
