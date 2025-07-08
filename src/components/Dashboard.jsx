import React from 'react';
import Navbar from './Navbar';

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? 'ml-0' : 'ml-64'} transition-all duration-300`}>
      {/* Navbar stays fixed at the top */}
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />

      {/* Main content */}
      <div className="pt-20 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to the Dashboard</h1>
        {/* Add your dashboard widgets or content here */}
      </div>
    </div>
  );
};

export default Dashboard;
