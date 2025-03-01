import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../common/modal";

const AddNewJournalIssue = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const [modal, setModal] = useState({ show: false, type: "success", message: "" });

    const [journalIssue, setJournalIssue] = useState({
        journalsId: "",
        volumeNo: "",
        issueNo: "",
        fromMonth: "",
        toMonth: "",
        year: "",
        specialIssue: "No",
        specialIssueTitle: "",
        tableOfContents: null,
    });

    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [filePreview, setFilePreview] = useState(null);

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Available Journals for Dropdown
    useEffect(() => {
        axios.get(`${BASE_URL}/api/journals`)
            .then(response => setJournals(response.data))
            .catch(error => console.error("Error fetching journals:", error));
    }, []);

    // ✅ Fetch Journal Issue Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/journal-issues/${id}`)
                .then(response => {
                    if (response.data) {
                        setJournalIssue({
                            journalsId: response.data.journalsId || "",
                            volumeNo: response.data.volumeNo || "",
                            issueNo: response.data.issueNo || "",
                            fromMonth: response.data.fromMonth || "",
                            toMonth: response.data.toMonth || "",
                            year: response.data.year || "",
                            specialIssue: response.data.specialIssue || "No",
                            specialIssueTitle: response.data.specialIssueTitle || "",
                            tableOfContents: response.data.tableOfContents || null,
                        });

                        if (response.data.tableOfContents) {
                            setFilePreview(`${BASE_URL}${response.data.tableOfContents}`);
                        }
                    }
                })
                .catch(error => console.error("Error fetching journal issue:", error));
        }
    }, [id]);

    // ✅ Handle Form Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJournalIssue((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ✅ Handle File Upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setJournalIssue({ ...journalIssue, tableOfContents: file });

        // 🔥 Preview for PDF Files
        if (file) {
            setFilePreview(URL.createObjectURL(file));
        }
    };

    // ✅ Remove Uploaded File
    const removeFile = () => {
        setJournalIssue({ ...journalIssue, tableOfContents: null });
        setFilePreview(null);
    };

    // ✅ Save or Update Journal Issue
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            Object.keys(journalIssue).forEach(key => {
                if (journalIssue[key]) {
                    formData.append(key, journalIssue[key]);
                }
            });

            if (journalIssue.tableOfContents instanceof File) {
                formData.append("tableOfContents", journalIssue.tableOfContents);
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;

            if (id) {
                response = await axios.put(`${BASE_URL}/api/journal-issues/${id}`, formData, config);
            } else {
                response = await axios.post(`${BASE_URL}/api/journal-issues`, formData, config);
            }

            // ✅ Ensure response is properly checked
            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: id ? "Journal Issue updated successfully!" : "Journal Issue added successfully!",
                });

                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate('/journalissue');
                    window.scrollTo(0, 0);
                }, 2000);
            }
        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to save Journal Issue. Try again." });
            console.error("Error saving journal issue:", error);
            setMessage("Failed to save journal issue. Try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">{id ? "Edit Journal Issue" : "Add Journal Issue"}</h2>

                {message && <div className="alert alert-info mb-4">{message}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Journal Name */}
                    <div>
                        <label className="font-semibold text-green-600">Journal Name *</label>
                        <select
                            name="journalsId"
                            value={journalIssue.journalsId || ""}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="">--Select Journal Name --</option>
                            {journals.map((journal) => (
                                <option key={journal.id} value={journal.id}>{journal.journalName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Volume */}
                    <div>
                        <label className="font-semibold text-green-600">Volume *</label>
                        <input type="text" name="volumeNo" value={journalIssue.volumeNo} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Issue */}
                    <div>
                        <label className="font-semibold text-green-600">Issue *</label>
                        <input type="text" name="issueNo" value={journalIssue.issueNo} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* From Month */}
                    <div>
                        <label className="font-semibold text-green-600">From Month *</label>
                        <input type="text" name="fromMonth" value={journalIssue.fromMonth} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* To Month */}
                    <div>
                        <label className="font-semibold text-green-600">To Month *</label>
                        <input type="text" name="toMonth" value={journalIssue.toMonth} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="font-semibold text-green-600">Year *</label>
                        <input type="number" name="year" value={journalIssue.year || ""} onChange={handleChange} className="form-control" min="1900" max="2100" required />
                    </div>

                    {/* Special Issue */}
                    <div>
                        <label className="font-semibold text-green-600">Special Issue *</label>
                        <select name="specialIssue" value={journalIssue.specialIssue} onChange={handleChange} className="form-control" required>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>

                    {/* Special Issue Title */}
                    {journalIssue.specialIssue === "Yes" && (
                        <div>
                            <label className="font-semibold text-green-600">Special Issue Title *</label>
                            <input type="text" name="specialIssueTitle" value={journalIssue.specialIssueTitle} onChange={handleChange} className="form-control" required />
                        </div>
                    )}

                    {/* PDF Upload */}
                    <div>
                        <label className="font-semibold text-green-600">Table Of Contents (PDF)</label>
                        <input type="file" name="tableOfContents" onChange={handleFileChange} className="form-control" accept="application/pdf" />

                        {/* PDF Preview */}
                        {filePreview && (
                            <div className="mt-2">
                                <a href={filePreview} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">📄 View PDF</a>
                                <button type="button" onClick={removeFile} className="ml-4 text-red-600">❌ Remove</button>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <button type="submit" className="btn btn-success">{loading ? "Saving..." : id ? "Update" : "Save"}</button>
                        <button type="button" onClick={() => {
                            window.scrollTo(0, 0)
                            navigate('/journalissue')
                        }}
                            className="btn btn-secondary">Back</button>
                    </div>
                </form>
            </div>
            <Modal
                show={modal.show}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ show: false, type: "", message: "" })}
            />
        </div>
    );
};

export default AddNewJournalIssue;
