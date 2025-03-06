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

// Custom components
import Navbar from "../../Admin/navbar";
import Sidebar from "../../Admin/sidebar";

function Membership() {
  const BASE_URL = "http://192.168.1.13:8080";
  const [memberships, setMemberships] = useState([]);
  const navigate = useNavigate();

  // Fetch memberships from API
  const fetchMemberships = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/memberships`);
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    }
  };

  // Delete membership handler
  const deleteMembership = async (id) => {
    if (window.confirm("Are you sure you want to delete this membership?")) {
      try {
        await axios.delete(`${BASE_URL}/api/memberships/${id}`);
        setMemberships((prev) =>
          prev.filter((membership) => membership.membershipId !== id)
        );
        console.log(`Deleted membership with ID: ${id}`);
      } catch (error) {
        console.error("Error deleting membership:", error);
      }
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  // Initialize DataTable after memberships are loaded
  useEffect(() => {
    if (memberships.length > 0) {
      setTimeout(() => {
        if (!$.fn.DataTable.isDataTable("#membershipTable")) {
          $("#membershipTable").DataTable({
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
  }, [memberships]);

  return (
    <>
      <Navbar />
      <div className="d-flex h-screen ">
        <Sidebar />
        <div className="flex-grow-1 container py-20 overflow-scroll">
          <div className="container ">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-uppercase">Memberships</h3>
              <button
                onClick={() => navigate("/addnewmembership")}
                className="btn btn-success shadow-sm"
              >
                Add New
              </button>
            </div>
            <div className="table-responsive">
              <table
                id="membershipTable"
                className="table table-striped table-bordered"
              >
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Membership Type</th>
                    <th>Year</th>
                    <th>Name</th>
                    <th>Affiliation</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.length > 0 ? (
                    memberships.map((membership, index) => (
                      <tr key={membership.membershipId}>
                        <td>{index + 1}</td>
                        <td>{membership.membershipType}</td>
                        <td>{membership.membershipYear}</td>
                        <td>{membership.name}</td>
                        <td>{membership.affiliation}</td>
                        <td>{membership.specialization}</td>
                        <td>{membership.email}</td>
                        <td>{membership.mobileNumber}</td>
                        <td class='flex'>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() =>
                              navigate(
                                `/addnewmembership/${membership.membershipId}`
                              )
                            }
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteMembership(membership.membershipId)
                            }
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-muted">
                        No memberships found.
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

export default Membership;
