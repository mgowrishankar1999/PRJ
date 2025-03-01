import React from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import SidebarList from "../../frontend/sidebar";
import Footer from "../../frontend/footer";
import publicationImage from "../../../assets/publicationethics.jpg";
import ImageGallery from "../Image";


const Publication = () => {
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
                <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
                    <SidebarList />
                </aside>


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

                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">publication</div>
                    <div className="flex justify-between items-center mb-6">
                        <img src={publicationImage} alt="publication" className="h-20 md:h-32" />
                    </div>

                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        For all parties involved in the process of publishing (authors, Editorial Board, and reviewers), it is necessary to agree upon standards of expected ethical behavior. To guarantee high ethical standards, QIT PRESS has developed international standards for all the parties. QIT PRESS expects all the parties to commit to these standards.
                    </p>

                    <div className="text-2xl font-semibold text-blue-400 mt-6">International Standards for Authors:</div>

                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        QIT PRESS does not require all authors of a research paper to sign a letter of submission, nor does it impose an order on the list of authors. All authors who submit to QIT PRESS are supposed to observe the international standards for authors voluntarily.
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li>Authors must certify that their manuscripts are their original work. Plagiarism, Duplicate, Data Fabrication and Falsification, and Redundant Publications are forbidden.</li>
                        <li>  Authors must certify that the manuscript has not previously been published and is not currently being considered for publication elsewhere.</li>
                        <li> If the authors have used the work and/or words of others, the authors must ensure that the work and/or words of others are appropriately cited or quoted and identify all sources used in the creation of their manuscripts.</li>
                        <li> When an author discovers a significant error or inaccuracy in his/her own published work, it is the author's obligation to promptly notify the Journal editor or publisher and cooperate with the editor to retract or correct the paper.</li>
                        <li>  Authors must notify QIT PRESS of any conflicts of interest.</li>

                    </ul>
                    <div className="text-2xl font-semibold text-blue-400 mt-6">International Standards for Editorial Board:</div>
                    <p>Editors and Editorial Board are required to follow the international standards for Editorial Board:</p>

                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li> The Editorial Board must keep information pertaining to all submitted manuscripts confidential.</li>
                        <li>   The Editorial Board is responsible for making publication decisions for submitted manuscripts.</li>
                        <li>The Editorial Board must strive to meet the needs of readers and authors.</li>
                        <li> The Editorial Board must evaluate manuscripts only for their intellectual content.The Editorial Board must strive to constantly improve their journals.</li>
                        <li>   The Editorial Board must maintain the integrity of the academic record.</li>
                        <li>   The Editorial Board must disclose any conflicts of interest and preclude business needs from compromising intellectual and ethical standards.</li>
                        <li>  The Editorial Board must always be willing to publish corrections, clarifications, retractions and apologies when needed.</li>

                    </ul>
                    <div className="text-2xl font-semibold text-blue-400 mt-6">International Standards for Reviewers:</div>
                    <p>Reviewers of QIT PRESS are also expected to meet the international standards for reviewers when they accept review invitations.</p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li>  Reviewers must keep information pertaining to the manuscript confidential.</li>
                        <li>  Reviewers must bring to the attention of the Editor Board any information that may be a reason to reject publication of a manuscript.</li>
                        <li>Reviewers must evaluate manuscripts only for their intellectual content.</li>
                        <li>  Reviewers must objectively evaluate the manuscripts based only on their originality, significance and relevance to the domains of the journal.</li>
                        <li>   Reviewers must notify QIT PRESS of any conflicts of interest.</li>
                    </ul>
                </main>
            </div>
            <ImageGallery/>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Publication;