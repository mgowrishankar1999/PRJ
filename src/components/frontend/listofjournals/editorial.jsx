import HomeNavbar from "../../frontend/navbar";
import MenuBar from "../../frontend/menubar";

import Footer from "../../frontend/footer";
import JournalNavbar from "../JournalNavbar";
import Sidebar from "../../frontend/sidebar";
import editorialImage from "../../../assets/editorial.jpg";

function themeeditorial() {

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
                  

                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">editorial</div>
                    <div className="flex justify-between items-center mb-6">
                        <img src={editorialImage} alt="Plagiarism" className="h-20 md:h-32" />
                    </div>
                    {/* <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-6">
            Plagiarism of Publishing with PRJ Publication
          </h1> */}
                    <span class=' text-2xl font-semibold'>Overview</span>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        This policy describes guidelines in the publication process of our journals. Specifically, Academic Journals adopts and strive to adhere to the following standards and requirements:
                    </p>
                    <span class=' text-2xl font-semibold'>Authorship</span>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">COPE - Committee on Publication Ethics</p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        An author is an individual who has significantly contributed to the development of a manuscript. QIT Press recommends that authorship be based on the following four criteria:
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Substantial contributions to the conception or design of the work; or the acquisition, analysis, or interpretation of data for the work; AND
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Drafting the work or revising it critically for important intellectual content; AND
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Final approval of the version to be published; AND
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Agreement to be accountable for all aspects of the work in ensuring that questions related to the accuracy or integrity of any part of the work are appropriately investigated and resolved.
                    </p>
                    <span class=' text-2xl font-semibold'>Acknowledgement</span>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Individuals who participated in the development of a manuscript but do not qualify as an author should be acknowledged. Organizations that provided support in terms of funding and/or other resources should also be acknowledged.
                    </p>
                    <span class=' text-2xl font-semibold'>Changes in authorship</span>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Whenever there is a need to make changes in the authorship of a manuscript or a published article, the changes will be implemented according to COPE specification. Only corresponding authors can make request for a change in authorship. Request should be made to the editor using the Changes in Authorship Form.
                    </p>
                    <span class=' text-2xl font-semibold'>Submission of Manuscript</span>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Authors should read the “Instruction for Authors” on the journal’s page before making a submission. Manuscript should be prepared according to the style and specifications of the journal’s policy.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Authors listed on the manuscript should have met the requirements for Authorship specified above. Where possible, specify the contribution of each of the authors.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        All authors should approve the final version of the manuscript prior to submission. Once a manuscript is submitted, it is therefore assumed that all authors have read and given their approval for the submission of the manuscript.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                        Contact information of all authors should be stated on the manuscript. Surname/Other names, affiliation, emails, and phone/fax numbers.
                    </p>

                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Declaration of Conflicts of Interest should be stated in the manuscript. Submission should be made online
                    </p>
                    <a href="https://qitpress.com/Online_Submission">https://qitpress.com/Online_Submission</a>.
                    <span class=' text-2xl font-semibold'>Conflict of interest</span>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        “Conflict of interest (COI) exists when there is a divergence between an individual’s private interests (competing interests) and his or her responsibilities to scientific and publishing activities such that a reasonable observer might wonder if the individual’s behavior or judgment was motivated by considerations of his or her competing interests” WAME.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Authors should disclose all financial/relevant interest that may have influenced the development of the manuscript.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Reviewers should disclose any conflict of interest and if necessary, decline the review of any manuscript they perceive to have a conflict of interest. Editors should also decline from considering any manuscript that may have conflict of interest. Such manuscripts will be re-assigned to other editors.
                    </p>
                    <span class=' text-2xl font-semibold'>Confidentiality</span>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        A submitted manuscript is a confidential material. Academic Journals will not disclose submitted manuscript to anyone except individuals who partake in the processing and preparation of the manuscript for publication (if accepted). These individuals include editorial staff, corresponding authors, potential reviewers, actual reviewers, and editors. However, in suspected cases of misconduct, a manuscript may be revealed to members of Academic Journals’ ethics committee and institutions/organizations that may require it for the resolution of the misconduct. Academic Journals shall follow the appropriate COPE flowcharts wherever necessary.
                    </p>
                    <span class=' text-2xl font-semibold'>Misconduct</span>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Misconduct constitutes violation of this editorial policy, journal policies, publication ethics, or any applicable guidelines/policies specified by COPE. Any other activities that threaten/compromise the integrity of the research/publication process are potential misconducts. Suspected cases of misconduct will be investigated according to COPE guidelines
                    </p>
                    <span class=' text-2xl font-semibold'>Correction and retraction of articles</span>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Corrections may be made to a published article with the authorization of the editor of the journal. Editors will decide the magnitude of the corrections. Minor corrections are made directly to the original article. However, in cases of major corrections, the original article will remain unchanged, while the corrected version will also be published. Both the original and corrected version will be linked to each other. A statement indicating the reason for the major change to the article will also be published. When necessary, retraction of articles will be done according to COPE retraction guidelines.
                    </p>
                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Editorial Board Responsibilities</div>

                    <span class=' text-2xl font-semibold'>Editorial Board structure</span>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        The Editorial Board of the QIT Press journals comprise of Editor-in-Chief and Editorial Board members. Editor-in-Chief remains the chairperson of the board, hence allowed to take the final decision in any regard.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        The formation of the Editorial Board is done through incorporating global experts with excellent academic track record and expertise in the respective journal subject. There is no restriction in the number of the Editorial Board members. Editorial board members must qualify the following major facts:
                    </p>

                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li> Should a Ph.D degree in the relevant subject.</li>
                        <li> Must have good publication record.</li>
                        <li>  Should hold some academic position in Universities, Research Institutes or other such organizations.</li>

                    </ul>
                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Editorial Board responsibilities</div>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                        <li>All Editorial board members must obey the direction provided by the Editor-in-Chief of the journal.</li>
                        <li>Once the plagiarism check is completed, every article will be assigned to an Editor, and if the article is in the area of the Editor’s research interest, it is expected that the assigned Editor will take up the assignment at the earliest possible time. If he or she wants to deny the assignment due to some personal reason, that should also be informed to the Editorial Office at the earliest possible convenience.</li>
                        <li>Assigned Editor should not have any conflict of interest with any assignment. If so, then he or she should decline the assignment stating the proper reason to the Editorial Office.</li>
                        <li>It is mandatory that every Editor treats each author with proper dignity, courtesy, and fair behavior, irrespective of considering the matter and fate of the article.</li>
                        <li>Honesty and transparency are a must to become an Editorial Board member, where an Editor should judge every submission equally and transparently.</li>
                        <li>The Editor-in-Chief can take the final decision for any publication-oriented issue.</li>
                        <li>If required, the Editor may provide the necessary guidelines and dictate the process of submission to the author.</li>
                        <li>The Editor should not reveal any information regarding the author, reviewer, or article information to anyone; complete confidentiality maintenance is mandatory.</li>
                        <li>The Editor should be responsible for a fast and transparent peer review process; if required, the Editor may take support from the Editorial Office.</li>
                        <li>Providing the final judgment on the articles assigned within the allotted time with proper reason and clarification should be done by the Editor.</li>
                        <li>The Editor should remember the policy of fast and effective peer review and further process; therefore, they should communicate with the reviewers or authors depending on the stage of article processing in case of any delay.</li>
                        <li>The Editor should be responsible for any query regarding reconsideration of editorial decisions and should provide the decision quickly and clearly with proper reasons. The Editor is responsible for establishing such protocol.</li>
                        <li>Once the assigned Editor is notified by the Editorial Office regarding any information at any stage of the publication process for an assigned manuscript, the Editor should respond as early as possible.</li>
                        <li>Along with the publisher, the Editorial Board members are responsible for timely publishing the accepted articles.</li>
                        <li>For any manuscript assigned, the Editor is responsible for selecting potential reviewers considering their expertise in particular subject areas and keeping monitoring the review process.</li>
                        <li>It is the Editor’s responsibility to inform the selected reviewers that they are not entitled to use any part of the work in any form provided in the article they are reviewing. Reviewers should also be informed about the complete confidentiality of the assignments they are undertaking.</li>
                        <li>Editors will be responsible for conveying the expectations of the journal to the reviewers with the review scope, quality, and timeliness for an effective, fair, and constructive review of the assigned submission.</li>
                        <li>Every Editor should keep in mind the time required for reviewing articles before sending any reminder to the reviewer so that the assigned reviewer should get the appropriate time he or she requires.</li>
                        <li>If any special issue proposal is submitted to the journal, the assigned Editorial Board member should review the proposal for suitability with the scope of the journal, timeliness, and assessing the scope and importance of the topic.</li>
                        <li>Editorial Board members may recommend timely topics and suggest potential guest Editors considering the scope, importance, and timeliness of the topic.</li>
                        <li>A Guest Editor can handle a special issue independently while maintaining regular communication with the Editorial Board member and Editorial Office.</li>
                        <li>Review special issue proposals for relevance to current research in the concerned field.</li>
                        <li>Recommend suitable proposals and their guest editors along with their biographies.</li>
                        <li>Once a proposal has been accepted by the Editorial Board members for creating a special issue, the corresponding guest editors will be responsible for handling and processing the special issue articles.</li>
                        <li>Editors may attend the Editorial Board meetings occasionally scheduled by the Editorial Office to take part in the discussion for the improvement of the Journal.</li>
                        <li>Being an integral part of the Journal, Editors are responsible for coordinating and managing critical decisions along with the cooperation of the Editorial Office, such as retraction issues or similar matters.</li>
                        <li>Being the path director of the journal, Editors are expected to inform the Journal Office regarding potential timely topics and author pools through their constant communication.</li>
                        <li>Editors should ensure the smooth functioning of the whole process in coordination with the publishing house.</li>
                        <li>Editors should provide time-to-time input regarding the targeted readers and their preferences. In other words, creative input from Editors will help in understanding the readers and their choices within the scope of the subject.</li>
                        <li>Editors should comply with the guidelines and protocols provided by the publishing house.</li>
                    </ul>

                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">Editorial Workflow</div>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Editorial or manuscript flow determines the overall process which each manuscript undergoes during the peer review process. The entire process of editorial workflow is maintained through online or electronic system. Online system such as Editor Manger System or Editorial Tracking System is being used for such purposes along with E-mail.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Any submitted article at the initial stage is assessed for the suitability of the subject of the article within the scope of the journal and the compliance of the article for specific article type mentioned by the author. Along with this basic grammatical check is performed. After such evaluation by the Editor-in-Chief the following by which rigorous plagiarism checking is performed for each submission.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        If the submitted article passes through plagiarism check it will assigned manuscript number. If any article found plagiarized, that will be summarily rejected in this stage of processing.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        After assignment of the Editor for a manuscript having manuscript number stipulated time will be provided to the assigned Editor to take up the assignment else the assignment will be passed other Editorial Board member bearing the relevant expertise.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        The assigned Editor will be responsible for the further peer review process under the guidance of Editor-in-Chief.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Comments provided by the reviewers should convey their final decision within the following types: 1.Acceptance, 2. Minor revision, 3. Major revision and 4. Rejection.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Once the review comments and decision of the reviewers on the manuscript is received by the Editorial Office, the assigned Editor will be notified for further decision on the article as the required reviews are completed.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed ">
                        Editor is responsible for providing the decision based on the comments and their relevance and suitability with the manuscript. In such circumstances Editors decision is final, reviewers or authors are not entitled to raise any question after the final decision. If assigned Editor decides to send the article for revision, it will be forwarded to the authors for revision and authors are liable to send back the revised manuscript to the Editorial Office within the stipulated time provided. Once the revised manuscript received it will be further inspected in relation to the incorporation of the specified points and the assigned Editor may provide the decision or send back to the reviewer once more depending on the comparative status and enrichment of the manuscript. In every step of processing Editor-in-Chief is having the right to interfere and take the final decision even after the decision taken by the assigned Editor. A fast track review process will be followed to complete all these process within a tightly bound time limit.
                    </p>

                    <span class=' text-2xl font-semibold'>Code of Conduct</span>

                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mt-6">
                        <li>The Editor(s)-in-Chief must declare any financial, personal, or other relationships that might pose a conflict of interest.</li>
                        <li>The Editor(s)-in-Chief must ensure that all published articles are assessed by an editor.</li>
                        <li>The Editor(s)-in-Chief should not handle manuscripts where they have a conflict of interest. Instead, a senior Editorial Board member should oversee the peer-review and decision-making process.</li>
                        <li>Although Editor(s)-in-Chief may publish in their journal, most publications should come from other authors. A senior Editorial Board member should oversee peer review for any manuscript submitted or co-authored by the Editor(s)-in-Chief.</li>
                        <li>Editorial Board members should not be involved in reviewing or making decisions on manuscripts where they have conflicts of interest.</li>
                        <li>Editor(s)-in-Chief must provide professional and timely service to authors, ensuring efficient and respectful communication.</li>
                        <li>In closed peer-review systems, Editor(s)-in-Chief must maintain the anonymity of peer reviewers.</li>
                    </ul>

                </main>
            </div>

            <Footer />

        </>)
}
export default themeeditorial;