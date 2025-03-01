import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import $ from "jquery";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "bootstrap/dist/css/bootstrap.min.css";

function CallForPapers() {
    const [calls, setCalls] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Calls for Papers
    const fetchCalls = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/call-for-paper`);
            setCalls(response.data);
        } catch (error) {
            console.error("Error fetching calls:", error);
        }
    };

    useEffect(() => {
        fetchCalls();
    }, []);

    useEffect(() => {
        if (calls.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#callsTable")) {
                    $("#callsTable").DataTable({
                        destroy: true,
                        responsive: true,
                        dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
                        buttons: [
                            { extend: "copy", className: "btn btn-primary btn-sm" },
                            { extend: "csv", className: "btn btn-primary btn-sm" },
                            { extend: "excel", className: "btn btn-primary btn-sm" },
                            { extend: "pdf", className: "btn btn-primary btn-sm" },
                            { extend: "print", className: "btn btn-primary btn-sm" }
                        ]
                    });
                }
            }, 500);
        }
    }, [calls]);

    // ✅ Delete Call for Paper
    const deleteCall = async (id) => {
        if (window.confirm("Are you sure you want to delete this call?")) {
            try {
                await axios.delete(`${BASE_URL}/api/call-for-paper/${id}`);
                setCalls(calls.filter((call) => call.callId !== id));
            } catch (error) {
                console.error("Error deleting call:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-26">
                    {/* ✅ Heading & Add Button Right-Aligned */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold">Call for Papers</h3>
                        <a href="/addcallforpapers" className="btn btn-success shadow-sm">
                            Add New
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table id="callsTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Issue Month</th>
                                    <th>Issue Year</th>
                                    <th>Deadline</th>
                                    <th>File</th>
                                    {/* <th>Status</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calls.length > 0 ? (
                                    calls.map((call, index) => (
                                        <tr key={call.callId}>
                                            <td>{index + 1}</td>
                                            <td>{call.issueMonth}</td>
                                            <td>{call.issueYear}</td>
                                            <td>{call.deadline}</td>
                                            <td>
                                                <a href={`${BASE_URL}/static${call.file}`} target="_blank" rel="noopener noreferrer">
                                                    {call.file}
                                                </a>
                                            </td>
                                            {/* <td>{call.status === 1 ? "Active" : "Inactive"}</td> */}
                                            <td>
                                                <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/addcallforpapers/${call.callId}`)}>
                                                    <FaEdit /> Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteCall(call.callId)}>
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No calls found.</td>
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

export default CallForPapers;
