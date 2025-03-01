import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";

const Awardlist = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    // State for Award Data
    const [awards, setAwards] = useState([]);

    // Fetch Award Data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/awards")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAwards(data);
                } else {
                    setAwards([data]); // Convert to array if single object
                }
            })
            .catch((error) => console.error("Error fetching award data:", error));
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar and Menu */}
            <HomeNavbar />
            <MenuBar />

            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* Sidebar */}
                <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                </aside>

                {/* Main Content */}
                <main className="w-4/1 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    {/* Breadcrumb Navigation */}
                    <div className="text-sm mb-2">
                        <Link to="/" className="text-blue-500 hover:underline">
                            Home
                        </Link>
                        {currentPath.map((segment, index) => (
                            <span key={index}>
                                <span className="mx-1">/</span>
                                <span className="capitalize">{segment.replace("-", " ")}</span>
                            </span>
                        ))}
                    </div>

                    {/* Award Header */}
                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        Awards & Achievements
                    </div>

                    {/* Award Information */}
                    {awards.length > 0 ? (
                        awards.map((award, index) => (
                            <div key={index} className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md items-center mb-6">
                                {/* Profile Photo */}
                                <div className="w-32 h-32 mb-4 md:mb-0 flex justify-center items-center">
                                    <img
                                        src={`http://192.168.1.13:8080/static${award.profilePhoto}`}
                                        alt="Award Winner"
                                        className="w-32 h-32 rounded-full object-cover border"
                                        onError={(e) => (e.target.src = "/default-profile.png")} // If image fails to load
                                    />
                                </div>

                                {/* Award Details */}
                                <div className="ml-6 flex flex-col text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900">{award.name || "N/A"}</h2>
                                    <p className="text-gray-700 font-semibold">{award.affiliation || "N/A"}</p>
                                    <p className="text-gray-600 font-medium">{award.awardType || "N/A"}</p>

                                    {/* Social Media Links */}
                                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                        {award.googleScholar && (
                                            <a href={award.googleScholar} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                                                Google Scholar
                                            </a>
                                        )}
                                        {award.researchgate && <span className="text-gray-400">|</span>}
                                        {award.researchgate && (
                                            <a href={award.researchgate} target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">
                                                ResearchGate
                                            </a>
                                        )}
                                        {award.orcid && <span className="text-gray-400">|</span>}
                                        {award.orcid && (
                                            <a href={award.orcid} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                                                ORCID
                                            </a>
                                        )}
                                        {award.academia && <span className="text-gray-400">|</span>}
                                        {award.academia && (
                                            <a href={award.academia} target="_blank" rel="noopener noreferrer" className="text-gray-700 font-semibold hover:underline">
                                                Academia
                                            </a>
                                        )}
                                        {award.linkedin && <span className="text-gray-400">|</span>}
                                        {award.linkedin && (
                                            <a href={award.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
                                                LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center mt-6">No awards found.</p>
                    )}
                </main>
            </div>
            <ImageGallery/>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Awardlist;
