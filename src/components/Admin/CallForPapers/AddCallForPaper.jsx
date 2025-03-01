import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import Modal from "../../common/modal";

const AddCallForPaper = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const [modal, setModal] = useState({ show: false, type: "success", message: "" });
    const [callForPaper, setCallForPaper] = useState({
        issueMonth: "",
        issueYear: "",
        deadline: "",
        dispatchMonth: "",
        dispatchYear: "",
        dispatchDate: "",
        status: "1",
    });

    const [file, setFile] = useState(null);
    const [removeFile, setRemoveFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Call for Paper Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/call-for-paper/${id}`)
                .then(response => {
                    const { file, ...editableFields } = response.data;
                    setCallForPaper(editableFields);
                    if (file) {
                        setFile(`${BASE_URL}/uploads/${file}`);
                    }
                })
                .catch(error => console.error("Error fetching Call for Paper:", error));
        }
    }, [id]);

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCallForPaper((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle File Upload
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setRemoveFile(false); // Reset remove flag
    };

    // ✅ Remove File
    const handleRemoveFile = () => {
        setFile(null);
        setRemoveFile(true);
    };

    // ✅ Submit Form (Add or Update Call for Paper)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            Object.keys(callForPaper).forEach(key => {
                formData.append(key, callForPaper[key] || "");
            });

            if (file && typeof file !== "string") {
                formData.append("file", file);
            }
            if (removeFile) {
                formData.append("removeFile", "true");
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            let response;
            if (id) {
                // ✅ Update existing Call for Paper
                response = await axios.put(`${BASE_URL}/api/call-for-paper/${id}`, formData, config);
                setMessage("Call for Paper updated successfully!");
            } else {
                // ✅ Add new Call for Paper
                response = await axios.post(`${BASE_URL}/api/call-for-paper`, formData, config);
                setMessage("Call for Paper added successfully!");
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: id ? "Journal updated successfully!" : "Journal added successfully!",
                });

                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate('/callforpapers');
                    window.scrollTo(0, 0);
                }, 800);
            }

        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
            console.error("Error saving Call for Paper:", error);
            setMessage("Failed to save Call for Paper.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-4 bg-white p-10 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {id ? "Edit Call for Paper" : "Add New Call for Paper"}
                    </h2>

                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Issue Month */}
                        <div>
                            <label className="font-semibold text-green-600">Issue Month *</label>
                            <input type="text" name="issueMonth" value={callForPaper.issueMonth} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Issue Year */}
                        <div>
                            <label className="font-semibold text-green-600">Issue Year *</label>
                            <input type="number" name="issueYear" value={callForPaper.issueYear} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="font-semibold text-green-600">Deadline *</label>
                            <input type="date" name="deadline" value={callForPaper.deadline} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Dispatch Month */}
                        <div>
                            <label className="font-semibold text-green-600">Dispatch Month *</label>
                            <input type="text" name="dispatchMonth" value={callForPaper.dispatchMonth} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Dispatch Year */}
                        <div>
                            <label className="font-semibold text-green-600">Dispatch Year *</label>
                            <input type="number" name="dispatchYear" value={callForPaper.dispatchYear} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Dispatch Date */}
                        <div>
                            <label className="font-semibold text-green-600">Dispatch Date *</label>
                            <input type="date" name="dispatchDate" value={callForPaper.dispatchDate} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="font-semibold text-green-600">File *</label>
                            <input type="file" onChange={handleFileChange} className="form-control" accept=".pdf,.doc,.docx" />
                        </div>

                        {/* Show existing file with remove button */}
                        {id && file && !removeFile && (
                            <div className="relative">
                                <p className="font-semibold text-green-600">Current File:</p>
                                <div className="relative">
                                    <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                        View Current File
                                    </a>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="btn btn-danger btn-sm ms-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Status */}
                        {/* <div>
                            <label className="font-semibold text-green-600">Status *</label>
                            <select name="status" value={callForPaper.status} onChange={handleChange} className="form-control">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div> */}

                        {/* Buttons */}
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <button type="submit" className="btn btn-success">
                                {loading ? "Saving..." : id ? "Update" : "Save"}
                            </button>
                            <button type="button" onClick={() => {
                                window.scrollTo(0, 0)
                                navigate('/callforpapers')
                            }}
                                className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
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

export default AddCallForPaper;
