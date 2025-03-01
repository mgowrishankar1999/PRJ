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

function Indexing() {
    const [indexingData, setIndexingData] = useState([]);
    const [journals, setJournals] = useState({});
    const navigate = useNavigate();
    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Indexing Data
    const fetchIndexingData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/indexing`);
            setIndexingData(response.data);
        } catch (error) {
            console.error("Error fetching indexing data:", error);
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
        fetchIndexingData();
        fetchJournals();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (indexingData.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#indexingTable")) {
                    $("#indexingTable").DataTable({
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
    }, [indexingData]);

    // ✅ Delete Indexing Record
    const deleteIndexing = async (id) => {
        if (window.confirm("Are you sure you want to delete this indexing record?")) {
            try {
                await axios.delete(`${BASE_URL}/api/indexing/${id}`);
                setIndexingData(indexingData.filter((index) => index.indexId !== id));
                console.log(`Deleted indexing record with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting indexing record:", error);
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
                        <h3 className="fw-bold">Indexing Records</h3>
                        <a href="/addindexing" className="btn btn-success shadow-sm">
                            Add New
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table id="indexingTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Journal</th>
                                    <th>Other Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indexingData.length > 0 ? (
                                    indexingData.map((index, idx) => (
                                        <tr key={index.indexId}>
                                            <td>{idx + 1}</td>
                                            <td>{journals[index.journalId] || "Unknown Journal"}</td>
                                            <td>{index.otherDetails}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/addindexing/${index.indexId}`)}>
                                                    <FaEdit /> Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteIndexing(index.indexId)}>
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">No indexing records found.</td>
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

export default Indexing;
