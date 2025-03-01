import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "../navbar";
import MenuBar from "../menubar";
import SidebarList from "../sidebar";
import Footer from "../footer";
import ImageGallery from "../Image";
import JournalNavbar from "../JournalNavbar";

const EditorialBoardlist = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    // Extract journalId from URL
    const journalId = currentPath[currentPath.length - 1]; // Gets last part of the URL

    // State for Editorial Board Data
    const [editors, setEditors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Editorial Board Data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/editorial-board")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    // Filter editors where journalId matches the extracted journalId
                    const filteredEditors = data.filter(editor => String(editor.journalId) === journalId);
                    setEditors(filteredEditors);
                } else {
                    // If single object, check and convert to array if it matches the condition
                    if (String(data.journalId) === journalId) {
                        setEditors([data]);
                    } else {
                        setEditors([]);
                    }
                }
            })
            .catch((error) => console.error("Error fetching editorial board data:", error))
            .finally(() => setLoading(false));
    }, [journalId]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar and Menu */}
            <HomeNavbar />
            <MenuBar />
            <JournalNavbar />

            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* Sidebar */}
                <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                </aside>

                {/* Main Content */}
                <main className="w-4/1 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    {/* Breadcrumb Navigation */}
                    {/* <div className="text-sm mb-2">
                        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                        {currentPath.map((segment, index) => (
                            <span key={index}>
                                <span className="mx-1">/</span>
                                <span className="capitalize">{segment.replace("-", " ")}</span>
                            </span>
                        ))}
                    </div> */}

                    {/* Editorial Board Header */}
                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        Editorial Board
                    </div>

                    {/* Show Loading Message */}
                    {loading ? (
                        <p className="text-gray-600 text-center mt-6">Loading editorial board details...</p>
                    ) : editors.length > 0 ? (
                        editors.map((editor, index) => {
                            const isChiefEditor = editor.editorType === "Chief Editor";
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col md:flex-row p-6 rounded-lg shadow-md items-center mb-6 ${
                                        isChiefEditor ? "bg-yellow-200 border-l-4 border-yellow-500" : "bg-gray-100"
                                    }`}
                                >
                                    {/* Profile Photo */}
                                    <div className="w-32 h-32 mb-4 md:mb-0 flex justify-center items-center">
                                        <img
                                            src={`http://192.168.1.13:8080${editor.profilePhoto}`}
                                            alt="Profile"
                                            className={`w-32 h-32 border ${isChiefEditor ? "rounded-none" : "rounded-full"}`} // Square for Chief Editor, Round for Others
                                            onError={(e) => (e.target.src = "/default-profile.png")}
                                        />
                                    </div>

                                    {/* Editor Details */}
                                    <div className="ml-6 flex flex-col text-center md:text-left">
                                        <h2 className={`text-2xl font-bold ${isChiefEditor ? "text-yellow-700" : "text-gray-900"}`}>
                                            {editor.prefix} {editor.editorName || "N/A"}
                                        </h2>
                                        <p className="text-gray-700 font-semibold">{editor.editorAffiliation || "N/A"}</p>
                                        <p className={`text-gray-600 ${isChiefEditor ? "font-bold" : ""}`}>{editor.editorType || "N/A"}</p>
                                        <p className="text-gray-700">{editor.editorEmail}</p>

                                        {/* Social Media Links */}
                                        <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                            {editor.googleScholarProfile && (
                                                <a href={editor.googleScholarProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                                                    Google Scholar
                                                </a>
                                            )}
                                            {editor.researchGateProfile && editor.googleScholarProfile && (
                                                <span className="text-gray-400">|</span>
                                            )}
                                            {editor.researchGateProfile && (
                                                <a href={editor.researchGateProfile} target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">
                                                    ResearchGate
                                                </a>
                                            )}
                                            {editor.orcidLink && editor.researchGateProfile && (
                                                <span className="text-gray-400">|</span>
                                            )}
                                            {editor.orcidLink && (
                                                <a href={editor.orcidLink} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                                                    ORCID
                                                </a>
                                            )}
                                            {editor.publonLink && editor.orcidLink && (
                                                <span className="text-gray-400">|</span>
                                            )}
                                            {editor.publonLink && (
                                                <a href={editor.publonLink} target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:underline">
                                                    Publons
                                                </a>
                                            )}
                                            {editor.scopusAuthorId && editor.publonLink && (
                                                <span className="text-gray-400">|</span>
                                            )}
                                            {editor.scopusAuthorId && (
                                                <a href={editor.scopusAuthorId} target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold hover:underline">
                                                    Scopus
                                                </a>
                                            )}
                                            {editor.institutionalProfile && editor.scopusAuthorId && (
                                                <span className="text-gray-400">|</span>
                                            )}
                                            {editor.institutionalProfile && (
                                                <a href={editor.institutionalProfile} target="_blank" rel="noopener noreferrer" className="text-gray-700 font-semibold hover:underline">
                                                    Institutional Profile
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-600 text-center mt-6">No editorial board members found for this journal.</p>
                    )}
                </main>
            </div>

            <ImageGallery />
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default EditorialBoardlist;
