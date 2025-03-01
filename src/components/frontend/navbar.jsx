//navbar.jsx


import React from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon
import logo from "../../assets/prj_logo.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-lg py-6  bg-gradient-to-r from-blue-20 to-blue-100 shadow-lg px-6">
      <div className="flex justify-between items-center">
        {/* Logo and Title Section */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="focus:outline-none">
            <img src={logo} alt="PRJ Logo" className="h-20 w-auto" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-blue-900">PRJ Publication</h1>
            <p className="text-sm text-gray-600">
              Publisher of International Peer-reviewed Academic Journals
            </p>
          </div>
        </div>

        {/* Buttons and Search Bar */}
        <div className="flex flex-col items-end space-y-4 ">
          <div className="flex space-x-4 gap-2">
            <button
              onClick={() => navigate("/Members")}
              className="px-5 py-2 border border-gray-300 rounded hover:bg-blue-500 font-medium hover:text-white transition-colors duration-200"
            >
              Memberships
            </button>
            <button
              onClick={() => navigate("/Awards")}
              className="px-5 py-2 border border-gray-300 rounded hover:text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              Awards
            </button>
            <button
              onClick={() => navigate("/call-for-paper-dec-2025")}
              className="px-5 py-2 border border-gray-300 rounded hover:text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              Call for Paper Dec-2025
            </button>
            <button
              onClick={() => navigate("/submission")}
              className="px-5 py-2 border border-gray-300 rounded hover:text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              Online Paper Submission
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-md mt-2">
            <input
              type="text"
              placeholder="Search by title, keyword, or DOI..."
              className="px-4 py-2 w-full focus:outline-none  focus:ring-2 focus:ring-blue-300 text-black bg-white"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2  flex items-center space-x-2 transition-colors duration-200">
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;