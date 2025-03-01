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

function SubscriptionFiles() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://192.168.1.13:8080";

    const fetchSubscriptionFiles = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/subscription-file`);
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching subscription files:", error);
        }
    };

    useEffect(() => {
        fetchSubscriptionFiles();
    }, []);

    useEffect(() => {
        if (files.length > 0) {
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
                            { extend: "print", className: "btn btn-primary btn-sm" }
                        ]
                    });
                }
            }, 500);
        }
    }, [files]);

    const deleteFile = async (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            try {
                await axios.delete(`${BASE_URL}/api/subscription-file/${id}`);
                setFiles(files.filter((file) => file.id !== id));
            } catch (error) {
                console.error("Error deleting file:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-26">
                    {/* <h3 className="fw-bold">Subscription Files</h3> */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold">Subscription Files</h3>
                        <a href="/addnewsubscriptionfile" className="btn btn-success shadow-sm">
                            Add New
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table id="subscriptionTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Subscription ID</th>
                                    <th>From Year</th>
                                    <th>To Year</th>
                                    <th>File</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.length > 0 ? (
                                    files.map((file, index) => (
                                        <tr key={file.id}>
                                            <td>{index + 1}</td>
                                            <td>{file.subscriptionId}</td>
                                            <td>{file.fromYear}</td>
                                            <td>{file.toYear}</td>
                                            <td>
                                                <a href={`${BASE_URL}/static${file.file}`} target="_blank" rel="noopener noreferrer">
                                                    {file.file}
                                                </a>
                                            </td>
                                            <td>{file.status === 1 ? "Active" : "Inactive"}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/edit-subscription-file/${file.id}`)}>
                                                    <FaEdit /> Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteFile(file.id)}>
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No subscription files found.</td>
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

export default SubscriptionFiles;
