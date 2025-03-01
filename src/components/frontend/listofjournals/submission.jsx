import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";

import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";
import copyrightImage from "../../../assets/copyright.jpg";

function themesubmission() {

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


                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Submission Guidelines for QIT Press Journal</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        QIT Press Journal publishes high-quality, peer-reviewed research articles, reviews, and case studies across a wide range of interdisciplinary fields, including but not limited to quantum information technology, computational science, engineering, and applied physics. Submissions should provide original insights, contribute to the existing body of knowledge, and adhere to the highest standards of academic rigor.
                    </p>

                    <div className="text-3xl font-semibold text-blue-400 mt-6">Manuscript Preparation</div>
                    <div className="text-2xl font-semibold  mt-6">1. Language</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        All submissions must be written in clear, concise English. Non-native speakers are encouraged to seek professional editing services prior to submission.
                    </p>
                    <div className="text-2xl font-semibold  mt-6">2. File Format</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        Manuscripts must be submitted in Microsoft Word (.docx) format only. A PDF version should also be included for reference.
                    </p>
                    <div className="text-2xl font-semibold  mt-6">3. Article Structure</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        <span class='font-semibold text-lg '>Title Page: </span>
                        Include a concise and informative title, author names, affiliations, and corresponding author details (email and phone number).
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        <span class='font-semibold text-lg '> Abstract: </span>
                        A structured abstract (250–300 words) summarizing the research aims, methodology, key findings, and significance.
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        <span class='font-semibold text-lg '>Keywords: </span>
                        Provide 4–6 relevant keywords.
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-0'>
                        <span class='font-semibold text-lg '>Main Text : </span>
                        Use the following  structure:
                    </p>

                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        Introduction<br></br>
                        Materials and Methods (or equivalent methodology section)<br></br>
                        Results<br></br>
                        Discussion<br></br>
                        Conclusion
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        <span class='font-semibold text-lg '>Acknowledgments: </span>
                        Optional but encouraged.
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        <span class='font-semibold text-lg '>References: </span>
                        Follow the referencing style outlined below.
                    </p>

                    <div className="text-2xl font-semibold  mt-6">4. Formatting</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        Use 12-point Times New Roman font, double-spaced text, and 1-inch margins. Figures and tables should be embedded in the manuscript, with captions provided below each figure or table. Number all sections, figures, and tables consecutively.
                    </p>

                    <div className="text-3xl font-semibold text-blue-400 my-3 ">Referencing Style</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        QIT Press Journal follows the APA referencing style. All in-text citations and bibliographic entries must comply with this format. For example:
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        In-text citation: (Author, Year) or Author (Year) <br></br>
                        Bibliography entry: Author, A. A., & Author, B. B. (Year). Title of the article. Journal Name, Volume(Issue), Pages. https://doi.org/XXXXXX
                    </p>
                    <div className="text-3xl font-semibold text-blue-400 my-3 ">Submission Process</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        <span class='font-semibold text-lg '>Submission Email: </span>
                        Manuscripts should be emailed to the Editorial Office at  <a href="editor@qitpress.com">editor@qitpress.com </a>. editor@qitpress.com with the subject line: Submission: [Your Article Title].
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-0'>
                        <span class='font-semibold text-lg '>Attachments: </span>
                        Attach the following files to your email:
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        Manuscript file (Word) <br></br>
                        PDF version of the manuscript<br></br>
                        Supplementary files (if applicable, e.g., raw data, multimedia)
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-0'>
                        <span class='font-semibold text-lg '>Cover Letter: </span>
                        Include a cover letter that briefly summarizes the significance of your work, its novelty, and how it aligns with the scope of the journal.
                    </p>
                    <div className="text-3xl font-semibold text-blue-400 my-3 ">Peer Review Process</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        All manuscripts will undergo a double-blind peer review. Authors should anonymize their manuscripts by removing identifying information prior to submission. The review process typically takes 6–8 weeks, after which authors will receive one of the following decisions:
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        Accepted <br></br>
                        Minor Revisions<br></br>
                        Major Revisions<br></br>
                        Rejected
                    </p>
                    <div className="text-3xl font-semibold text-blue-400 my-3 ">Copyright and Open Access</div>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        Upon acceptance, authors must sign a copyright agreement. QIT Press Journal supports open access under a Creative Commons license, allowing free dissemination of published research.
                    </p>
                    <p class='text-lg text-gray-800 leading-relaxed mb-3'>
                        For additional queries, please contact the Editorial Office at <a href="editor@qitpress.com">editor@qitpress.com </a>
                    </p>
                </main>
            </div>

            <Footer />

        </>)
}
export default themesubmission;