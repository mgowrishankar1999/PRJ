import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";
import ImageGallery from "./Image";


const AuthorSearch = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").filter(Boolean);

  // Search States
  const [searchType, setSearchType] = useState("author"); // "author", "university", "country"
  const [searchQuery, setSearchQuery] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.13:8080/api/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    let url = "";
    if (searchType === "author") {
      url = `http://192.168.1.13:8080/api/authors`;
    } else if (searchType === "university") {
      url = `http://192.168.1.13:8080/api/authors`;
    } else if (searchType === "country") {
      url = `http://192.168.1.13:8080/api/universities`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      let filteredResults = [];

      if (searchType === "author") {
        filteredResults = data.filter(
          (author) =>
            author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            author.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (authorId && author.id.toString() === authorId)
        );
      } else if (searchType === "university") {
        filteredResults = data.filter((author) =>
          author.department?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchType === "country") {
        filteredResults = data.filter((university) =>
          university.universityName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setResults(filteredResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Count documents published for each author
  const getPublicationCount = (authorId) => {
    return articles.filter((article) =>
      article.authorIds.split(",").map((id) => id.trim()).includes(authorId.toString())
    ).length;
  };

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

          <div className="text-3xl font-bold text-black-600 border-b-2 border-blue-600 pb-2 mb-4">
            Author Search
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="author"
                  checked={searchType === "author"}
                  onChange={() => setSearchType("author")}
                  className="mr-2"
                />
                Author
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="university"
                  checked={searchType === "university"}
                  onChange={() => setSearchType("university")}
                  className="mr-2"
                />
                University
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="country"
                  checked={searchType === "country"}
                  onChange={() => setSearchType("country")}
                  className="mr-2"
                />
                Country
              </label>
            </div>

            <div className="flex space-x-4">
              <input
                type="text"
                placeholder={searchType === "author" ? "Name" : "Search"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-4 py-2 rounded w-1/3"
              />
              {searchType === "author" && (
                <>
                  <span className="text-gray-600">OR</span>
                  <input
                    type="text"
                    placeholder="Author ID"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="border px-4 py-2 rounded w-1/4"
                  />
                </>
              )}
              <button onClick={handleSearch} className="bg-blue-600  text-white px-4 py-2 rounded hover:bg-green-800">
                Search
              </button>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <p className="text-center text-gray-500">Searching...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : results.length > 0 ? (
              <table className="w-full border border-gray-300 mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 border">S.No</th>
                    <th className="p-3 border">{searchType === "country" ? "University" : "Name"}</th>
                    {searchType === "author" && <th className="p-3 border">No of Documents Published</th>}
                    <th className="p-3 border">University</th>
                    <th className="p-3 border">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-3 border">{index + 1}</td>
                      <td className="p-3 border">{searchType === "country" ? item.universityName : `${item.firstName} ${item.lastName}`}</td>
                      {searchType === "author" && (
                        <td className="p-3 border">{getPublicationCount(item.id)}</td>
                      )}
                      <td className="p-3 border">{item.department || item.universityName}</td>
                      <td className="p-3 border">{item.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </div>
        </main>
      </div>
      <ImageGallery/>
      <Footer />
    </div>
  );
};

export default AuthorSearch;
