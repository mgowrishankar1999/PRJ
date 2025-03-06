import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../common/modal"

const AddApcDataForm = () => {
    const [modal, setModal] = useState({ show: false, type: "success", message: "" });
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL

    const [formData, setFormData] = useState({
        journalId: "",
        acceptanceRate: "",
        submissionFinal: "",
        acceptancePublication: "",
        citeScore: "",
        lowerMiddlePrice: "",
        indexing1: "",
        indexing2: "",
        issuePerYear: "",
        apcPrice: "",
    });

    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Available Journals for Dropdown
    useEffect(() => {
        axios.get(`${BASE_URL}/api/journals`)
            .then(response => setJournals(response.data))
            .catch(error => console.error("Error fetching journals:", error));
    }, []);

    // ✅ Fetch APC Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/apc/${id}`)
                .then(response => {
                    if (response.data) {
                        const data = response.data;
                        setFormData({
                            journalId: data.journalId || "",
                            acceptanceRate: data.acceptanceRate || "",
                            submissionFinal: data.submissionFinal || "",
                            acceptancePublication: data.acceptancePublication || "",
                            citeScore: data.citeScore || "",
                            lowerMiddlePrice: data.lowerMiddlePrice || "",
                            indexing1: data.indexing1 || "",
                            indexing2: data.indexing2 || "",
                            issuePerYear: data.issuePerYear || "",
                            apcPrice: data.apcPrice || "",
                        });
                    }
                })
                .catch(error => console.error("Error fetching APC data:", error));
        }
    }, [id]);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ✅ Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        let response;
        try {
            if (id) {
                response = await axios.put(`${BASE_URL}/api/apc/${id}`, formData);
                setMessage("APC data updated successfully!");
            } else {
                response = await axios.post(`${BASE_URL}/api/apc`, formData);
                setMessage("APC data added successfully!");
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: id ? "Journal updated successfully!" : "Journal added successfully!",
                });

                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate('/apcdata');
                    window.scrollTo(0, 0);
                }, 900);
            }
        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
            console.error("Error saving APC data:", error);
            setMessage("Failed to save data. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{id ? "Edit APC Data" : "Add New APC Data"}</h2>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Journal Selection */}
                    <div>
                        <label className="font-semibold text-green-600">Journal *</label>
                        <select
                            name="journalId"
                            value={formData.journalId}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="">-- Select Journal --</option>
                            {journals.length > 0 ? (
                                journals.map((journal) => (
                                    <option key={journal.id} value={journal.id}>
                                        {journal.journalName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading journals...</option>
                            )}
                        </select>
                    </div>

                    {/* Acceptance Rate */}
                    <div>
                        <label className="font-semibold text-green-600">Acceptance Rate *</label>
                        <input type="text" name="acceptanceRate" value={formData.acceptanceRate} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Submission to Final Decision */}
                    <div>
                        <label className="font-semibold text-green-600">Submission to Final Decision (Days) *</label>
                        <input type="number" name="submissionFinal" value={formData.submissionFinal} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Acceptance to Publication */}
                    <div>
                        <label className="font-semibold text-green-600">Acceptance to Publication (Days) *</label>
                        <input type="number" name="acceptancePublication" value={formData.acceptancePublication} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Impact Factor Score */}
                    <div>
                        <label className="font-semibold text-green-600">Impact Factor Score *</label>
                        <input type="text" name="citeScore" value={formData.citeScore} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* APC Price */}
                    <div>
                        <label className="font-semibold text-green-600">APC Price *</label>
                        <input type="text" name="apcPrice" value={formData.apcPrice} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Indexing Details 1 */}
                    <div>
                        <label className="font-semibold text-green-600">Indexing Details 1</label>
                        <input type="text" name="indexing1" value={formData.indexing1} onChange={handleChange} className="form-control" />
                    </div>

                    {/* Indexing Details 2 */}
                    <div>
                        <label className="font-semibold text-green-600">Indexing Details 2</label>
                        <input type="text" name="indexing2" value={formData.indexing2} onChange={handleChange} className="form-control" />
                    </div>

                    {/* Issues Per Year */}
                    <div>
                        <label className="font-semibold text-green-600">Issues Per Year *</label>
                        <input type="number" name="issuePerYear" value={formData.issuePerYear} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Lower Middle Price */}


                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <button type="submit" className="btn btn-success">{loading ? "Saving..." : id ? "Update" : "Save"}</button>
                        <button type="button" onClick={() => {
                            navigate('/apcdata')
                            navigate("/indexing")
                        }
                        } className="btn btn-secondary">Cancel</button>
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

export default AddApcDataForm;
