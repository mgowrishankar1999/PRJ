import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";
import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";


function indexing() {

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


                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">indexing</div>

                    <p className="text-2xl font-semibold text-gray-800 leading-relaxed mb-2">
                        Abstracting, Indexing, other related databases, catalogue, reference citation etc.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        A dedicated journal indexing team is working to include all of our journals in reputed indexing services or journal evaluation services or catalogue or reference citations, etc.
                        <span class='text-lg text-gray-800 leading-relaxed mb-3 font-semibold '> Authors should cross-check the authenticity of claims of indexing before submitting to any publisher (including our journal). We strongly encourage authors to take 'informed decision' before submission of any manuscript. In order to help the authors to take 'informed decision', we are providing web-links/proofs beside most of our claims of indexing or journal evaluation services. In addition, authors should visit the official site of the indexing organization or journal evaluation services before submitting any manuscript. We hope scholarly communities will appreciate our efforts to maintain integrity and transparency. </span>
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>Google Scholar</p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>Academia</p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>DOI</p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>SSRN</p>
                </main>
            </div>

            <Footer />

        </>)
}
export default indexing;