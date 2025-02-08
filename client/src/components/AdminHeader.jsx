import React from "react";
import { Outlet } from "react-router-dom";

const AdminHeader = () => {
  return (
    <>
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        {/* Sidebar Toggle Button for Small Screens */}
        <button
          onClick={toggleSidebar}
          className="text-2xl md:hidden focus:outline-none"
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Title */}
        <h1 className="text-xl font-bold">Admin Panel</h1>
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-3 py-2 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
