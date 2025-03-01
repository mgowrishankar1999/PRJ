import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSubscriptionFile = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        subscriptionId: "",
        fromYear: "",
        toYear: "",
        status: "1"
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Handle File Upload
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // ✅ Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
            if (file) {
                formData.append("file", file);
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            await axios.post(`${BASE_URL}/api/subscription-file`, formData, config);

            setMessage("Subscription file added successfully!");
            setTimeout(() => navigate("/subscription-files"), 2000);
        } catch (error) {
            console.error("Error uploading file:", error);
            setMessage("Failed to upload file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold">{loading ? "Uploading..." : "Add Subscription File"}</h3>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} className="border p-4 rounded">
                {/* <div className="mb-3">
                    <label className="form-label">Subscription ID *</label>
                    <input type="number" name="subscriptionId" value={form.subscriptionId} onChange={handleChange} className="form-control" required />
                </div> */}

                <div className="mb-3">
                    <label className="form-label">From Year *</label>
                    <input type="number" name="fromYear" value={form.fromYear} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">To Year *</label>
                    <input type="number" name="toYear" value={form.toYear} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">File *</label>
                    <input type="file" onChange={handleFileChange} className="form-control" accept=".pdf,.doc,.docx" required />
                </div>

                {/* <div className="mb-3">
                    <label className="form-label">Status *</label>
                    <select name="status" value={form.status} onChange={handleChange} className="form-control">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div> */}

                <button type="submit" className="btn btn-success">{loading ? "Uploading..." : "Upload"}</button>
                <button type="button" onClick={() => {
                    window.scrollTo(0, 0)
                    navigate("/subscriptionfile")
                }} className="btn btn-secondary ms-3">Cancel</button>
            </form>
        </div>
    );
};

export default AddSubscriptionFile;
