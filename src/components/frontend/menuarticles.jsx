import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";

const Article = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState({});
    const [journals, setJournals] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/articles")
            .then(response => response.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch articles.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/authors")
            .then(response => response.json())
            .then(data => {
                const authorMap = {};
                data.forEach(author => {
                    authorMap[author.id] = `${author.firstName} ${author.lastName}`;
                });
                setAuthors(authorMap);
            })
            .catch(error => console.error("Error fetching authors:", error));
    }, []);

    useEffect(() => {
        fetch("http://192.168.1.13:8080/api/journals")
            .then(response => response.json())
            .then(data => {
                const journalMap = {};
                data.forEach(journal => {
                    journalMap[journal.id] = {
                        name: journal.journalName,
                        abbreviation: journal.abbrevation || "N/A",
                    };
                });
                setJournals(journalMap);
            })
            .catch(error => console.error("Error fetching journals:", error));
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <HomeNavbar />
            <MenuBar />

            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
                    <SidebarList />
                </aside>

                <main className="w-4/1 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    <div className="text-sm mb-2">
                        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                        {currentPath.map((segment, index) => (
                            <span key={index}>
                                <span className="mx-1">/</span>
                                <span className="capitalize">{segment.replace("-", " ")}</span>
                            </span>
                        ))}
                    </div>

                    <div className="text-3xl font-bold uppercase border-b-2 border-blue-500 pb-2 mb-4">
                        Articles
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading articles...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">Error: {error}</p>
                    ) : (
                        <div className="space-y-4">
                            {currentArticles.length > 0 ? (
                                currentArticles.map((article, index) => {
                                    const authorNames = article.authorIds
                                        .split(",")
                                        .map(id => authors[id.trim()])
                                        .filter(Boolean)
                                        .join(", ");

                                    const correspondingAuthorName = authors[article.correspondingAuthor] || "Unknown";
                                    const journalInfo = journals[article.journalId] || { name: "Unknown", abbreviation: "N/A" };

                                    return (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg hover:shadow-md transition bg-gray-50 bg-gradient-to-r from-blue-30 to-violet-100"
                                        >
                                            {/* ✅ Article Title with Route */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 border-b pb-2">
                                                <Link to={`/articles/${article.id}`} className="text-blue-500 hover:underline">
                                                    {article.articleTitle}
                                                </Link>
                                            </h3>

                                            {/* ✅ Journal Name with Proper Routing */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">Journal Name: </strong>
                                                <Link
                                                    to={`/journals/${journalInfo.abbreviation}/${article.journalId}`}
                                                    className="font-normal text-blue-500 hover:underline"
                                                >
                                                    {journalInfo.name} ({journalInfo.abbreviation})
                                                </Link>
                                                {" "} | Volume {article.volume}, Issue {article.issue} | {article.monthFrom}-{article.monthTo} {article.year}
                                            </p>

                                            {/* ✅ Authors */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">Authors: </strong>
                                                <span className="font-normal">{authorNames || "Unknown"}</span>
                                            </p>

                                            {/* ✅ Corresponding Author */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">Corresponding Author: </strong>
                                                <span className="font-normal">{correspondingAuthorName}</span>
                                            </p>

                                            {/* ✅ DOI */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">DOI: </strong>
                                                <span className="font-normal">{article.doi || "N/A"}</span>
                                            </p>

                                            {/* ✅ Published Date */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">Published on: </strong>
                                                <span className="font-normal">{article.dateOfPublication}</span>
                                            </p>

                                            {/* ✅ Page Range */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">Pages: </strong>
                                                <span className="font-normal">{article.pageFrom} - {article.pageTo}</span>
                                            </p>

                                            {/* ✅ Abstract */}
                                            <p className="text-black font-medium">
                                                <strong className="text-gray-800">Abstract: </strong>
                                                <span className="font-normal">{article.abstractText || "No abstract available."}</span>
                                            </p>

                                            {/* ✅ Statistics */}
                                            <div className="mt-2 flex text-sm text-gray-600 space-x-4">
                                                <span><strong>Downloads:</strong> {article.downloads || 0}</span>
                                                <span><strong>Views:</strong> {article.views || 0}</span>
                                                <span><strong>Social Shares:</strong> {article.shareCount || 0}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-center">No articles found.</p>
                            )}
                        </div>
                    )}

                    {/* ✅ Pagination */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-700 transition`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </main>
            </div>
            <ImageGallery />
            <Footer />
        </div>
    );
};

export default Article;
