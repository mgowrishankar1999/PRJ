import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronDown,
    FaChevronUp,
    FaHome,
    FaNewspaper,
    FaUsers,
    FaFileAlt,
    FaLayerGroup,
    FaClipboardList,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const menuItems = [
        { name: "Dashboard", path: "/", icon: <FaHome /> },
        {
            name: "Journal Info",
            icon: <FaNewspaper />,
            dropdown: [
                { name: "Discipline Master", path: "/disciplinemaster" },
                { name: "Master Journal", path: "/journal" },
                { name: "Journal Issue", path: "/journalissue" },
                { name: "Editorial Board", path: "/editorial-board" },
                { name: "APC Data", path: "/apcdata" },
            ],
        },
        {
            name: "Articles",
            icon: <FaFileAlt />,
            dropdown: [
                { name: "University Master", path: "/university" },
                { name: "Author Master", path: "/authors" },
                { name: "Article Master", path: "/article" },
            ],
        },
        { name: "Journal Indexing", path: "/indexing", icon: <FaLayerGroup /> },
        { name: "Membership", path: "/memberships", icon: <FaUsers /> },
        { name: "Awards", path: "/awardslist", icon: <FaUsers /> },
        {
            name: "Journal Subscription",
            icon: <FaClipboardList />,
            dropdown: [
                { name: "Add Price", path: "/subscription" },
                { name: "Add Year", path: "/subscriptionfile" },
            ],
        },
        { name: "Call for Paper", path: "/CallForPapers", icon: <FaClipboardList /> },
        { name: "Abstracting & Indexing", path: "/abstractindexing", icon: <FaClipboardList /> },
        { name: "Join Us", path: "/joinus", icon: <FaClipboardList /> },
        { name: "Online Papers", path: "/onlinepaperslist", icon: <FaClipboardList /> },
        { name: "Downloads", path: "/downloads", icon: <FaClipboardList /> },
        { name: "News", path: "/news", icon: <FaClipboardList /> },
        { name: "Career", path: "/carrier", icon: <FaClipboardList /> },
        { name: "Testimonial", path: "/testimonial", icon: <FaClipboardList /> },
        { name: "Clients", path: "/clients", icon: <FaClipboardList /> },
        { name: "FAQ", path: "/faq", icon: <FaClipboardList /> },
    ];

    const filteredMenu = menuItems.filter((item) => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
        if (item.dropdown) {
            return item.dropdown.some((subItem) =>
                subItem.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return false;
    });

    return (
        <aside className="sidebar bg-dark text-white d-flex flex-column w-24 mt-17 p-3">
            {/* Sidebar Header */}
            <h2 className="text-center fw-bold mb-3">Admin Panel</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Navigation Menu */}
            <nav>
                <ul className="nav flex-column">
                    {filteredMenu.map((item, index) => (
                        <li key={index} className="nav-item">
                            {item.dropdown ? (
                                <>
                                    {/* ✅ FIXED: Dropdown Items Now Stay Aligned */}
                                    <div
                                        className="nav-link d-flex justify-content-between align-items-center text-white fw-semibold"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => toggleDropdown(item.name)}
                                    >
                                        <span className="d-flex align-items-center">
                                            <span className="me-2 fs-5">{item.icon}</span>
                                            {item.name}
                                        </span>
                                        {openDropdown === item.name ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>

                                    {/* Dropdown Items */}
                                    {openDropdown === item.name && (
                                        <ul className="list-unstyled ms-4">
                                            {item.dropdown
                                                .filter((subItem) =>
                                                    subItem.name.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((subItem, subIndex) => (
                                                    <li key={subIndex} className="nav-item">
                                                        <Link to={subItem.path} className="nav-link text-light ps-4">
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                /* ✅ FIXED: Non-Dropdown Items Now Stay Aligned */
                                <Link to={item.path} className="nav-link text-white fw-semibold d-flex align-items-center">
                                    <span className="me-2 fs-5">{item.icon}</span>
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="mt-auto text-center">
                <small className="text-secondary">© 2025 Your Company</small>
            </div>

            {/* Sidebar Styling */}
            <style>
                {`
                .sidebar {
                    width: 250px;
                    overflow-y: auto;
                }

                .nav-link {
                    padding: 10px 15px;
                    border-radius: 5px;
                    transition: background 0.3s ease;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .nav-item {
                    margin-bottom: 5px;
                }

                .fs-5 {
                    font-size: 1.2rem; /* Fix icon size */
                }

                @media (max-width: 768px) {
                    .sidebar {
                        width: 100%;
                        height: auto;
                    }
                }
                `}
            </style>
        </aside>
    );
}

export default Sidebar;
