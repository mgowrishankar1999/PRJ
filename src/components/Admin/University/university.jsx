import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin//navbar";
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

function University() {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch University Data
    const fetchUniversities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/universities`);
            setUniversities(response.data);
        } catch (error) {
            console.error("Error fetching universities:", error);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (universities.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#universityTable")) {
                    $("#universityTable").DataTable({
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
    }, [universities]);

    // ✅ Delete University
    const deleteUniversity = async (id) => {
        if (window.confirm("Are you sure you want to delete this university?")) {
            try {
                await axios.delete(`${BASE_URL}/api/universities/${id}`);
                setUniversities(universities.filter((uni) => uni.id !== id));
                console.log(`Deleted university with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting university:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex h-screen ">
                <Sidebar />
                <div className="container py-20 overflow-scroll">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold text-uppercase">University List</h3>
                        <button onClick={() => navigate('/addnewuniversity')} className="btn btn-success shadow-sm">
                            Add New
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table id="universityTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>University Name</th>
                                    <th>Address</th>
                                    <th>Country</th>
                                    <th>University Code</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities.length > 0 ? (
                                    universities.map((uni, index) => (
                                        <tr key={uni.id}>
                                            <td>{index + 1}</td> {/* ✅ S.No */}
                                            <td>{uni.universityName}</td> {/* ✅ University Name */}
                                            <td>{uni.address}</td> {/* ✅ Address */}
                                            <td>{uni.country}</td> {/* ✅ Country */}
                                            <td>{uni.universityCode}</td> {/* ✅ University Code */}
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addnewuniversity/${uni.id}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteUniversity(uni.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">No universities found.</td>
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

export default University;
