//menubar.jsx

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MenuBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getActiveClass = (path) =>
        location.pathname === path ? "text-blue-600 font-semibold" : "text-black";

    return (
        <div className="bg-white shadow-md py-3 flex justify-around gap-16 px-4 bg-gradient-to-r from-blue-20 to-blue-100 shadow-lg border-b">
            {/* Dropdown Wrapper */}
            <div
                className="relative z-100"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button
                    className="text-white  whitespace-nowrap font-medium bg-blue-500 rounded px-2 py-2 rounded-sm hover:bg-blue-600 transition flex items-center space-x-1"
                >
                    About PRJ Publication
                    <span class='ms-2'>{isDropdownOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}</span>
                </button>
                {isDropdownOpen && (
                    <div className="absolute  w-[290px] bg-white border rounded-md shadow-md z-10 p-2">
                        <ul className="p-0">
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/about")}`}
                                onClick={() => navigate("/aboutus")}
                            >
                                About Us
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/missionstatement")}`}
                                onClick={() => navigate("/missionstatement")}
                            >
                                Mission Statement
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/openaccess")}`}
                                onClick={() => navigate("/openaccess")}
                            >
                                Open Access
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/benefit")}`}
                                onClick={() => navigate("/benefit")}
                            >
                                Benefits of Publication
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/peerreview")}`}
                                onClick={() => navigate("/peerreview")}
                            >
                                Peer-review policy & Process
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/plagiarism")}`}
                                onClick={() => navigate("/plagiarism")}
                            >
                                Plagiarism and Self-Archiving Policy
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/editorial")}`}
                                onClick={() => navigate("/editorial")}
                            >
                                Editorial Policies
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/publicationethics")}`}
                                onClick={() => navigate("/publicationethics")}
                            >
                                Publication Ethics
                            </li>
                            <li
                                className={`px-4 py-2 hover:bg-gray-200 hover:text-red-600 cursor-pointer ${getActiveClass("/copyright")}`}
                                onClick={() => navigate("/copyright")}
                            >
                                Copyright
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Other Menu Buttons */}
            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/authorhub")}`}
                onClick={() => navigate("/authorhub")}
            >
                Author Hub
            </button>

            <button
                className={`font-medium hover:border-b-2 hover:border-red-600 ${getActiveClass("/journallist")}`}
                onClick={() => navigate("/journallist")}
            >
                Journals
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/articles")}`}
                onClick={() => navigate("/articles")}
            >
                Articles
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/authorsearch")}`}
                onClick={() => navigate("/authorsearch")}
            >
                Author Search
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/Apcs")}`}
                onClick={() => navigate("/Apcs")}
            >
                APC
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/indexings")}`}
                onClick={() => navigate("/indexings")}
            >
                Indexing
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/subscription")}`}
                onClick={() => navigate("/subscriptions")}
            >
                Subscription
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/downloads")}`}
                onClick={() => navigate("/downloads")}
            >
                Downloads
            </button>

            <button
                className={`font-medium transition-all hover:border-b-2 hover:border-red-600 ${getActiveClass("/contactus")}`}
                onClick={() => navigate("/contactus")}
            >
                Contact Us
            </button>
        </div>
    );
};

export default MenuBar;