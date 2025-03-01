
    // import React from "react";
    // import { Link, useLocation } from 'react-router-dom';
    // import HomeNavbar from "./navbar";
    // import MenuBar from "./menubar";
    // import SidebarList from "./sidebar";
    // import Footer from "./footer";


    // const apc = () => {
    //     const location = useLocation();
    //     const currentPath = location.pathname.split('/').filter(Boolean);

    //     return (
    //         <div className=" min-h-screen flex flex-col bg-white ">
    //             <div class=''>

    //                 {/* Navbar */}
    //                 <HomeNavbar />
    //                 <MenuBar />
    //                 {/* Menu Bar */}
    //             </div>

    //             <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
    //                 {/* Sidebar on Left */}
    //                 <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
    //                     <SidebarList />
    //                 </aside>


    //                 {/* Main Content */}
    //                 <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">
    //                     {/* Dynamic Breadcrumb Navigation */}
    //                     <div className="text-sm mb-2">
    //                         <Link to="/" className="text-blue-500 hover:underline">
    //                             Home
    //                         </Link>
                            // currentPath.map((segment, index) => (
    //                             <span key={index}>
    //                                 <span className="mx-1">/</span>
    //                                 <span className="capitalize">{segment.replace('-', ' ')}</span>
    //                             </span>
    //                         ))}
    //                     </div>
    //                     <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">apc</div>

    //                 </main>
    //             </div>

    //             {/* Footer */}
    //             <Footer />
    //         </div>
    //     );
    // };

    // export default apc;