// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // import HomeNavbar from "../../frontend/navbar";
// // import MenuBar from "../../frontend/menubar";

// // import Footer from "../../frontend/footer";
// // import JournalNavbar from "../JournalNavbar";
// // import Sidebar from "../../frontend/sidebar";

// // function JournalsCategory() {
// //     const { id } = useParams(); // e.g. discipline ID from the route
// //     console.log(id)
// //     const [journals, setJournals] = useState([]);

// //     useEffect(() => {
// //         fetch("http://192.168.1.13:8080/api/journals")
// //             .then((response) => response.json())
// //             .then((data) => setJournals(data))
// //             .catch((error) => console.error("Error fetching data:", error));
// //     }, []);
// //     /**
// //      * Convert `id` from string to number (if the disciplineId is numeric).
// //      * Then filter out only the journals that match this disciplineId.
// //      */
// //     const disciplineIdNum = parseInt(id, 10);
// //     const filteredJournals = journals.filter(
// //         (journal) => {journal.disciplineId === disciplineIdNum}
// //     );
// //     console.log(filteredJournals)
// //     return (
// //         <>
// //             <HomeNavbar />
// //             <MenuBar />
// //             <JournalNavbar />
// //             <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
// //                 {/* Sidebar on Left */}
// //                 <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
// //                     <Sidebar />
// //                 </aside>


// //                 {/* Main Content */}
// //                 <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">
// //                     <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">faq</div>
// //                 </main>
// //             </div>

// //             <Footer />
// //             <h1>Journals Category</h1>

// //             <p>This is the category with discipline ID: {id}</p>

// //             <h2>Matching Journals</h2>
// //             {filteredJournals.length > 0 ? (
// //                 filteredJournals.map((journal) => (
// //                     <div key={journal.id} style={{ marginBottom: "1rem" }}>
// //                         <h1><strong>Journal Name:</strong> {journal.journalName}</h1>
// //                         {/* If needed, display more info about each journal */}
// //                     </div>
// //                 ))
// //             ) : (
// //                 <p>No journals found for this discipline ID.</p>
// //             )}
// //         </>
// //     );
// // }

// // export default JournalsCategory;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import HomeNavbar from "../../frontend/navbar";
// import MenuBar from "../../frontend/menubar";
// import Footer from "../../frontend/footer";
// import JournalNavbar from "../JournalNavbar";
// import Sidebar from "../../frontend/sidebar";

// function JournalsCategory() {
//     const { id } = useParams(); // Get discipline ID from URL
//     console.log("Discipline ID from URL:", id);

//     const [journals, setJournals] = useState([]);
//     const [disciplineName, setDisciplineName] = useState("Loading...");

//     // ✅ Fetch Journals
//     useEffect(() => {
//         fetch("http://192.168.1.13:8080/api/journals")
//             .then((response) => response.json())
//             .then((data) => {
//                 setJournals(data);
//                 console.log("Fetched Journals:", data);
//             })
//             .catch((error) => console.error("Error fetching journals:", error));
//     }, []);

//     // ✅ Fetch Disciplines & Get Name
//     useEffect(() => {
//         fetch("http://192.168.1.13:8080/api/disciplines")
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Fetched Disciplines:", data);
//                 const foundDiscipline = data.find(discipline => Number(discipline.id) === Number(id));
//                 setDisciplineName(foundDiscipline ? foundDiscipline.name : "Unknown Discipline");
//             })
//             .catch((error) => console.error("Error fetching disciplines:", error));
//     }, [id]);

//     // ✅ Convert ID properly
//     const disciplineIdNum = isNaN(parseInt(id, 10)) ? null : parseInt(id, 10);

//     // ✅ Filter journals by discipline ID
//     const filteredJournals = journals.filter(journal => Number(journal.disciplineId) === disciplineIdNum);

//     console.log("Filtered Journals:", filteredJournals);

//     return (
//         <>
//             <HomeNavbar />
//             <MenuBar />
//             <JournalNavbar />
//             <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
//                 {/* Sidebar */}
//                 <aside className="w-1/4 bg-white p-2 rounded-lg shadow-sm">
//                     <Sidebar />
//                 </aside>

//                 {/* Main Content */}
//                 <main className="w-3/4 bg-white p-8 shadow-sm flex flex-col rounded-lg">
//                     {/* ✅ Discipline Name & Journal Count */}
//                     <div className="text-2xl font-bold uppercase mb-4">
//                         {disciplineName} ({filteredJournals.length})
//                     </div>

//                     {/* ✅ Journal List */}
//                     {filteredJournals.length > 0 ? (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                             {filteredJournals.map((journal) => (
//                                 <div key={journal.id} className="border-b border-gray-300 px-4 py-2 hover:bg-gray-100">
//                                     <a 
//                                         href={`/journal/${journal.id}`} 
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         QIT Press - {journal.journalName} ({journal.abbrevation})
//                                     </a>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p>No journals found for this discipline ID.</p>
//                     )}
//                 </main>
//             </div>

//             <Footer />
//         </>
//     );
// }

// export default JournalsCategory;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";

function JournalsCategory() {
    const { id } = useParams(); // Get discipline ID from URL
    console.log("Discipline ID from URL:", id);

    const [journals, setJournals] = useState([]);
    const [disciplineName, setDisciplineName] = useState("Loading...");

    // ✅ Fetch Journals
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/journals")
            .then((response) => response.json())
            .then((data) => {
                setJournals(data);
                console.log("Fetched Journals:", data);
            })
            .catch((error) => console.error("Error fetching journals:", error));
    }, []);

    // ✅ Fetch Disciplines & Get Name
    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/disciplines")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Disciplines:", data);
                const foundDiscipline = data.find(discipline => Number(discipline.id) === Number(id));
                setDisciplineName(foundDiscipline ? foundDiscipline.name : "Unknown Discipline");
            })
            .catch((error) => console.error("Error fetching disciplines:", error));
    }, [id]);

    // ✅ Convert ID properly
    const disciplineIdNum = isNaN(parseInt(id, 10)) ? null : parseInt(id, 10);

    // ✅ Filter journals by discipline ID
    const filteredJournals = journals.filter(journal => Number(journal.disciplineId) === disciplineIdNum);

    console.log("Filtered Journals:", filteredJournals);

    return (
        <>
            <HomeNavbar />
            <MenuBar />
            <JournalNavbar />
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* Sidebar */}
                <aside className="w-1/4 bg-white p-2 rounded-lg shadow-sm">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="w-3/4 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    {/* ✅ Discipline Name & Journal Count */}
                    <div className="text-2xl font-bold uppercase mb-4">
                        {disciplineName} ({filteredJournals.length})
                    </div>

                    {/* ✅ Journal List with <Link> */}
                    {filteredJournals.length > 0 ? (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            {filteredJournals.map((journal) => (
                                <div key={journal.id} className="border-b border-gray-300 px-4 py-2 hover:bg-gray-100">
                                    <Link
                                        to={`/journals/${journal.abbrevation}/${journal.id}`}
                                        className="text-blue-600 hover:text-blue-800 hover:underline text-lg"
                                    >
                                        QIT Press - {journal.journalName} ({journal.abbrevation})
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No journals found for this discipline ID.</p>
                    )}
                </main>
            </div>

            <Footer />
        </>
    );
}

export default JournalsCategory;


