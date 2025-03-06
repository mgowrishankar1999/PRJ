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
import JSZip from "jszip";
import pdfMake from "pdfmake";
import "pdfmake/build/vfs_fonts";
import { FaEdit, FaTrash } from "react-icons/fa";

function JournalMaster() {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [disciplines, setDisciplines] = useState({}); // Store discipline data in an object

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Journal Data
    const fetchJournals = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/journals`);
            setJournals(response.data);
        } catch (error) {
            console.error("Error fetching journals:", error);
        }
    };

    // ✅ Fetch Disciplines Data
    const fetchDisciplines = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/disciplines`);
            // Convert array into an object for easy lookup { 4: "Electrical Engineering", ... }
            const disciplineMap = {};
            response.data.forEach(discipline => {
                disciplineMap[discipline.id] = discipline.name;
            });
            setDisciplines(disciplineMap);
        } catch (error) {
            console.error("Error fetching disciplines:", error);
        }
    };

    useEffect(() => {
        fetchJournals();
        fetchDisciplines();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (journals.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#journalTable")) {
                    $("#journalTable").DataTable({
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
    }, [journals]);

    // ✅ Delete Journal
    const deleteJournal = async (id) => {
        if (window.confirm("Are you sure you want to delete this journal?")) {
            try {
                await axios.delete(`${BASE_URL}/api/journals/${id}`);
                setJournals(journals.filter((journal) => journal.id !== id));
                console.log(`Deleted journal with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting journal:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex h-screen ">
                <Sidebar />
                <div className="container py-20 h-full overflow-scroll">
                    <div className="d-flex justify-content-between align-items-center pb-2 ">
                        <h3 className="fw-bold text-uppercase">Journal List</h3>
                        <button onClick={() => navigate('/addnewjournal')} className="btn btn-success shadow-sm">
                            Add New
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table id="journalTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Discipline</th>
                                    <th>Journal Key</th>
                                    <th>Journal Name</th>
                                    <th>Abbreviation</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journals.length > 0 ? (
                                    journals.map((journal, index) => (
                                        <tr key={journal.id}>
                                            <td>{index + 1}</td> {/* ✅ S.No (Serial Number) */}
                                            <td>{disciplines[journal.disciplineId] || "Unknown"}</td> {/* ✅ Show Discipline Name */}
                                            <td>{journal.journalKey}</td>
                                            <td>{journal.journalName}</td>
                                            <td>{journal.abbrevation}</td>
                                            <td>{journal.email}</td>
                                            <td class='d-flex'>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addnewjournal/${journal.id}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteJournal(journal.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No journals found.</td>
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

export default JournalMaster;
