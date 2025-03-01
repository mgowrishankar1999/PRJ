import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";

import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";
import plagiarismImage from "../../../assets/Plagiarism.jpg";

function themeeplagiarism() {

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


                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Plagiarism</div>
                    <div className="flex justify-between items-center mb-6">
                        <img src={plagiarismImage} alt="Plagiarism" className="h-20 md:h-32" />
                    </div>
                    <div className="text-2xl font-semibold text-blue-400 mt-6">What is Plagiarism?</div>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Plagiarism is the "wrongful appropriation" and "stealing and publication" of another author's "language, thoughts, ideas, or expressions" and the representation of them as one's own original work. Plagiarism is considered academic dishonesty and a breach of journalistic ethics. It is subject to sanctions like penalties, suspension, and even expulsion.

                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        The editors of QIT Press take a very serious stance against any evidence of plagiarism including self-plagiarism in manuscripts submitted to them. Every reasonable effort will be made to investigate any allegations of plagiarism brought to their attention, as well as instances that come up during the peer review process.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        QIT Press does not encourage any form of Plagiarism and duplicate submissions. Hence, we strongly recommend our authors to thorough check of the article content before submitting it to our Journals for publication. We request our Authors to use "Plagiarism Checking software’s" to check plagiarism prior to submission as a preliminary step, although they are not completely reliable.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        QIT Press will check plagiarism for all the submitted articles before publishing online. If the plagiarism is observed by editors, peer reviewers or by editorial staff at any stage of publication process, it could be rejected based on the percentile of plagiarism occurred and it would be notified to author.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Similarity Check is a multi-publisher initiative to screen published and submitted content for originality. QIT Press uses the iThenticate software to detect instances of overlapping and similar text in submitted manuscripts.
                    </p>

                    <div className="text-2xl font-semibold text-blue-400 mt-6">Self-Archiving Policy</div>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Authors of articles published in any of our journals are permitted to self-archive the submitted (preprint) and accepted (peer-reviewed) version of the article at any time. There is no embargo period. At QIT Press, we strongly believe that self-archiving makes research to be widely “visible, accessible, harvestable, searchable, and useable,” thus increasing its reach and impact, and possibly the number of citations it receives.
                    </p>
                    <div className="text-2xl font-semibold text-black-700 mt-6">The submitted version may be placed on:</div>
                    <ul className="list-disc list-inside text-lg text-gray-600 pl-6">
                        <li>The author's personal website</li>
                        <li>Social Media like Facebook, Twitter, Instagram, Blog, etc.</li>
                        <li>The author's company/institutional repository or archive</li>
                        <li>Share in subject-based preprint servers or repositories</li>

                    </ul>

                </main>
            </div>

            <Footer />

        </>)
}
export default themeeplagiarism;