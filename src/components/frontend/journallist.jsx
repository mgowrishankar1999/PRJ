import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";


const Journallist = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').filter(Boolean);

    // State for journals and disciplines
    const [journals, setJournals] = useState([]);
    const [disciplines, setDisciplines] = useState({});
    const navigate = useNavigate();

    // Fetch Journal Data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/journals")
            .then(response => response.json())
            // .then(data => setJournals(data))
            .then(data => {
                setJournals(data);
                localStorage.setItem("journals", JSON.stringify(data)); // Store in localStorage
            })
            .catch(error => console.error("Error fetching journal data:", error));
    }, []);

    // Fetch Discipline Data
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/disciplines")
            .then(response => response.json())
            .then(data => {
                const disciplineMap = {};
                data.forEach(discipline => {
                    disciplineMap[discipline.id] = discipline.name;
                });
                setDisciplines(disciplineMap);
            })
            .catch(error => console.error("Error fetching discipline data:", error));
    }, []);

    // Group Journals by Discipline
    const groupedJournals = journals.reduce((acc, journal) => {
        const disciplineName = disciplines[journal.disciplineId] || "Unknown Discipline";
        if (!acc[disciplineName]) {
            acc[disciplineName] = [];
        }
        acc[disciplineName].push(journal);
        return acc;
    }, {});

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar and Menu */}
            <HomeNavbar />
            <MenuBar />

            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* Sidebar */}
                {/* <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                </aside> */}

                <div class='flex flex-col'>


                    <aside className="w-[25vw] bg-white p-2 rounded-lg shadow-sm">
                        <SidebarList />
                    </aside>
                    <div class='flex flex-col my-3 gap-2 shadow-md font-medium   text-xl '>

                        <button class=' bg-blue-500 hover:bg-blue-600 h-[45px] text-white rounded  '>Submit a Manuscript</button>
                        <button onClick={() => navigate('/join_us')} class=' bg-blue-500 hover:bg-blue-600 h-[45px] text-white rounded'>Join Editorial Board</button>
                    </div>
                </div>

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
                        Journals
                    </div>

                    {/* Display Journals Grouped by Discipline */}
                    <div className="space-y-8">
                        {Object.entries(groupedJournals).map(([discipline, journals], index) => (
                            <div key={index}>
                                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
                                    {discipline} ({journals.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {journals.map((journal) => (
                                        <Link
                                            key={journal.id}
                                            to={`/journals/${journal.abbrevation}/${journal.id}`}
                                            className="block border rounded-lg p-3 text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            {journal.journalName} ({journal.abbrevation})
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <ImageGallery />
            <Footer />
        </div>
    );
};

export default Journallist;
