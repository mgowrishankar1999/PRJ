import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Admin/sidebar";
import Navbar from "../Admin/navbar";
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

function apcdata() {
    const navigate = useNavigate();
    const [apcData, setApcData] = useState([]);
    const [journals, setJournals] = useState({}); // Store journal names for lookup

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch APC Data
    const fetchApcData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/apc`);
            setApcData(response.data);
        } catch (error) {
            console.error("Error fetching APC data:", error);
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
        fetchApcData();
        fetchJournals();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (apcData.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#apcTable")) {
                    $("#apcTable").DataTable({
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
    }, [apcData]);

    // ✅ Delete APC Data
    const deleteApc = async (id) => {
        if (window.confirm("Are you sure you want to delete this APC record?")) {
            try {
                await axios.delete(`${BASE_URL}/api/apc/${id}`);
                setApcData(apcData.filter((apc) => apc.id !== id));
                console.log(`Deleted APC record with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting APC record:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex mb-10">
                <Sidebar />
                <div className="container mt-30 h-full">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold text-uppercase">APC Data List</h3>
                        <button onClick={() => navigate('/addnewapcdata')} className="btn btn-success shadow-sm">
                            Add New
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table id="apcTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Journal</th>
                                    <th>Acceptance Rate</th>
                                    <th>Submission to Final Decision</th>
                                    <th>Issues Per Year</th>
                                    <th>Indexing Details 2</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apcData.length > 0 ? (
                                    apcData.map((apc, index) => (
                                        <tr key={apc.id}>
                                            <td>{index + 1}</td> {/* ✅ S.No */}
                                            <td>{journals[apc.journalId] || "Unknown Journal"}</td> {/* ✅ Get Journal Name */}
                                            <td>{apc.acceptanceRate}</td>
                                            <td>{apc.submissionFinal} Days</td>
                                            <td>{apc.issuePerYear}</td>
                                            <td>{apc.indexing2}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addnewapcdata/${apc.id}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteApc(apc.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No APC data found.</td>
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

export default apcdata;
