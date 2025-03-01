    import React, { useEffect, useState } from "react";
    import { Link, useLocation } from "react-router-dom";
    import HomeNavbar from "./navbar";
    import MenuBar from "./menubar";
    import SidebarList from "./sidebar";
    import Footer from "./footer";
import ImageGallery from "./Image";

    const Subscription = () => {
        const location = useLocation();
        const currentPath = location.pathname.split("/").filter(Boolean);

        // State for subscriptions and journals
        const [subscriptions, setSubscriptions] = useState([]);
        const [journals, setJournals] = useState({});

        // Fetch subscription data
        useEffect(() => {
            fetch("http://192.168.1.13:8080/api/journalsubscription")
                .then((response) => response.json())
                .then((data) => {
                    setSubscriptions(data);
                })
                .catch((error) => console.error("Error fetching subscription data:", error));
        }, []);

        // Fetch journal data
        useEffect(() => {
            fetch("http://192.168.1.13:8080/api/journals")
                .then((response) => response.json())
                .then((data) => {
                    // Convert array to object for easy lookup
                    const journalMap = {};
                    data.forEach((journal) => {
                        journalMap[journal.id] = journal; // Store journal details with ID as key
                    });
                    setJournals(journalMap);
                })
                .catch((error) => console.error("Error fetching journal data:", error));
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

                        {/* Subscription Header */}
                        <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                            Subscription Information
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-4">
                            All journals published by QIT Press are open access and accessible for free on the Internet.
                            QIT Press defrays subscription charges only for its printed version. Following are the subscription
                            rates in INR for all QIT Press journals. Click the journal title for more details.
                        </p>

                        {/* Download Button */}
                        <div className="mb-4 flex justify-end ">
                            <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors duration-300">
                                Download
                            </button>
                        </div>

                        {/* Subscription Table */}
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full border-separate border-spacing-0 border border-gray-300">
                                {/* Table Header */}
                                <thead>
                                    <tr className="bg-blue-500 text-white text-left">
                                        <th className="p-3 border border-gray-300">Journal Name</th>
                                        <th className="p-3 border border-gray-300">Period Of Subscription</th>
                                        <th className="p-3 border border-gray-300">Number of Issues / Year</th>
                                        <th className="p-3 border border-gray-300">Price INR</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {subscriptions.length > 0 ? (
                                        subscriptions.map((subscription, index) => {
                                            const journal = journals[subscription.journalId] || {};
                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-100">
                                                    <td className="p-3 border border-gray-300 text-blue-500 underline cursor-pointer">
                                                        {journal.journalName} ({journal.abbrevation})
                                                    </td>
                                                    <td className="p-3 border border-gray-300">{subscription.periodSubscription}</td>
                                                    <td className="p-3 border border-gray-300 text-center">{subscription.issuesPerYear}</td>
                                                    <td className="p-3 border border-gray-300 text-center">{subscription.amount}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center p-4">
                                                No subscription data available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
                <ImageGallery/>
                {/* Footer */}
                <Footer />
            </div>
        );
    };

    export default Subscription;
