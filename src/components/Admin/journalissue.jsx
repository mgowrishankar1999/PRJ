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

function JournalIssue() {
    const navigate = useNavigate();
    const [journalIssues, setJournalIssues] = useState([]);
    const [journals, setJournals] = useState([]);

    // ✅ Fetch Journal Issues
    const fetchJournalIssues = async () => {
        try {
            const response = await axios.get("http://192.168.1.13:8080/api/journal-issues");
            setJournalIssues(response.data);
        } catch (error) {
            console.error("Error fetching journal issues:", error);
        }
    };

    // ✅ Fetch Journals
    const fetchJournals = async () => {
        try {
            const response = await axios.get("http://192.168.1.13:8080/api/journals");
            setJournals(response.data);
        } catch (error) {
            console.error("Error fetching journals:", error);
        }
    };
    console.log(journals)

    useEffect(() => {
        fetchJournalIssues();
        fetchJournals();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (journalIssues.length > 0) {
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
    }, [journalIssues]);

    const deleteJournal = async (id) => {
      if (window.confirm("Are you sure you want to delete this journal issue?")) {
          try {
              await axios.delete(`http://192.168.1.13:8080/api/journal-issues/${id}`);
              setJournalIssues((prevIssues) => prevIssues.filter((issue) => issue.issueId !== id));
              console.log(`Deleted journal issue with ID: ${id}`);
          } catch (error) {
              console.error("Error deleting journal issue:", error);
          }
      }
  };
  

    // ✅ Get Journal Name by Matching `journalsId` with `id`
    const getJournalName = (journalsId) => {
        const journal = journals.find((j) => j.id === journalsId);
        return journal ? journal.journalName : "Unknown Journal";
    };

    return (
        <>
            <Navbar />
            <div className="d-flex h-screen ">
                <Sidebar />
                <div className="container py-20 h-full  overflow-scroll">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                        <h3 className="fw-bold text-uppercase">Journal Issue List</h3>
                        <button onClick={() => navigate('/addnewjournalissue')} className="btn btn-success shadow-sm">
                            Add New
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table id="journalTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Journal</th>
                                    <th>Volume No</th>
                                    <th>Issue No</th>
                                    <th>Period</th>
                                    <th>Issue Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journalIssues.length > 0 ? (
                                    journalIssues.map((issue, index) => (
                                        <tr key={issue.issueId}>
                                            <td>{index + 1}</td>
                                            <td>{getJournalName(issue.journalsId)}</td>
                                            <td>{issue.volumeNo}</td>
                                            <td>{issue.issueNo}</td>
                                            <td>{`${issue.fromMonth} - ${issue.toMonth}, ${issue.year}`}</td>
                                            <td>{issue.specialIssue}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addnewjournalissue/${issue.issueId}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteJournal(issue.issueId)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No journal issues found.</td>
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

export default JournalIssue;
