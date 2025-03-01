import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";

import Footer from "../../frontend/footer";
import JournalNavbar from "../../frontend/JournalNavbar";
import Sidebar from "../../frontend/sidebar";


function reviewpolicy() {

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


                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">reviewpolicy</div>
                    

                </main>
            </div>

            <Footer />

        </>)
}
export default reviewpolicy;