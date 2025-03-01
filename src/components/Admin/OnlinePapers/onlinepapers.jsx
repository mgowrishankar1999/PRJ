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

function OnlinePapers() {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [journals, setJournals] = useState({}); // Store journal names for lookup

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Submissions
    const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/submissions`);
            setSubmissions(response.data);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    };

    // ✅ Fetch Journals for Mapping `journalId` to `journalName`
    const fetchJournals = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/journals`);
            const journalMap = {};
            response.data.forEach(journal => {
                journalMap[journal.id] = journal.journalName;
            });
            setJournals(journalMap);
        } catch (error) {
            console.error("Error fetching journals:", error);
        }
    };

    useEffect(() => {
        fetchSubmissions();
        fetchJournals();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (submissions.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#submissionTable")) {
                    $("#submissionTable").DataTable({
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
    }, [submissions]);

    // ✅ Delete Submission
    const deleteSubmission = async (id) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            try {
                await axios.delete(`${BASE_URL}/api/submissions/${id}`);
                setSubmissions(submissions.filter((submission) => submission.id !== id));
                console.log(`Deleted submission with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting submission:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold text-uppercase">Online Paper Submissions</h3>
                    </div>

                    <div className="table-responsive">
                        <table id="submissionTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Journal</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Email</th>
                                    <th>Pages</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.length > 0 ? (
                                    submissions.map((submission, index) => (
                                        <tr key={submission.id}>
                                            <td>{index + 1}</td> {/* ✅ S.No */}
                                            <td>{journals[submission.journalId] || "Unknown Journal"}</td> {/* ✅ Get Journal Name */}
                                            <td>{submission.title}</td>
                                            <td>{submission.firstName} {submission.lastName}</td>
                                            <td>{submission.email}</td>
                                            <td>{submission.pages}</td>
                                            <td>{submission.currentStage}</td>
                                            <td>
                                                {/* <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/edit-submission/${submission.id}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button> */}
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteSubmission(submission.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted">No submissions found.</td>
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

export default OnlinePapers;