import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState("productManagement");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      <div className="bg-gray-800 text-white h-screen w-64 hidden md:block">
        <nav className="flex flex-col space-y-2 p-4">
          <NavLink
            to="/admin-dashboard"
            className="px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </NavLink>

          <div>
            <button
              onClick={() => toggleMenu("productManagement")}
              className="w-full text-left px-4 py-2 flex justify-between items-center rounded hover:bg-gray-700"
            >
              Product Management
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openMenu === "productManagement" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openMenu === "productManagement" && (
              <div className="pl-6 mt-2 space-y-2">
                <NavLink
                  to="/pendinglisting"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  Pending Listing
                </NavLink>
                <NavLink
                  to="/approvedlisting"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  Approved Listing
                </NavLink>

                <NavLink
                  to="/rejectedlisting"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  Rejected Listing
                </NavLink>
                <NavLink
                  to="/Alllisting"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  All Listing Page
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/admin"
            className="px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => localStorage.clear("admin_token")}
          >
            Logout
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
