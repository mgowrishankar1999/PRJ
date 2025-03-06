import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ DataTables Imports
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons/js/dataTables.buttons.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function Authors() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const BASE_URL = "http://192.168.1.13:8080";

  // ✅ Fetch Authors Data
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/authors`);
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // ✅ Initialize DataTable after data is loaded
  useEffect(() => {
    if (authors.length > 0) {
      setTimeout(() => {
        if (!$.fn.DataTable.isDataTable("#authorTable")) {
          $("#authorTable").DataTable({
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
  }, [authors]);

  // ✅ Delete Author
  const deleteAuthor = async (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      try {
        await axios.delete(`${BASE_URL}/api/authors/${id}`);
        setAuthors(authors.filter((author) => author.id !== id));
        console.log(`Deleted author with ID: ${id}`);
      } catch (error) {
        console.error("Error deleting author:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex max-h-screen ">
        <Sidebar />
        <div className="container py-20 overflow-scroll">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-uppercase">Authors</h3>
            <button onClick={() => navigate('/addnewauthor')} className="btn btn-success shadow-sm">
              Add New
            </button>
          </div>
          <div className="table-responsive">
            <table id="authorTable" className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Author Code</th>
                  <th>Author Name</th>
                  <th>Designation</th>
                  <th>University</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.length > 0 ? (
                  authors.map((author, index) => (
                    <tr key={author.id}>
                      <td>{index + 1}</td>
                      <td>{author.authorCode}</td>
                      <td>{author.prefix} {author.firstName} {author.lastName}</td>
                      <td>{author.designation}</td>
                      <td>{author.university}</td>
                      <td>{author.country}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => navigate(`/addnewauthor/${author.id}`)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAuthor(author.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No authors found.
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

export default Authors;
