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

function EditorialBoard() {
    const navigate = useNavigate();
    const [editors, setEditors] = useState([]);
    const [journals, setJournals] = useState({}); // Store journal names for lookup

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Editorial Board Members
    const fetchEditorialBoard = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/editorial-board`);
            setEditors(response.data);
        } catch (error) {
            console.error("Error fetching editorial board:", error);
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
        fetchEditorialBoard();
        fetchJournals();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (editors.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#editorTable")) {
                    $("#editorTable").DataTable({
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
    }, [editors]);

    // ✅ Delete Editorial Board Member
    const deleteEditor = async (id) => {
        if (window.confirm("Are you sure you want to delete this editor?")) {
            try {
                await axios.delete(`${BASE_URL}/api/editorial-board/${id}`);
                setEditors(editors.filter((editor) => editor.id !== id));
                console.log(`Deleted editor with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting editor:", error);
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
                        <h3 className="fw-bold text-uppercase">Editorial Board</h3>
                        <button onClick={() => navigate('/addneweditorialboard')} className="btn btn-success shadow-sm">
                            Add New
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table id="editorTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Journal</th>
                                    <th>Editor Name</th>
                                    <th>Affiliation</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    {/* <th>Profile Photo</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editors.length > 0 ? (
                                    editors.map((editor, index) => (
                                        <tr key={editor.id}>
                                            <td>{index + 1}</td> {/* ✅ S.No */}
                                            <td>{journals[editor.journalId] || "Unknown Journal"}</td> {/* ✅ Get Journal Name */}
                                            <td>{editor.prefix} {editor.editorName}</td>
                                            <td>{editor.editorAffiliation}</td>
                                            <td>{editor.editorEmail}</td>
                                            <td>{editor.editorType}</td>
                                            {/* <td>
                                                {editor.profilePhoto ? (
                                                    <img 
                                                        src={`${BASE_URL}/uploads/${editor.profilePhoto}`} 
                                                        alt="Profile" 
                                                        className="img-thumbnail"
                                                        style={{ width: "50px", height: "50px" }}
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td> */}
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addneweditorialboard/${editor.id}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteEditor(editor.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted">No editors found.</td>
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

export default EditorialBoard;
