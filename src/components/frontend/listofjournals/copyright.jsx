import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";

import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";
import copyrightImage from "../../../assets/copyright.jpg";

function themecopyright() {

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


                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Copyright</div>
                    <div className="flex justify-between items-center mb-6">
                        <img src={copyrightImage} alt="copyright" className="h-20 md:h-32" />
                    </div>
                    <div class='bg-blue-400 rounded p-3 text-lg'>
                        The authors' publications in QIT Press are distributed under Creative Commons Attribution (CC BY) license (http://creativecommons.org/licenses/by/4.0/). The license was developed to facilitate open access, namely, free immediate access to and unrestricted reuse of original works of all types.
                    </div>

                    <ul className="list-disc pt-3 list-inside text-lg text-gray-700 space-y-2">
                        <li> Our research is freely available to all, from the time of publication. No subscription required.</li>
                        <li> Under this license, authors retain ownership of the copyright for their publications, but grant QIT Press a non-exclusive license to publish the work in paper form and allow anyone to reuse, distribute and reproduce the content as long as the original work is properly cited.</li>
                        <li> Appropriate attribution can be provided by simply citing the original work. No permission is required from the authors or the publishers. For any reuse or distribution of a work, users must also make clear the license terms under which the work was published.</li>
                        <li>  The standard license will be applied to the authors' publications, which ensures the publications freely and openly available in perpetuity.</li>


                    </ul>
                </main>
            </div>

            <Footer />

        </>)
}
export default themecopyright;