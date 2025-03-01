// import HomeNavbar from "../frontend/navbar";
// import MenuBar from "../frontend/menubar";

// import Footer from "../frontend/footer";
// import JournalNavbar from "../frontend/JournalNavbar";
// import Sidebar from "../frontend/sidebar";


// function archive() {

//     return (
//         <>

//             <HomeNavbar />
//             <MenuBar />
//             <JournalNavbar />
//             <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
//                 {/* Sidebar on Left */}
//                 <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
//                     <Sidebar />
//                 </aside>


//                 {/* Main Content */}
//                 <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">


//                     <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Archive</div>


//                 </main>
//             </div>

//             <Footer />

//         </>)
// }
// export default archive;


import React, { useState } from 'react';
import HomeNavbar from '../../frontend/navbar';
import MenuBar from '../../frontend/menubar';
import JournalNavbar from '../../frontend/JournalNavbar';
import Footer from '../../frontend/footer';
import Sidebar from '../listofjournals/archivesidebar';
import ArchiveMainContent from '../listofjournals/archivemaincontent'; // example name

function Archive() {
    // Keep track of which issue the user clicked in the sidebar
    const [selectedIssue, setSelectedIssue] = useState(null);

    return (
        <>
            <HomeNavbar />
            <MenuBar />
            <JournalNavbar />

            {/* Main Layout */}
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* Sidebar on Left */}
                <aside className="w-1/3 bg-white p-2 rounded-lg shadow-sm">
                    <Sidebar onSelectIssue={setSelectedIssue} />
                </aside>

                {/* Main Content on Right */}
                <main className="w-2/3 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    <ArchiveMainContent selectedIssue={selectedIssue} />
                </main>
            </div>
            {console.log(selectedIssue)}
            <Footer />
        </>
    );
}

export default Archive;
