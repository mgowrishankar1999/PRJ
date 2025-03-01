import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";

import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";

function JournalsCategory() {
    const { id } = useParams(); // e.g. discipline ID from the route
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/journals")
            .then((response) => response.json())
            .then((data) => setJournals(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    /**
     * Convert `id` from string to number (if the disciplineId is numeric).
     * Then filter out only the journals that match this disciplineId.
     */
    const disciplineIdNum = parseInt(id, 10);
    const filteredJournals = journals.filter(
        (journal) => journal.disciplineId === disciplineIdNum
    );
    return (
        <>
            <HomeNavbar />
            <MenuBar />
            <JournalNavbar />
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
                {/* Sidebar on Left */}
                <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
                    <Sidebar />
                </aside>


                {/* Main Content */}
                <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">
                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">faq</div>
                </main>
            </div>

            <Footer />
            <h1>Journals Category</h1>

            <p>This is the category with discipline ID: {id}</p>

            <h2>Matching Journals</h2>
            {filteredJournals.length > 0 ? (
                filteredJournals.map((journal) => (
                    <div key={journal.id} style={{ marginBottom: "1rem" }}>
                        <p><strong>Journal Name:</strong> {journal.journalName}</p>
                        {/* If needed, display more info about each journal */}
                    </div>
                ))
            ) : (
                <p>No journals found for this discipline ID.</p>
            )}
        </>
    );
}

export default JournalsCategory;
