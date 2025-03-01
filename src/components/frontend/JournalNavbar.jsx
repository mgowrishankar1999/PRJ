// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const JournalNavbar = () => {
//     const { id } = useParams(); // ✅ Get Journal ID from URL
//     const [journal, setJournal] = useState(null);
//     const [menuOpen, setMenuOpen] = useState(false); // ✅ Toggle for mobile menu

//     useEffect(() => {
//         axios.get(`http://192.168.1.13:8080/api/journals/${id}`)
//             .then(response => setJournal(response.data))
//             .catch(error => console.error("Error fetching journal:", error));
//     }, [id]);

//     return (
//         <>
//             {/* 🔴 Red Top Navbar with Journal Name */}
//             <nav className="bg-blue-400 text-white px-6 py-4 shadow-md">
//                 <div className="container mx-auto flex flex-wrap justify-center items-center">
//                     {/* Journal Name (Dynamically Fetched) */}
//                     <h1 className="text-2xl font-bold uppercase text-center">
//                         {journal ? `${journal.journalName} (${journal.journalKey})` : "Loading..."}
//                     </h1>
//                 </div>
//             </nav>

//             {/* 🔵 Light Blue Background Navigation Menu */}
//             <nav className={`bg-gradient-to-r from-blue-100 to-blue-200 shadow-md`}>
//                 <div className="container mx-auto py-2">
//                     <div className="flex flex-wrap justify-center gap-6 text-base font-semibold text-gray-900">
//                         <Link style={{ textDecoration: 'none', text: 'red' }} to={`/journals/${journal ? journal.abbrevation : 'default'}/${journal ? journal.id : 'default'}`} className="hover:text-blue-600">Home</Link>
//                         <Link style={{ textDecoration: 'none' }} to={`/aimandscope/${journal ? journal.id : 'default'}`} className="hover:text-blue-600">Aim & Scope</Link>
//                         <Link style={{ textDecoration: 'none' }} to="#" className="hover:text-blue-600">Archive</Link>
//                         <Link style={{ textDecoration: 'none' }} to="#" className="hover:text-blue-600">Current Issue</Link>
//                         <Link style={{ textDecoration: 'none' }} to={`/indexing/${journal ? journal.id : "default"}`} className="hover:text-blue-600">Indexing</Link>
//                         <Link style={{ textDecoration: 'none' }} to="#" className="hover:text-blue-600">Editorial Board</Link>
//                         <Link style={{ textDecoration: 'none' }} to="#" className="hover:text-blue-600">Article Processing Charges (APC)</Link>
//                         <Link style={{ textDecoration: 'none' }} to={`/submission/${journal ? journal.id : "default"}`} className="hover:text-blue-600">Submission Guidelines</Link>
//                         <Link style={{ textDecoration: 'none' }} to={`/publicationethics/${journal ? journal.id : "default"}`} className="hover:text-red-600">Publication Ethics</Link>
//                         <Link style={{ textDecoration: 'none' }} to={`/copyright/${journal ? journal.id : "default"}`} className="hover:text-blue-600">Copyright</Link>
//                         {/* <Link to={`/editorial?journal=${journal.journalName}` }className="hover:text-blue-600">Editorial Policy</Link> */}
//                         <Link
//                             to={`/editorial/${journal ? journal.id : "default"}`}
//                             className="hover:text-blue-600"
//                             style={{ textDecoration: 'none' }}
//                         >
//                             Editorial Policy
//                         </Link>
//                         <Link
//                             style={{ textDecoration: 'none' }} to={`/plagiarism/${journal ? journal.id : "default"}`}
//                             className="hover:text-blue-600">
//                             Plagiarism Policy
//                         </Link>
//                         <Link style={{ textDecoration: 'none' }} to="#" className="hover:text-blue-600">FAQ</Link>
//                         <Link style={{ textDecoration: 'none' }} to="#" className="hover:text-blue-600">Review Policy</Link>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default JournalNavbar;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const JournalNavbar = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate();  // <-- useNavigate hook
//   const [journal, setJournal] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`http://192.168.1.13:8080/api/journals/${id}`)
//       .then((response) => setJournal(response.data))
//       .catch((error) => console.error("Error fetching journal:", error));
//   }, [id]);

//   // Helper to safely build routes
//   const getJournalId = () => (journal ? journal.id : "default");
//   const getJournalAbbr = () => (journal ? journal.abbrevation : "default");

//   // Example menu items
//   const menuItems = [
//     { label: "Home", route: `/journals/${getJournalAbbr()}/${getJournalId()}` },
//     { label: "Aim & Scope", route: `/aimandscope/${getJournalId()}` },
//     { label: "Archive", route: "#" },
//     { label: "Current Issue", route: "#" },
//     { label: "Indexing", route: `/indexing/${getJournalId()}` },
//     { label: "Editorial Board", route: "#" },
//     { label: "Article Processing Charges (APC)", route: "#" },
//     { label: "Submission Guidelines", route: `/submission/${getJournalId()}` },
//     { label: "Publication Ethics", route: `/publicationethics/${getJournalId()}`, highlight: true }, // example highlight
//     { label: "Copyright", route: `/copyright/${getJournalId()}` },
//     { label: "Editorial Policy", route: `/editorial/${getJournalId()}` },
//     { label: "Plagiarism Policy", route: `/plagiarism/${getJournalId()}` },
//     { label: "FAQ", route: "#" },
//     { label: "Review Policy", route: "#" },
//   ];

//   return (
//     <>
//       {/* Top navbar with Journal Name */}
//       <nav className="bg-blue-400 text-white px-6 py-4 shadow-md">
//         <div className="container mx-auto flex justify-center items-center">
//           <div className="text-2xl italic font-bold uppercase text-center">
//             {journal ? `${journal.journalName} (${journal.journalKey})` : "Loading..."}
//           </div>
//         </div>
//       </nav>

//       {/* Light Blue Background Navigation Menu */}
//       <nav className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-md">
//         <div className="container mx-auto p-2">
//           {/* Mobile toggle button (if you want a collapsible menu on small screens) */}
//           <div className="flex justify-end md:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-gray-800 px-4 py-2 hover:text-blue-600"
//             >
//               {/* You could insert a hamburger icon here if desired */}
//               Menu
//             </button>
//           </div>

//           {/* Desktop/Menu links */}
//           <div
//             className={`${
//               menuOpen ? "block" : "hidden"
//             } md:block mt-2 md:mt-0 text-base font-semibold text-gray-900`}
//           >
//             <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.label}
//                   onClick={() => {
//                     navigate(item.route);
//                     setMenuOpen(false); // close the menu when a link is clicked
//                   }}
//                   className={`hover:text-blue-600 ${
//                     item.highlight ? "hover:text-red-600" : ""
//                   }`}
//                   style={{ textDecoration: "none" }}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default JournalNavbar;


import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaHome,
    FaBook,
    FaUsers,
    FaFileAlt,
    FaQuestionCircle,
    FaBalanceScale,
    FaAngleDown,
} from "react-icons/fa";

const JournalNavbar = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [journal, setJournal] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false); // for mobile toggle

    // Fetch journal info
    useEffect(() => {
        axios
            .get(`http://192.168.1.13:8080/api/journals/${id}`)
            .then((response) => setJournal(response.data))
            .catch((error) => console.error("Error fetching journal:", error));
    }, [id]);

    // Build up dynamic route pieces
    const getJournalId = () => (journal ? journal.id : "default");
    const getJournalAbbr = () => (journal ? journal.abbrevation : "default");
    const homeRoute = `/journals/${getJournalAbbr()}/${getJournalId()}`;

    // --- Direct links (non-dropdown) ---
    // Customize routes as needed
    const directLinks = [
        {
            label: "Home",
            icon: <FaHome />,
            route: homeRoute,
        },
        {
            label: "Aim & Scope",
            icon: <FaBook />,
            route: `/aimandscope/${getJournalId()}`,
        },
        {
            label: "Editorial Board",
            icon: <FaUsers />,
            route: `/editorialboardlist/${getJournalId()}`, // or `/editorialboard/${getJournalId()}`
        },
        {
            label: "Indexing",
            icon: <FaFileAlt />,
            route: `/indexing/${getJournalId()}`,
        },
        {
            label: "Archive",
            icon: <FaBook />,
            route: `/archive/${getJournalId()}`,
        },
        {
            label: "Current Issue",
            icon: <FaFileAlt />,
            route: `/currentissue/${getJournalId()}`,
        },
        {
            label: "(APC)",
            icon: <FaFileAlt />,
            route: "/Apcs", // or `/apc/${getJournalId()}`
        },
    ];

    // --- Single dropdown: "About" ---
    // Contains submission guidelines, publication ethics, editorial policy, etc.
    const aboutDropdown = {
        label: "About",
        icon: <FaBalanceScale />, // or whichever icon you prefer
        items: [
            {
                label: "Submission Guidelines",
                route: `/submission/${getJournalId()}`,
                icon: <FaFileAlt />,
            },
            {
                label: "Publication Ethics",
                route: `/publicationethics/${getJournalId()}`,
                icon: <FaBalanceScale />,
            },
            {
                label: "Editorial Policy",
                route: `/editorial/${getJournalId()}`,
                icon: <FaFileAlt />,
            },
            {
                label: "Plagiarism Policy",
                route: `/plagiarism/${getJournalId()}`,
                icon: <FaBalanceScale />,
            },
            {
                label: "Review Policy",
                route: `/reviewpolicy/${getJournalId()}`,
                icon: <FaFileAlt />,
            },
            {
                label: "FAQ",
                route: `/faq/${getJournalId()}`,
                icon: <FaQuestionCircle />,
            },
            {
                label: "Copyright",
                route: `/copyright/${getJournalId()}`,
                icon: <FaBalanceScale />,
            },
        ],
    };

    // Highlight active link
    const getActiveClass = (path) => {
        return location.pathname === path
            ? "text-orange-600 font-semibold"
            : "text-gray-700";
    };

    return (
        <>
            <div class='sticky top-0 z-50'>


                {/* (1) Top bar: Journal name */}
                <nav className="bg-blue-100 text-white px-6 w-full  py-3 shadow-lg">
                    <div className="container mx-auto flex justify-center items-center">
                        <div className="text-3xl text-blue-600 font-bold uppercase text-center">
                            {journal ? `${journal.journalName} (${journal.journalKey})` : "Loading..."}
                        </div>
                    </div>
                </nav>

                {/* (2) Main navbar in light-blue */}
                <nav className="bg-blue-200 border-b p-1 shadow-md">
                    <div className="">

                        {/* Mobile toggle button */}
                        <div className="flex hidden justify-start ">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="border px-3 py-1 rounded text-black bg-white"
                            >
                                Menu
                            </button>
                        </div>

                        {/* Links container (Desktop or expanded Mobile) */}
                        <div className={`mt-2 sm:flex  justify-center ${menuOpen ? "block" : "hidden"} `}>
                            <ul className="flex  text-[18px] font-semibold  text-gray-900 ">

                                {/* Render direct links first */}
                                {directLinks.map((link, index) => (
                                    <li key={index} className="mx-2 my-1 ">
                                        <button
                                            onClick={() => {
                                                navigate(link.route);
                                                setMenuOpen(false); // close mobile menu
                                            }}
                                            className={`flex items-center  px-3 py-2 rounded hover:bg-blue-300 transition-colors ${getActiveClass(link.route)}`}
                                        >
                                            <span className="mr-2">{link.icon}</span>
                                            <span>{link.label}</span>
                                        </button>
                                    </li>
                                ))}

                                {/* Then render the single dropdown for "About" */}
                                <li className="relative group mx-2 my-1">
                                    {/* Dropdown label (hover on desktop, click/tap on mobile) */}
                                    <button
                                        className="flex items-center  px-4 py-2 rounded hover:bg-blue-300 transition-colors"
                                    >
                                        {aboutDropdown.icon && <span className="mr-2">{aboutDropdown.icon}</span>}
                                        <span className="text-gray-800">{aboutDropdown.label}</span>
                                        <FaAngleDown className="ml-1" />
                                    </button>

                                    {/* The dropdown menu itself */}
                                    <ul
                                        className="
                                        hidden
                                        group-hover:block 
                                        absolute right-0 p-0 bg-white border rounded shadow-lg 
                                        pt-10  w-[280px]
                                        "
                                    >
                                        {aboutDropdown.items.map((item, idx) => (
                                            <li key={idx} >
                                                <button
                                                    onClick={() => {
                                                        navigate(item.route);
                                                        setMenuOpen(true);
                                                    }}
                                                    className={`block  m-0 px-3 w-[100%]   py-2 hover:bg-blue-100 transition-colors ${getActiveClass(item.route)}`}
                                                >
                                                    <div className="flex items-center  ">
                                                        {item.icon && <span className="pr-2">{item.icon}</span>}
                                                        <span >{item.label}</span>
                                                    </div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default JournalNavbar;
