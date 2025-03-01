import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import { Editor } from "@tinymce/tinymce-react";

const AddIndexing = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const editorRef = useRef(null);

    const [indexing, setIndexing] = useState({
        journalId: "",
        otherDetails: ""
    });
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch indexing record (if editing) and journals for dropdown
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/indexing/${id}`)
                .then(response => {
                    setIndexing({
                        journalId: response.data.journalId || "",
                        otherDetails: response.data.otherDetails || ""
                    });
                })
                .catch(error => console.error("❌ Error fetching indexing record:", error));
        }

        axios.get(`${BASE_URL}/api/journals`)
            .then(response => setJournals(response.data))
            .catch(error => console.error("❌ Error fetching journals:", error));
    }, [id]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setIndexing({ ...indexing, [e.target.name]: e.target.value });
    };

    // ✅ Handle TinyMCE editor changes
    const handleEditorChange = (content) => {
        setIndexing({ ...indexing, otherDetails: content });
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requestData = {
                journalId: indexing.journalId,
                otherDetails: indexing.otherDetails
            };

            let response;
            if (id) {
                response = await axios.put(`${BASE_URL}/api/indexing/${id}`, requestData, {
                    headers: { "Content-Type": "application/json" }
                });
                setMessage("✅ Indexing record updated successfully!");
            } else {
                response = await axios.post(`${BASE_URL}/api/indexing`, requestData, {
                    headers: { "Content-Type": "application/json" }
                });
                setMessage("✅ Indexing record added successfully!");
            }

            console.log("✅ Success:", response.data);
            setTimeout(() => navigate("/indexing"), 2000);
        } catch (error) {
            console.error("❌ Error saving indexing record:", error);
            setMessage("❌ Failed to save indexing record.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-26 bg-white p-10 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {id ? "Edit Indexing Record" : "Add New Indexing Record"}
                    </h2>

                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Journal Selection */}
                        <div>
                            <label className="font-semibold text-green-600">Journal *</label>
                            <select
                                name="journalId"
                                value={indexing.journalId}
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

                        {/* Other Details using TinyMCE Editor */}
                        <div className="col-span-2">
                            <label className="font-semibold text-green-600">Other Details *</label>
                            <Editor
                                apiKey="jru2ftka8ewwu68zgu3u33hmfc5kjpy825l4ebkjrhkb8rca"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                value={indexing.otherDetails} // ✅ Correct binding
                                init={{
                                    height: 400,
                                    width: "100%",
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap preview",
                                        "anchor searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table code help wordcount"
                                    ],
                                    toolbar:
                                        "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                }}
                                onEditorChange={handleEditorChange} 
                            />
                        </div>

                        {/* Buttons */}
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? "Saving..." : id ? "Update" : "Save"}
                            </button>
                            <button type="button" onClick={() => navigate("/indexing")} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddIndexing;
