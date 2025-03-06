import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// DataTables Imports
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons/js/dataTables.buttons.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [journals, setJournals] = useState({});

  const BASE_URL = "http://192.168.1.13:8080";

  // Fetch Articles from API
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Fetch Journals to map journalId to journalName
  const fetchJournals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/journals`);
      const journalMap = {};
      response.data.forEach((journal) => {
        journalMap[journal.id] = journal.journalName;
      });
      setJournals(journalMap);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchJournals();
  }, []);

  // Initialize DataTable once articles are loaded
  useEffect(() => {
    if (articles.length > 0) {
      setTimeout(() => {
        if (!$.fn.DataTable.isDataTable("#articleTable")) {
          $("#articleTable").DataTable({
            destroy: true,
            responsive: true,
            dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
            buttons: [
              { extend: "copy", className: "btn btn-primary btn-sm text-blue" },
              { extend: "csv", className: "btn btn-primary btn-sm text-blue" },
              { extend: "excel", className: "btn btn-primary btn-sm text-blue" },
              { extend: "pdf", className: "btn btn-primary btn-sm text-blue" },
              { extend: "print", className: "btn btn-primary btn-sm text-blue" }
            ]
          });
        }
      }, 500);
    }
  }, [articles]);

  // Delete Article handler
  const deleteArticle = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`${BASE_URL}/api/articles/${id}`);
        setArticles(articles.filter((article) => article.id !== id));
        console.log(`Deleted article with ID: ${id}`);
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex max-h-screen ">
        <Sidebar />
        <div className="container py-20 overflow-y-scroll ">
          <div className="d-flex justify-content-between align-items-center  mb-4">
            <h3 className="fw-bold text-uppercase">Articles</h3>
            <button onClick={() => navigate("/addnewarticles")} className="btn btn-success shadow-sm">
              Add New
            </button>
          </div>
          <div className="table-responsive pb-10">
            <table id="articleTable" className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Article Key</th>
                  <th>Title</th>
                  <th>Journal</th>
                  <th>DOI</th>
                  <th>Pages</th>
                  <th>Volume/Issue</th>
                  <th>Publication Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article, index) => (
                    <tr key={article.id}>
                      <td>{index + 1}</td>
                      <td>{article.articleKey}</td>
                      <td>{article.articleTitle}</td>
                      <td>{journals[article.journalId] || "Unknown Journal"}</td>
                      <td>{article.doi}</td>
                      <td>{article.pageFrom} - {article.pageTo}</td>
                      <td>
                        {article.volume}/{article.issue}
                      </td>
                      <td>{article.dateOfPublication}</td>
                      <td class='flex '>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => navigate(`/addnewarticles/${article.id}`)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteArticle(article.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Articles;
