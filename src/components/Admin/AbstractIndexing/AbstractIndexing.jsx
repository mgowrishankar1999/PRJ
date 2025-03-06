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

function AbstractIndexing() {
    const [abstractData, setAbstractData] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Abstract Indexing Data
    const fetchAbstractData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/abstract-indexing`);
            setAbstractData(response.data);
        } catch (error) {
            console.error("Error fetching abstract indexing data:", error);
        }
    };

    useEffect(() => {
        fetchAbstractData();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (abstractData.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#abstractTable")) {
                    $("#abstractTable").DataTable({
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
    }, [abstractData]);

    // ✅ Delete Abstract Indexing Record
    const deleteAbstract = async (id) => {
        if (window.confirm("Are you sure you want to delete this abstract?")) {
            try {
                await axios.delete(`${BASE_URL}/api/abstract-indexing/${id}`);
                setAbstractData(abstractData.filter((item) => item.absId !== id));
                console.log(`Deleted abstract with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting abstract indexing record:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex h-screen">
                <Sidebar />
                <div className="container py-20 overflow-scroll">
                    {/* ✅ Heading & Add Button Right-Aligned */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold">Abstract Indexing Records</h3>
                        <a href="/addabstractindexing" className="btn btn-success shadow-sm">
                            Add New
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table id="abstractTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {abstractData.length > 0 ? (
                                    abstractData.map((item, idx) => (
                                        <tr key={item.absId}>
                                            <td>{idx + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.content}</td>
                                            {/* <td>
                                                {item.image ? (
                                                    <img src={`${BASE_URL}/uploads/${item.image}`} alt="Image" className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
                                                ) : "No Image"}
                                            </td> */}
                                            <td class=' flex'>
                                                <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/addabstractindexing/${item.absId}`)}>
                                                    <FaEdit /> Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteAbstract(item.absId)}>
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">No abstract indexing records found.</td>
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

export default AbstractIndexing;
