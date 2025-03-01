import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import SidebarList from "../../frontend/sidebar";
import Footer from "../../frontend/footer";
import aboutImage from "../../../assets/aboutus.jpg";
import ImageGallery from "../Image";

const AboutUs = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').filter(Boolean);

    const [disciplines, setDisciplines] = useState([]);
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/disciplines")
            .then((response) => response.json())
            .then(data => setDisciplines(data))
            .catch((error) => console.error("Error fetching disciplines data:", error));

        fetch("http://192.168.1.13:8080/api/journals")
            .then((response) => response.json())
            .then(data => setJournals(data))
            .catch((error) => console.error("Error fetching journals data:", error));
    }, []);

    const getJournalCountByDiscipline = (disciplineId) => {
        return journals.filter(journal => journal.disciplineId === disciplineId).length;
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div>
                <HomeNavbar />
                <MenuBar />
            </div>
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                </aside>
                <main className="w-4/1 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    <div className="text-sm mb-2">
                        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                        {currentPath.map((segment, index) => (
                            <span key={index}>
                                <span className="mx-1">/</span>
                                <span className="capitalize">{segment.replace('-', ' ')}</span>
                            </span>
                        ))}
                    </div>

                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">About Us</div>
                    <div className="flex justify-between items-center mb-6">
                        <img src={aboutImage} alt="About Us" className="h-20 md:h-32" />
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed mb-4 font-medium text-center">
                        (PRJ) is a software development company providing IT solutions since 2010. (PRJ Press) is a part of PRJ and is a publisher of academic journals in various disciplines.
                    </p>

                    <p className="text-lg">
                        <span className="text-lg font-semibold">PRJ Press</span> is an independent international publisher of 
                        <span className="text-red-500"> 400+</span> open access, online, peer-reviewed journals covering a wide range of academic disciplines.
                    </p>
                    <p className="text-lg">
                        PRJ Press provides journal publishing service, Special Issue publishing service, and conference paper publishing service.
                    </p>
                    <p className="text-lg">
                        All research articles, review articles, case reports, and case series published in PRJ Press journals undergo full peer review by independent academic editors and reviewers.
                    </p>

                    <div className="text-2xl font-semibold text-blue-400 mt-6">QUICK PRJ Press FACTS</div>
                    <ul className="list-disc list-inside text-lg text-gray-600 pl-6">
                        <li>More than 400+ International Journals published</li>
                        <li>More than 3000 editorial board members</li>
                        <li>More than 15000 PRJ Press Members</li>
                        <li>More than 2000 Research Articles are published</li>
                        <li>PRJ Press Journals are indexed in more than 100 search engines</li>
                        <li>Indexed in www.scopedatabase.com and www.jifactor.com</li>
                    </ul>

                    <div className="text-2xl font-semibold text-blue-400 mt-6">PRJ Press Tasks</div>
                    <ul className="list-disc list-inside text-lg text-gray-600 pl-6">
                        <li>Publishes scholarly peer-reviewed research journals.</li>
                        <li>Journals are available online with full-text content freely.</li>
                        <li>Organizes conferences for researchers and scholars.</li>
                    </ul>

                    <div className="text-2xl font-semibold text-blue-400 mt-6">
                        Number of Journals Published by PRJ Press - Subject Area Wise
                    </div>
                    <p>PRJ Press journals contain 25 scientific fields. Publishing in PRJ Press journals starts with finding the right journal for your paper.</p>
                    <ul className="list-disc list-inside text-lg text-gray-600 pl-6">
                        <li>Read the aims and scope of each journal.</li>
                        <li>Submit your article to only one journal at a time.</li>
                        <li>Check the journal performance for review and publication timelines.</li>
                        <li>Read Guide for Authors.</li>
                    </ul>

                    <div className="border rounded-lg overflow-hidden mt-4">
                        <table className="w-full border-separate border-spacing-0 border border-gray-300">
                            <thead>
                                <tr className="bg-blue-500 text-white text-center border border-gray-300">
                                    <th className="p-3 border border-gray-300">S.No</th>
                                    <th className="p-3 border border-gray-300">Subject Area</th>
                                    <th className="p-3 border border-gray-300">Number of Journals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disciplines.length > 0 ? (
                                    disciplines.map((discipline, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="p-3 border border-gray-300">{index + 1}</td>
                                            <td className="p-3 border border-gray-300">{discipline.name}</td>
                                            <td className="p-3 border border-gray-300">{getJournalCountByDiscipline(discipline.id)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="p-3 text-center text-gray-500">
                                            Loading data or no disciplines available...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <ImageGallery/>
            <Footer />
        </div>
    );
};

export default AboutUs;
