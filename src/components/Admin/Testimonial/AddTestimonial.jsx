import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import Modal from "../../common/modal";

const AddTestimonial = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const [modal, setModal] = useState({ show: false, type: "success", message: "" });

    const [testimonial, setTestimonial] = useState({
        name: "",
        affiliation: "",
        content: "",
        link: "",
        status: "1"
    });

    const [photo, setPhoto] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [removePhoto, setRemovePhoto] = useState(false);
    const [removeAttachment, setRemoveAttachment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Testimonial Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/testimonial/${id}`)
                .then(response => {
                    const { photo, attachment, ...editableFields } = response.data;
                    setTestimonial(editableFields);
                    if (photo) {
                        setPhoto(`${BASE_URL}/uploads/${photo}`);
                    }
                    if (attachment) {
                        setAttachment(`${BASE_URL}/uploads/${attachment}`);
                    }
                })
                .catch(error => console.error("Error fetching testimonial:", error));
        }
    }, [id]);

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestimonial((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle File Uploads
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setRemovePhoto(false); // Reset remove flag
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
        setRemoveAttachment(false); // Reset remove flag
    };

    // ✅ Remove Files
    const handleRemovePhoto = () => {
        setPhoto(null);
        setRemovePhoto(true);
    };

    const handleRemoveAttachment = () => {
        setAttachment(null);
        setRemoveAttachment(true);
    };

    // ✅ Submit Form (Add or Update Testimonial)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            Object.keys(testimonial).forEach(key => {
                formData.append(key, testimonial[key] || "");
            });

            if (photo && typeof photo !== "string") {
                formData.append("photo", photo);
            }
            if (attachment && typeof attachment !== "string") {
                formData.append("attachment", attachment);
            }
            if (removePhoto) {
                formData.append("removePhoto", "true");
            }
            if (removeAttachment) {
                formData.append("removeAttachment", "true");
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (id) {
                // ✅ Update existing Testimonial
                await axios.put(`${BASE_URL}/api/testimonial/${id}`, formData, config);
                setMessage("Testimonial updated successfully!");
            } else {
                // ✅ Add new Testimonial
                await axios.post(`${BASE_URL}/api/testimonial`, formData, config);
                setMessage("Testimonial added successfully!");
            }
            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: id ? "Journal updated successfully!" : "Journal added successfully!",
                });

                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate('/testimonials');
                    window.scrollTo(0, 0);
                }, 800);
            }


        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
            console.error("Error saving testimonial:", error);
            setMessage("Failed to save testimonial.");
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
                        {id ? "Edit Testimonial" : "Add New Testimonial"}
                    </h2>

                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="font-semibold text-green-600">Name *</label>
                            <input type="text" name="name" value={testimonial.name} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Affiliation */}
                        <div>
                            <label className="font-semibold text-green-600">Affiliation *</label>
                            <input type="text" name="affiliation" value={testimonial.affiliation} onChange={handleChange} className="form-control" required />
                        </div>

                        {/* Content */}
                        <div className="col-span-2">
                            <label className="font-semibold text-green-600">Content *</label>
                            <textarea name="content" value={testimonial.content} onChange={handleChange} className="form-control" rows="4" required />
                        </div>

                        {/* Link */}
                        <div className="col-span-2">
                            <label className="font-semibold text-green-600">Website Link</label>
                            <input type="url" name="link" value={testimonial.link} onChange={handleChange} className="form-control" />
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="font-semibold text-green-600">Photo *</label>
                            <input type="file" onChange={handlePhotoChange} className="form-control" accept="image/*" />
                        </div>

                        {/* Show existing photo with remove button */}
                        {id && photo && !removePhoto && (
                            <div className="relative">
                                <p className="font-semibold text-green-600">Current Photo:</p>
                                <div className="relative">
                                    <img src={photo} alt="Testimonial" className="w-32 h-32 object-cover border" />
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="btn btn-danger btn-sm ms-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Attachment Upload */}
                        {/* <div>
                            <label className="font-semibold text-green-600">Attachment (Optional)</label>
                            <input type="file" onChange={handleAttachmentChange} className="form-control" accept=".pdf,.doc,.docx" />
                        </div> */}

                        {/* Show existing attachment with remove button */}
                        {id && attachment && !removeAttachment && (
                            <div className="relative">
                                <p className="font-semibold text-green-600">Current Attachment:</p>
                                <div className="relative">
                                    <a href={attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                        View Current Attachment
                                    </a>
                                    <button
                                        type="button"
                                        onClick={handleRemoveAttachment}
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
                            <select name="status" value={testimonial.status} onChange={handleChange} className="form-control">
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
                                navigate('/testimonial')
                            }} className="btn btn-secondary">
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

export default AddTestimonial;
