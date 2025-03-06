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

function Disciplinemaster() {
    const navigate = useNavigate();
    const [disciplines, setDisciplines] = useState([]);

    // ✅ Fetch Data from API
    const fetchDisciplines = async () => {
        try {
            const response = await axios.get("http://192.168.1.13:8080/api/disciplines");
            setDisciplines(response.data);
        } catch (error) {
            console.error("Error fetching disciplines:", error);
        }
    };

    useEffect(() => {
        fetchDisciplines();
    }, []);

    // ✅ Initialize DataTable on Data Change
    useEffect(() => {
        if (disciplines.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#disciplineTable")) {
                    $("#disciplineTable").DataTable({
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
    }, [disciplines]);


    // ✅ Delete Function
    const deleteDiscipline = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://192.168.1.13:8080/api/disciplines/${id}`);
                setDisciplines(disciplines.filter((discipline) => discipline.id !== id));
                console.log(`Deleted discipline with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting discipline:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex max-h-screen  ">
                <Sidebar />
                <div className="container py-20 overflow-scroll">
                    <div className="d-flex justify-content-between  align-items-center pb-2">
                        <h3 className="fw-bold text-uppercase">Discipline List</h3>
                        <button onClick={() => navigate('/addnew')} className="btn btn-success shadow-sm">
                            Add New
                        </button>
                    </div>

                    <div className="table-responsive ">
                        <table id="disciplineTable" className="  table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>No</th>
                                    <th>Discipline Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disciplines.length > 0 ? (
                                    disciplines.map((discipline, index) => (
                                        <tr key={discipline.id}>
                                            <td>{index + 1}</td>
                                            <td>{discipline.name}</td>
                                            <td class='flex'>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addnew/${discipline.id}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteDiscipline(discipline.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center text-muted">No disciplines found.</td>
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

export default Disciplinemaster;
