import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import RecommendedJournals from "../frontend/recommendedjournals";

const Herosection = () => {
  const [recentlyPublishedJournals, setRecentlyPublishedJournals] = useState([]);
  const [authors, setAuthors] = useState({});
  const [journals, setJournals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://192.168.1.13:8080/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setRecentlyPublishedJournals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Fetch authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://192.168.1.13:8080/api/authors");
        if (!response.ok) throw new Error("Failed to fetch authors");
        const data = await response.json();
        const authorsMap = data.reduce((acc, author) => {
          acc[author.id] = `${author.firstName} ${author.lastName}`;
          return acc;
        }, {});
        setAuthors(authorsMap);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAuthors();
  }, []);

  // Fetch journal names
  useEffect(() => {
    const fetchJournalsData = async () => {
      try {
        const response = await fetch("http://192.168.1.13:8080/api/journals");
        if (!response.ok) throw new Error("Failed to fetch journals");
        const data = await response.json();
        const journalsMap = data.reduce((acc, journal) => {
          acc[journal.id] = {
            name: journal.journalName,
            abbreviation: journal.abbrevation || "N/A",
          };
          return acc;
        }, {});
        setJournals(journalsMap);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchJournalsData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div>
        <HomeNavbar />
        <MenuBar />
      </div>

      <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
        <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
          <SidebarList />
        </aside>

        <main className="w-full bg-white p-6 shadow-sm flex flex-col rounded-lg">
          <div className="h-[47%] w-[100%]">
            <RecommendedJournals />
          </div>

          <div className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            Recently Published
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading articles...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <div className="space-y-4">
              {recentlyPublishedJournals.length > 0 ? (
                recentlyPublishedJournals.map((journal, index) => {
                  const authorNames = journal.authorIds
                    .split(",")
                    .map((id) => authors[id.trim()])
                    .filter(Boolean)
                    .join(", ");

                  const correspondingAuthorName = authors[journal.correspondingAuthor] || "Unknown";

                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg hover:shadow-md transition bg-gray-50 bg-gradient-to-r from-blue-30 to-violet-100"
                    >
                      {/* ✅ Article Title with Route */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 border-b pb-2">
                        <Link to={`/articles/${journal.id}`} className="text-blue-500 hover:underline">
                          {journal.articleTitle}
                        </Link>
                      </h3>

                      {/* ✅ Journal Name with Route */}
                      <p className="text-black font-medium">
                        <strong className="text-gray-800">Journal Name: </strong>
                        <Link
                          to={`/journals/${journals[journal.journalId]?.abbreviation}/${journal.journalId}`}
                          className="font-normal text-blue-500 hover:underline"
                        >
                          {journals[journal.journalId]?.name || "Unknown"} ({journals[journal.journalId]?.abbreviation || "N/A"})
                        </Link>
                        {" "} | Volume {journal.volume}, Issue {journal.issue} | {journal.monthFrom}-{journal.monthTo} {journal.year}
                      </p>


                      {/* Authors */}
                      <p className="text-black font-medium">
                        <strong className="text-gray-800">Authors: </strong>
                        <span className="font-normal">{authorNames || "Unknown"}</span>
                      </p>

                      {/* Corresponding Author */}
                      <p className="text-black font-medium">
                        <strong className="text-gray-800">Corresponding Author: </strong>
                        <span className="font-normal">{correspondingAuthorName}</span>
                      </p>

                      {/* Published Date */}
                      <p className="text-black font-medium">
                        <strong className="text-gray-800">Published on: </strong>
                        <span className="font-normal">{journal.dateOfPublication}</span>
                      </p>

                      {/* Page Range */}
                      <p className="text-black font-medium">
                        <strong className="text-gray-800">Pages: </strong>
                        <span className="font-normal">{journal.pageFrom} - {journal.pageTo}</span>
                      </p>

                      {/* Article ID */}
                      <p className="text-black font-medium">
                        <strong className="text-gray-800">Article ID: </strong>
                        <span className="font-normal">{journal.articleKey}</span>
                      </p>

                      {/* Stats */}
                      <div className="mt-2 flex text-sm text-black space-x-4 font-medium">
                        <span>
                          <strong className="text-gray-600">Downloads: </strong>
                          <span className="font-normal">{journal.downloads}</span>
                        </span>
                        <span>
                          <strong className="text-gray-600">Views: </strong>
                          <span className="font-normal">{journal.views}</span>
                        </span>
                        <span>
                          <strong className="text-gray-600">Social Shares: </strong>
                          <span className="font-normal">{journal.shareCount}</span>
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">No articles found.</p>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Herosection;
