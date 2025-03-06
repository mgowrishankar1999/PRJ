
//downloads.jsx

import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";


const downloads = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname.split('/').filter(Boolean);
    return (
        <div className=" min-h-screen flex flex-col bg-white ">
            <div class=''>

                {/* Navbar */}
                <HomeNavbar />
                <MenuBar />
                {/* Menu Bar */}
            </div>

            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
                {/* Sidebar on Left */}
                {/* <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
                    <SidebarList />
                </aside> */}

                <div class='flex flex-col'>
                    <aside className="w-[25vw] bg-white p-2 rounded-lg shadow-sm">
                        <SidebarList />
                    </aside>
                    <div class='flex flex-col my-3 gap-2 shadow-md font-medium   text-xl '>

                        <button class=' bg-blue-500 hover:bg-blue-600 h-[45px] text-white rounded  '>Submit a Manuscript</button>
                        <button
                            onClick={() => navigate('/join_us')}
                            class=' bg-blue-500 hover:bg-blue-600 h-[45px] text-white rounded'>Join Editorial Board</button>
                    </div>
                </div>
                {/* Main Content */}
                <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">
                    {/* Dynamic Breadcrumb Navigation */}
                    <div className="text-sm mb-2">
                        <Link to="/" className="text-blue-500 hover:underline">
                            Home
                        </Link>
                        {currentPath.map((segment, index) => (
                            <span key={index}>
                                <span className="mx-1">/</span>
                                <span className="capitalize">{segment.replace('-', ' ')}</span>
                            </span>
                        ))}
                    </div>

                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">downloads</div>


                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full border-separate border-spacing-0 border border-gray-300">
                            <thead>
                                <tr className="bg-blue-500 text-white text-left border border-gray-300">
                                    <th className="p-3 border border-gray-300">S.No</th>
                                    <th className="p-3 border border-gray-300">Title of the Content</th>
                                    <th className="p-3 border border-gray-300">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3 border border-gray-300">1</td>
                                    <td className="p-3 border border-gray-300">Sample Document</td>
                                    <td className="p-3 border border-gray-300">
                                        <a href="#" className="text-blue-500 hover:underline">Download</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-gray-300">2</td>
                                    <td className="p-3 border border-gray-300">Another File</td>
                                    <td className="p-3 border border-gray-300">
                                        <a href="#" className="text-blue-500 hover:underline">Download</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </main>
            </div>
            <ImageGallery />
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default downloads;