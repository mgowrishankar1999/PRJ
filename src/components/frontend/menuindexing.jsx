import React from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";

// Image Imports
import GoogleScholarLogo from "../../assets/google-scholar.png";
import ResearchBibLogo from "../../assets/researchbib.png";
import ORCIDLogo from "../../assets/orcid.png";
import ResearchGateLogo from "../../assets/researchgate.png";
import ImageGallery from "./Image";
// import ImageGallery from "./Image";

const Indexing = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').filter(Boolean);

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
                                <span className="capitalize">{segment.replace('-', ' ')}</span>
                            </span>
                        ))}
                    </div>

                    {/* Page Header */}
                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        Abstracting & Indexing
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">
                        Indexing of a journal is considered a reflection of its quality. Indexed journals are considered to be of higher scientific quality as compared to non-indexed journals.
                    </p>
                    <p className="text-gray-700 mb-4">
                        PRJ is an open access publisher. So the full text of all the papers is immediately available to everyone without registration or subscription when published.
                    </p>
                    <p className="text-gray-700 mb-4">
                        PRJ works closely with discipline-specific indexing services to ensure our journals are widely indexed. All papers published by PRJ are included immediately in several indexing services.
                    </p>

                    {/* Indexing Services */}
                    <div className="space-y-6">
                        {/* Google Scholar */}
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <img src={GoogleScholarLogo} alt="Google Scholar" className="w-32 h-auto mr-4"/>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Google Scholar</h3>
                                <p className="text-gray-700">
                                    Google Scholar provides a simple way to broadly search for scholarly literature. From one place, you can search across many disciplines and sources: articles, thesis, books, abstracts, and court opinions, from academic publishers, professional societies, online repositories, universities, and other web sites.
                                </p>
                            </div>
                        </div>

                        {/* ResearchBib */}
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">ResearchBib</h3>
                                <p className="text-gray-700">
                                    ResearchBib is open access with a high-standard indexing database for researchers and publishers. ResearchBib, an academic resource publishing system, builds research communities to discover and promote great research resources from around the world to maximize researcher's academic social impacts. ResearchBib Network offers Banners and Sponsored Links in leading, high-impact factor, and multiply indexed research resources website.
                                </p>
                            </div>
                            <img src={ResearchBibLogo} alt="ResearchBib" className="w-32 h-auto ml-4"/>
                        </div>

                        {/* ORCID */}
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <img src={ORCIDLogo} alt="ORCID" className="w-32 h-auto mr-4"/>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">ORCID</h3>
                                <p className="text-gray-700">
                                    ORCID provides a persistent digital identifier that distinguishes you from every other researcher and, through integration in key research workflows such as manuscript and grant submission, supports automated linkages between you and your professional activities ensuring that your work is recognized.
                                </p>
                            </div>
                        </div>

                        {/* ResearchGate */}
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">ResearchGate</h3>
                                <p className="text-gray-700">
                                    ResearchGate indexing enhances the visibility and accessibility of research by making publications discoverable through its platform and external search engines, providing researchers with valuable metrics and networking opportunities to promote their work effectively.
                                </p>
                            </div>
                            <img src={ResearchGateLogo} alt="ResearchGate" className="w-32 h-auto ml-4"/>
                        </div>
                    </div>
                </main>
            </div>
            <ImageGallery/>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Indexing;
