import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

// DataTables Imports
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons/js/dataTables.buttons.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";

// Icons
import { FaEdit, FaTrash } from "react-icons/fa";

// Custom Components
import Navbar from "../../Admin/navbar";
import Sidebar from "../../Admin/sidebar";

function Awards() {
  const BASE_URL = "http://192.168.1.13:8080";
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);

  // Fetch Awards
  const fetchAwards = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/awards`);
      setAwards(response.data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  // Delete Award Handler
  const deleteAward = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      try {
        await axios.delete(`${BASE_URL}/api/awards/${id}`);
        setAwards((prev) => prev.filter((award) => award.id !== id));
        console.log(`Deleted award with ID: ${id}`);
      } catch (error) {
        console.error("Error deleting award:", error);
      }
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // Initialize DataTable
  useEffect(() => {
    if (awards.length > 0) {
      setTimeout(() => {
        if (!$.fn.DataTable.isDataTable("#awardsTable")) {
          $("#awardsTable").DataTable({
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
  }, [awards]);

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container mt-26">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-uppercase">Awards & Achievements</h3>
              <button
                onClick={() => navigate("/addawards")}
                className="btn btn-success shadow-sm"
              >
                Add New Award
              </button>
            </div>

            <div className="table-responsive">
              <table id="awardsTable" className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    {/* <th>Profile</th> */}
                    <th>Name</th>
                    <th>Affiliation</th>
                    <th>Email</th>
                    <th>Award Type</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {awards.length > 0 ? (
                    awards.map((award, index) => (
                      <tr key={award.id}>
                        <td>{index + 1}</td>

                        {/* Profile Image & Links */}
                        {/* <td className="text-center">
                          <img
                            src={`${BASE_URL}/static${award.profilePhoto}`}
                            alt="Profile"
                            className="rounded-circle"
                            width="50"
                            height="50"
                          />
                          <div className="mt-1">
                            {award.googleScholar && (
                              <a
                                href={award.googleScholar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary d-block"
                              >
                                Google Scholar
                              </a>
                            )}
                            {award.researchgate && (
                              <a
                                href={award.researchgate}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-info d-block"
                              >
                                ResearchGate
                              </a>
                            )}
                            {award.academia && (
                              <a
                                href={award.academia}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary d-block"
                              >
                                Academia
                              </a>
                            )}
                            {award.linkedin && (
                              <a
                                href={award.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark d-block"
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </td> */}

                        <td>{award.name}</td>
                        <td>{award.affiliation}</td>
                        <td>{award.email}</td>
                        <td>{award.awardType}</td>
                        <td>{award.content}</td>

                        {/* Actions */}
                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => navigate(`/addawards/${award.id}`)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteAward(award.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted">
                        No awards found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Awards;
