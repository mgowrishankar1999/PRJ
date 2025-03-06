import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import JournalNavbar from "./JournalNavbar";
import Footer from "./footer";
import ImageGallery from "./Image";

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [journal, setJournal] = useState(null);
    const [authors, setAuthors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloadCount, setDownloadCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Article Data
                const articleRes = await fetch(`http://192.168.1.13:8080/api/articles/${id}`);
                const articleData = await articleRes.json();
                console.log(articleData)
                if (!articleRes.ok) throw new Error("Article not found.");

                setArticle(articleData);
                setDownloadCount(articleData.downloads);

                // Fetch Journal Data
                const journalRes = await fetch(`http://192.168.1.13:8080/api/journals/${articleData.journalId}`);
                const journalData = await journalRes.json();
                if (!journalRes.ok) throw new Error("Journal not found.");

                setJournal(journalData);

                // Fetch Authors Data
                const authorsRes = await fetch("http://192.168.1.13:8080/api/authors");
                const authorsData = await authorsRes.json();

                // Convert authors array to object `{ id: "First Last" }`
                const authorsMap = authorsData.reduce((acc, author) => {
                    acc[author.id] = `${author.firstName} ${author.lastName}`;
                    return acc;
                }, {});

                setAuthors(authorsMap);
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDownload = async () => {
        if (!article || !article.articleFile) return;

        try {
            // Increase download count
            await fetch(`http://192.168.1.13:8080/api/articles/${id}/download`, {
                method: "POST",
            });

            setDownloadCount(prev => prev + 1);

            // Download file
            const fileUrl = `http://192.168.1.13:8080${article.articleFile}`;
            window.open(fileUrl, "_blank");
        } catch (error) {
            console.error("Error updating download count:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-500 py-6">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-6">{error}</p>;
    if (!article) return <p className="text-center text-red-500 py-6">Article not found.</p>;

    // Extract and map author names
    const authorNames = article.authorIds
        ? article.authorIds.split(",").map(id => authors[id.trim()] || "Unknown").join(", ")
        : "N/A";

    const correspondingAuthorName = authors[article.correspondingAuthor] || "Unknown";

    // Parse references into list format
    const references = article.reference ? article.reference.split("\r\n").filter(ref => ref.trim() !== "") : [];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* ✅ Navigation Bars */}
            <HomeNavbar />
            <MenuBar />
            <JournalNavbar />

            {/* ✅ Main Layout */}
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* ✅ Sidebar */}
                <aside className="w-1/4 bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                </aside>

                {/* ✅ Main Content */}
                <main className="w-3/4 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-300 pb-2 mb-4">
                        {article.articleTitle}
                    </h1>

                    {/* ✅ Authors */}
                    <p className="text-gray-700 text-lg mb-4">
                        <strong className="text-gray-800">Authors:</strong> {authorNames}
                    </p>

                    <p className="text-gray-700 text-lg mb-4">
                        <strong className="text-gray-800">Corresponding Author:</strong> {correspondingAuthorName}
                        <span className="text-red-500 text-xl mr-2"> ★</span>
                    </p>

                    {/* ✅ Journal Name */}
                    <p className="text-gray-700 text-lg mb-4">
                        <strong className="text-gray-800">Published in:</strong> {journal ? journal.journalName : "Unknown Journal"}
                    </p>

                    {/* ✅ Article Details */}
                    <p className="text-gray-700 mb-4">
                        <strong className="text-gray-800">DOI:</strong> {article.doi || "N/A"}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong className="text-gray-800">Published On:</strong> {article.dateOfPublication || "Unknown"}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong className="text-gray-800">Volume:</strong> {article.volume}, Issue {article.issue}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong className="text-gray-800">Pages:</strong> {article.pageFrom} - {article.pageTo}
                    </p>

                    {/* ✅ Abstract */}
                    <p className="text-gray-700 text-lg mb-4">
                        <strong className="text-gray-800">Abstract:</strong> {article.abstractText || "No abstract available."}
                    </p>

                    {/* ✅ Keywords */}
                    {article.keywords && (
                        <p className="text-gray-700 mb-4">
                            <strong className="text-gray-800">Keywords:</strong> {article.keywords}
                        </p>
                    )}

                    {/* ✅ Download Button */}
                    {article.articleFile && (
                        <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                        >
                            Download Article
                        </button>
                    )}

                    {/* ✅ Article Statistics */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
                        <p className="text-gray-700"><strong>Downloads:</strong> {downloadCount}</p>
                        <p className="text-gray-700"><strong>Views:</strong> {article.views || 0}</p>
                        <p className="text-gray-700"><strong>Social Shares:</strong> {article.shareCount || 0}</p>
                    </div>

                    {/* ✅ References Section */}
                    {references.length > 0 && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">References</h2>
                            <ul className="list-disc list-inside text-gray-700">
                                {references.map((ref, index) => (
                                    <li key={index} className="mb-2">{ref}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </main>
            </div>
            <ImageGallery />
            {/* ✅ Footer */}
            <Footer />
        </div>
    );
};

export default ArticleDetail;
