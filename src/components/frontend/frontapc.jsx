import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";

const Frontapc = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    const [apcData, setApcData] = useState([]);
    const [journals, setJournals] = useState({});

    // Fetch APC data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/apc")
            .then((response) => response.json())
            .then((data) => setApcData(data))
            .catch((error) => console.error("Error fetching APC data:", error));
    }, []);

    // Fetch journal data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/journals")
            .then((response) => response.json())
            .then((data) => {
                const journalMap = {};
                data.forEach((journal) => {
                    journalMap[journal.id] = journal;
                });
                setJournals(journalMap);
            })
            .catch((error) => console.error("Error fetching journal data:", error));
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <HomeNavbar />
            <MenuBar />

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
                                <span className="capitalize">{segment.replace("-", " ")}</span>
                            </span>
                        ))}
                    </div>

                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        Article Processing Charges (APC)
                    </div>

                    <p className="text-gray-700 mb-4">
                        PRJ Publication Journals are Open Access journals accessible for free on the Internet.
                        At PRJ Publication, we guarantee that no university library or individual reader will ever
                        have to buy a subscription or pay pay-per-view fees to access articles in the electronic version
                        of the journal. Instead, authors pay an Article Processing Charge (APC) once their manuscript
                        is accepted.
                    </p>
                    <p className="text-gray-700 mb-4">
                        These charges cover the cost of maintaining the publication infrastructure, website, manuscript
                        peer review, editing, and archiving. This ensures that every published article is freely available
                        to all interested readers.
                    </p>


                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full border-separate border-spacing-0 border border-gray-300">
                            <thead>
                                <tr className="bg-blue-500 text-white text-left">
                                    <th className="p-3 border border-gray-300">S.NO</th>
                                    <th className="p-3 border border-gray-300">NAME OF THE JOURNAL</th>
                                    <th className="p-3 border border-gray-300">INDEXING DETAILS</th>
                                    <th className="p-3 border border-gray-300">APC FOR INDIAN AUTHORS (Rs)</th>
                                    <th className="p-3 border border-gray-300">APC FOR FOREIGN AUTHORS (USD)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {apcData.length > 0 ? (
                                    apcData.map((apc, index) => {
                                        const journal = journals[apc.journalId] || {};
                                        const apcPriceSplit = apc.apcPrice ? apc.apcPrice.split(" / ") : ["N/A", "N/A"];

                                        return (
                                            <tr key={index} className="bg-white hover:bg-gray-100">
                                                <td className="p-3 border border-gray-300">{index + 1}</td>
                                                <td className="p-3 border border-gray-300 text-blue-500 underline">
                                                    <Link to={`/journals/${journal.abbrevation}/${journal.id}`}>
                                                        {journal.journalName} ({journal.abbrevation}) ({journal.id})
                                                    </Link>
                                                </td>
                                                <td className="p-3 border border-gray-300">{apc.indexing2 || "N/A"}</td>
                                                <td className="p-3 border border-gray-300 text-center">{apcPriceSplit[0]}</td>
                                                <td className="p-3 border border-gray-300 text-center">{apcPriceSplit[1]}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4">
                                            No APC data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <ImageGallery />

            <Footer />
        </div>
    );
};

export default Frontapc;