// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddSubscriptionFile = () => {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         subscriptionId: "",
//         fromYear: "",
//         toYear: "",
//         status: "1"
//     });
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     const BASE_URL = "http://192.168.1.13:8080";

//     // ✅ Handle Input Change
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // ✅ Handle File Upload
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // ✅ Handle Form Submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const formData = new FormData();
//             Object.keys(form).forEach(key => {
//                 formData.append(key, form[key]);
//             });
//             if (file) {
//                 formData.append("file", file);
//             }

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             await axios.post(`${BASE_URL}/api/subscription-file`, formData, config);

//             setMessage("Subscription file added successfully!");
//             setTimeout(() => navigate("/subscriptionfile"), 2000);
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             setMessage("Failed to upload file.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h3 className="fw-bold">{loading ? "Uploading..." : "Add Subscription File"}</h3>

//             {message && <div className="alert alert-info">{message}</div>}

//             <form onSubmit={handleSubmit} className="border p-4 rounded">
//                 {/* <div className="mb-3">
//                     <label className="form-label">Subscription ID *</label>
//                     <input type="number" name="subscriptionId" value={form.subscriptionId} onChange={handleChange} className="form-control" required />
//                 </div> */}

//                 <div className="mb-3">
//                     <label className="form-label">From Year *</label>
//                     <input type="number" name="fromYear" value={form.fromYear} onChange={handleChange} className="form-control" required />
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">To Year *</label>
//                     <input type="number" name="toYear" value={form.toYear} onChange={handleChange} className="form-control" required />
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">File *</label>
//                     <input type="file" onChange={handleFileChange} className="form-control" accept=".pdf,.doc,.docx" required />
//                 </div>

//                 <button type="submit" className="btn btn-success">{loading ? "Uploading..." : "Upload"}</button>
//                 <button type="button" onClick={() => {
//                     window.scrollTo(0, 0)
//                     navigate("/subscriptionfile")
//                 }} className="btn btn-secondary ms-3">Cancel</button>
//             </form>
//         </div>
//     );
// };

// export default AddSubscriptionFile;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../common/modal";

const AddSubscriptionFile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get subscription file ID from URL if editing

    const [modal, setModal] = useState({ show: false, type: "success", message: "" });

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

    // ✅ Fetch existing subscription file data if editing
    useEffect(() => {
        if (id) {
            const fetchSubscriptionFile = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/subscription-file/${id}`);
                    setForm(response.data);
                } catch (error) {
                    console.error("Error fetching subscription file:", error);
                    setMessage("Failed to load subscription file details.");
                }
            };
            fetchSubscriptionFile();
        }
    }, [id]);

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
        let response;
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
            if (file) {
                formData.append("file", file);
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (id) {
                response = await axios.put(`${BASE_URL}/api/subscription-file/${id}`, formData, config);
                setMessage("Subscription file updated successfully!");
            } else {
                response = await axios.post(`${BASE_URL}/api/subscription-file`, formData, config);
                setMessage("Subscription file added successfully!");
            }



            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: id ? "subscriptionfile updated successfully!" : "subscriptionfile added successfully!",
                });

                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate('/subscriptionfile');
                    window.scrollTo(0, 0);
                }, 800);
            }

        } catch (error) {
            console.error("Error saving subscription file:", error);
            setMessage("Failed to save subscription file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold">{loading ? "Processing..." : id ? "Edit Subscription File" : "Add Subscription File"}</h3>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} className="border p-4 rounded">
                <div className="mb-3">
                    <label className="form-label">Subscription ID *</label>
                    <input type="text" name="subscriptionId" value={form.subscriptionId || ""} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">From Year *</label>
                    <input type="number" name="fromYear" value={form.fromYear || ""} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">To Year *</label>
                    <input type="number" name="toYear" value={form.toYear || ""} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">File *</label>
                    <input type="file" onChange={handleFileChange} className="form-control" accept=".pdf,.doc,.docx" />
                </div>

                <button type="submit" className="btn btn-success">{loading ? "Saving..." : id ? "Update" : "Upload"}</button>
                <button type="button" onClick={() => navigate("/subscriptionfile")} className="btn btn-secondary ms-3">Cancel</button>
            </form>

            <Modal
                show={modal.show}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ show: false, type: "", message: "" })}
            />
        </div>
    );
};

export default AddSubscriptionFile;
