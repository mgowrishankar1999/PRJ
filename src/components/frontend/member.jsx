import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";

const Members = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    // State for Membership Data
    const [memberships, setMemberships] = useState([]);

    // Fetch Membership Data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/memberships")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMemberships(data);
                } else {
                    setMemberships([data]); // Convert to array if single object
                }
            })
            .catch((error) => console.error("Error fetching membership data:", error));
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

                    {/* Membership Header */}
                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        Memberships
                    </div>

                    {/* Membership Information */}
                    {memberships.length > 0 ? (
                        memberships.map((membership, index) => (
                            <div key={index} className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md items-center mb-6">
                                {/* Profile Photo */}
                                <div className="w-32 h-32 mb-4 md:mb-0 flex justify-center items-center">
                                    <img
                                        src={`http://192.168.1.13:8080/static${membership.photo}`}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border"
                                        onError={(e) => (e.target.src = "/default-profile.png")} // If image fails to load
                                    />
                                </div>

                                {/* Member Details */}
                                <div className="ml-6 flex flex-col text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900">{membership.name || "N/A"}</h2>
                                    <p className="text-gray-700 font-semibold">{membership.affiliation || "N/A"}</p>
                                    <p className="text-gray-600">{membership.membershipType || "N/A"}</p>

                                    {/* Social Media Links */}
                                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                        {membership.googleScholarLink && (
                                            <a href={membership.googleScholarLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                                                Google Scholar
                                            </a>
                                        )}
                                        {membership.researchgateLink && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.researchgateLink && (
                                            <a href={membership.researchgateLink} target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">
                                                ResearchGate
                                            </a>
                                        )}
                                        {membership.orcid && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.orcid && (
                                            <a href={membership.orcid} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                                                ORCID
                                            </a>
                                        )}
                                        {membership.github && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.github && (
                                            <a href={membership.github} target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:underline">
                                                GitHub
                                            </a>
                                        )}
                                        {membership.academiaLink && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.academiaLink && (
                                            <a href={membership.academiaLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 font-semibold hover:underline">
                                                Academia
                                            </a>
                                        )}
                                        {membership.ssrn && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.ssrn && (
                                            <a href={membership.ssrn} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
                                                SSRN
                                            </a>
                                        )}
                                        {membership.scopusLink && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.scopusLink && (
                                            <a href={membership.scopusLink} target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">
                                                Scopus
                                            </a>
                                        )}
                                        {membership.wosLink && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                        {membership.wosLink && (
                                            <a href={membership.wosLink} target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">
                                                Web of Science
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center mt-6">Loading membership details...</p>
                    )}
                </main>
                
            </div>
            <ImageGallery/>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Members;
