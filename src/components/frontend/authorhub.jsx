import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import Guidelines from "../../assets/guidelines.png";
import Discoverable from "../../assets/discoverable.png";
import Coverletter from "../../assets/cover-letter.png";
import Copyright from "../../assets/copyright.png";
import Callforpaper from "../../assets/call-for-paper.png";
import Articletemp from "../../assets/article-template.png";

import ImageGallery from "../frontend/Image";

const AuthorHub = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    // Icons Data (Now using actual imported images)
    const icons = [
        { src: Guidelines, label: "Author Guide Lines" },
        { src: Discoverable, label: "How to make Your Article More Discoverable" },
        { src: Coverletter, label: "Covering Letter" },
        { src: Copyright, label: "Copyright and Permissions" },
        { src: Callforpaper, label: "Call For Paper September - 2021 ISSUE" },
        { src: Articletemp, label: "Template" },
    ];

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

                    {/* Page Header */}
                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        PRJ Author Hub
                    </div>

                    <p className="text-gray-600 text-center mb-6">
                        Get your research published, discovered, and cited.
                    </p>

                    {/* Icons Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        {icons.map((item, index) => (
                            <div key={index} className="flex flex-col items-center p-4 shadow-md border rounded-lg text-center">
                                <img src={item.src} alt={item.label} className="w-16 h-16 mb-2" />
                                <p className="text-gray-800 font-semibold">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                        {/* How to Promote Your Paper */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">How to promote your paper?</h2>
                            <p className="text-gray-700">
                                You don't have to wait for your paper to be published to start preparing the ground for its success.
                                From writing an excellent abstract, to press releases and social media, the possibilities are endless!
                            </p>
                            <p className="text-gray-700">
                                Of course, PRJ will play its part in promoting your paper, however, you can also take charge
                                of some activities that can really make a difference.
                            </p>
                        </div>

                        {/* What will PRJ do? */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">What will PRJ do?</h2>
                            <ul className="list-disc pl-5 text-gray-700">
                                <li>When you publish your research, you can share it on social media from the article page.</li>
                                <li>Stand-out work will be selected for press releases, and editors will choose certain articles to be visible directly on the homepage of the journal.</li>
                                <li>Some authors will be asked for a podcast or video interview about their work; these multimedia channels are a gripping way to promote your paper and work well on social media and other digital platforms.</li>
                                <li>While we can't individually promote every published article, many papers are shared on our social media accounts and in other forms of content marketing such as emails or blog posts.</li>
                            </ul>
                        </div>

                        {/* What can you do? */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">What can you do?</h2>
                            <p className="text-gray-700">
                                Here are a few outlets and tools to get you started — remember that getting more deeply involved
                                in your field's online communities will help you find the most relevant and impactful outputs for your work.
                            </p>
                        </div>

                        {/* Making Your Article More Discoverable */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Making Your Article More Discoverable</h2>
                            <p className="text-gray-700">
                                How can Search Engine Optimization (SEO) help more people find my article online? Did you know that
                                more than 54% of online traffic to your articles comes from search engines?
                            </p>
                            <p className="text-gray-700">
                                The web is often the first port of call for people trying to find information on any given topic,
                                and search engines are the primary gateway to that information. As the volume of published work increases year
                                on year, it is more important than ever to engage with SEO so that your work is easily discoverable by your audience.
                            </p>
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

export default AuthorHub;