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

function Subscription() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [journals, setJournals] = useState({}); // For mapping journalId to journalName
  const BASE_URL = "http://192.168.1.13:8080";

  // ✅ Fetch Subscriptions Data
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/journalsubscription`);
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  // ✅ Fetch Journals for Mapping `journalId` to `journalName`
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
    fetchSubscriptions();
    fetchJournals();
  }, []);

  // ✅ Initialize DataTable after data is fetched
  useEffect(() => {
    if (subscriptions.length > 0) {
      setTimeout(() => {
        if (!$.fn.DataTable.isDataTable("#subscriptionTable")) {
          $("#subscriptionTable").DataTable({
            destroy: true,
            responsive: true,
            dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
            buttons: [
              { extend: "copy", className: "btn btn-primary btn-sm" },
              { extend: "csv", className: "btn btn-primary btn-sm" },
              { extend: "excel", className: "btn btn-primary btn-sm" },
              { extend: "pdf", className: "btn btn-primary btn-sm" },
              { extend: "print", className: "btn btn-primary btn-sm" },
            ],
          });
        }
      }, 500);
    }
  }, [subscriptions]);

  // ✅ Delete Subscription Data
  const deleteSubscription = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await axios.delete(`${BASE_URL}/api/journalsubscription/${id}`);
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
        console.log(`Deleted subscription with ID: ${id}`);
      } catch (error) {
        console.error("Error deleting subscription:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex max-h-screen">
        <Sidebar />
        <div className="container  py-20 overflow-scroll">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-uppercase">Journal Subscriptions</h3>
            <button
              onClick={() => navigate("/addnewsubscription")}
              className="btn btn-success shadow-sm"
            >
              Add New
            </button>
          </div>
          <div className="table-responsive">
            <table id="subscriptionTable" className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Journal</th>
                  <th>Issues/Year</th>
                  <th>Amount</th>
                  <th>Indexing Details</th>
                  <th>Period</th>
                  <th>Month</th>
                  <th>Year</th>
                  {/* <th>File</th> */}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub, index) => (
                    <tr key={sub.id}>
                      <td>{index + 1}</td>
                      <td>{journals[sub.journalId] || "Unknown Journal"}</td>
                      <td>{sub.issuesPerYear}</td>
                      <td>{sub.amount}</td>
                      <td>{sub.indexingDetails}</td>
                      <td>{sub.periodSubscription}</td>
                      <td>{sub.month}</td>
                      <td>{sub.year}</td>
                      {/* <td>{sub.file}</td> */}
                      <td>{sub.status}</td>
                      <td class='flex'>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => navigate(`/addnewsubscription/${sub.id}`)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteSubscription(sub.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center text-muted">
                      No subscription data found.
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

export default Subscription;
