import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import JournalNavbar from "./JournalNavbar";
import ImageGallery from "./Image";


const JournalDetail = () => {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState({});
    const [showSubjectArea, setShowSubjectArea] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [journalRes, articlesRes, authorsRes] = await Promise.all([
                    axios.get(`http://192.168.1.13:8080/api/journals/${id}`),
                    axios.get(`http://192.168.1.13:8080/api/articles`),
                    axios.get(`http://192.168.1.13:8080/api/authors`),
                ]);

                setJournal(journalRes.data);

                // ✅ Filter Articles by `journalId`
                const filteredArticles = articlesRes.data.filter(article => article.journalId.toString() === id);
                setArticles(filteredArticles);

                // ✅ Convert Authors Array to an Object `{id: fullName}`
                const authorsMap = authorsRes.data.reduce((acc, author) => {
                    acc[author.id] = `${author.firstName} ${author.lastName}`;
                    return acc;
                }, {});

                setAuthors(authorsMap);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="text-center p-5">Loading journal details...</div>;
    if (!journal) return <div className="text-center p-5 text-red-500 text-lg">Journal not found.</div>;

    const baseURL = "http://192.168.1.13:8080";
    const coverImageUrl = journal.coverPage ? `${baseURL}${journal.coverPage}` : "/default-cover.jpg";

    return (
        <>


            <HomeNavbar />
            <MenuBar />
            <JournalNavbar />
            {/* Main Layout */}
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-8 bg-white">
                {/* Left Sidebar */}
                <aside className="w-1/4 bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                    <div className="mt-4 border p-4 bg-gray-100 rounded-md">
                        <h3 className="font-semibold text-lg">Propose a Special Issue</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Submit your special issue proposal for {journal.journalName}.
                        </p>
                        <button className="w-full mt-3 bg-blue-500 text-white p-2 rounded-md">Submit Proposal</button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-3/4   p-6 shadow-sm rounded-lg">
                    <div className="flex bg-gradient-to-r from-blue-50 to-pink-50 flex-col md:flex-row items-center md:items-start justify-between border p-4 bg-gray-100 rounded-md">
                        {/* Left: Journal Metadata */}
                        <div className="w-full md:w-2/3  ">
                            <p><strong>Journal Name:</strong> {journal.journalName || "N/A"}</p>
                            <p><strong>Journal Key:</strong> {journal.journalKey || "N/A"}</p>
                            <p><strong>ISSN Online:</strong> {journal.issnOnlineFrom} - {journal.issnOnlineTo}</p>
                            <p><strong>ISSN Print:</strong> {journal.issnPrintFrom} - {journal.issnPrintTo}</p>
                            <p><strong>DOI:</strong> {journal.doi || "N/A"}</p>
                            <p><strong>Publication Frequency:</strong> {journal.publicationFrequency || "N/A"}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${journal.email}`} className="text-blue-500">{journal.email || "N/A"}</a></p>
                            <p><strong>Start Date:</strong> {journal.startMonth} {journal.startYear}</p>
                            <p><strong>Subscription Price:</strong> {journal.subPrice || "N/A"}</p>
                        </div>

                        {/* Right: Cover Image */}
                        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                            <img
                                src={coverImageUrl}
                                alt="Journal Cover"
                                className="w-40 h-56 md:w-48 md:h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>

                    {/* ✅ Preserved Button Layout */}
                    <div className="flex mt-6">
                        <button
                            className={`px-6 py-2 rounded-l-lg ${!showSubjectArea ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                            onClick={() => setShowSubjectArea(false)}
                        >
                            Latest Articles
                        </button>
                        <button
                            className={`px-6 py-2 rounded-r-lg ${showSubjectArea ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                            onClick={() => setShowSubjectArea(true)}
                        >
                            About This Journal
                        </button>
                    </div>
                    {/* 🔥 Toggle Between Articles & Subject Area */}
                    {showSubjectArea ? (
                        <div className="mt-6 border p-4 bg-gray-50 shadow-sm rounded-md">
                            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
                                About This Journal
                            </h2>
                            <p className="text-lg text-gray-700">
                                <strong>Subject Area:</strong> {journal.subjectArea || "No subject area available."}
                            </p>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                                Latest Articles in {journal.journalName}
                            </h2>

                            {articles.length > 0 ? (
                                <div className="space-y-4">
                                    {articles.map((article, index) => {
                                        const authorNames = article.authorIds
                                            ?.split(",")
                                            .map(id => authors[id.trim()])
                                            .filter(Boolean)
                                            .join(", ") || "Unknown";

                                        return (
                                            <div key={index} className="p-4 rounded-lg hover:shadow-md transition bg-gray-50">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 border-b pb-2">
                                                    {article.articleTitle}
                                                </h3>
                                                <p><strong>Authors:</strong> {authorNames}</p>
                                                {/* Corresponding Author */}
                                                <p className="text-gray-700">
                                                    <strong>Corresponding Author:</strong> {article.correspondingAuthor || "Unknown"}
                                                </p>
                                                <p><strong>DOI:</strong> {article.doi || "N/A"}</p>
                                                <p><strong>Published on:</strong> {article.dateOfPublication}</p>
                                                {/* Volume & Issue */}
                                                <p className="text-gray-700">
                                                    <strong>Volume:</strong> {article.volume}, Issue {article.issue}
                                                </p>
                                                <p className="text-gray-700">
                                                    <strong>Article ID:</strong> {article.articleKey}
                                                </p>
                                                <p><strong>Pages:</strong> {article.pageFrom} - {article.pageTo}</p>
                                                {/* Stats */}
                                                <div className="mt-2 flex text-sm text-gray-600 space-x-4">
                                                    <span><strong>Downloads:</strong> {article.downloads}</span>
                                                    <span><strong>Views:</strong> {article.views}</span>
                                                    <span><strong>Social Shares:</strong> {article.shareCount}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500">No articles found.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <ImageGallery />
            <Footer />

        </>
    );
};
export default JournalDetail;


