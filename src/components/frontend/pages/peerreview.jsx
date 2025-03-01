import React from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import SidebarList from "../../frontend/sidebar";
import Footer from "../../frontend/footer";
import peerreview from "../../../assets/peerreview.jpg";
import ImageGallery from "../Image";


const Peerreview = () => {
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

                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">PeerReview</div>
                    <div className="flex justify-between items-center mb-6">
                        <img src={peerreview} alt="Benefits" className="h-20 md:h-32" />
                    </div>

                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Peer-review is the system used by PRJ PRESS to assess the quality of a manuscript before it is published. Qualified researchers in the relevant research area assess submitted manuscripts for originality, validity and significance to help editors determine whether the manuscript should be published or not.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        PRJ PRESS Operates Single-blind peer-review system, where the reviewers of the paper won't get to know the identity of the author(s), and the author(s) won't get to know the identity of the reviewer. The advantage of Single-blind peer review is that it eliminates bias.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Manuscripts submitted to this journal will generally be reviewed by one or more experts who will be required to evaluate whether the manuscript is scientifically sound and coherent, whether it duplicates already published work, and whether or not the manuscript is sufficiently clear for publication. The Editors will reach a decision based on these reports and, where necessary, they will consult with members of the Editorial Board.

                    </p>
                    <div className="text-2xl font-semibold text-blue-400 mt-6">Peer Review Process</div>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                    When we receive an article for publication, it is checked by the journal’s editorial office to ensure that the files are in order. After this is done, the manuscript is assigned to one or more reviewers on the basis of their subject expertise. Based on the reports of the reviewers, our editor makes the decision to accept, reject or subject the article to further revisions.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                    Once the manuscript is finally accepted, the article would need to undergo final check by the journal editorial office. After this, the author would be notified of the acceptance of their articles. Galley proofs are sent to the corresponding authors who are expected to read and correct any typographical or grammatical errors. Once proofs are returned by authors to the editorial office, an invoice is sent to the corresponding author. After we received payment for the article, the manuscript is usually included in the next issue of the journal. As soon as the article is published on the journal’s website, a publication notification is sent to the corresponding author with links to the issue and article.
                    </p>

                </main>
            </div>
            <ImageGallery/>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Peerreview;