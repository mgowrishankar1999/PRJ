import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddNewUniversity = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL

    const [university, setUniversity] = useState({
        universityName: "",
        alternateName: "",
        address: "",
        country: "",
        website: "",
        papersPublished: "",
        universityCode: "",
    });

    const [logo, setLogo] = useState(null);
    const [removeLogo, setRemoveLogo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch University Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/universities/${id}`)
                .then(response => {
                    const { createdDate, createdUserId, createdUserType, updatedDate, updatedUserId, updatedUserType, status, logo, ...editableFields } = response.data;
                    setUniversity(editableFields);
                    if (logo) {
                        setLogo(`${BASE_URL}/uploads/${logo}`);
                    }
                })
                .catch(error => console.error("Error fetching university data:", error));
        }
    }, [id]);

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUniversity((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle File Upload
    const handleFileChange = (e) => {
        setLogo(e.target.files[0]);
        setRemoveLogo(false);
    };

    // ✅ Remove Existing Logo
    const handleRemoveLogo = () => {
        setLogo(null);
        setRemoveLogo(true);
    };

    // ✅ Save or Update University
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();

            // Append only editable university data
            Object.keys(university).forEach(key => {
                formData.append(key, university[key] || "");
            });

            // Append logo file separately
            if (logo && typeof logo !== "string") {
                formData.append("logo", logo);
            }

            if (removeLogo) {
                formData.append("removeLogo", "true");
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (id) {
                await axios.put(`${BASE_URL}/api/universities/${id}`, formData, config);
                setMessage("University updated successfully!");
            } else {
                await axios.post(`${BASE_URL}/api/universities`, formData, config);
                setMessage("University added successfully!");
            }

            setTimeout(() => navigate('/universities'), 2000);
        } catch (error) {
            console.error("Error saving university:", error);
            setMessage("Failed to save university. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{id ? "Edit University" : "Add New University"}</h2>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* University Name */}
                    <div>
                        <label className="font-semibold text-green-600">University Name *</label>
                        <input type="text" name="universityName" value={university.universityName} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Alternate Name */}
                    <div>
                        <label className="font-semibold text-green-600">Alternate Name</label>
                        <input type="text" name="alternateName" value={university.alternateName} onChange={handleChange} className="form-control" />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="font-semibold text-green-600">Address *</label>
                        <input type="text" name="address" value={university.address} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="font-semibold text-green-600">Country *</label>
                        <input type="text" name="country" value={university.country} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="font-semibold text-green-600">Website</label>
                        <input type="url" name="website" value={university.website} onChange={handleChange} className="form-control" />
                    </div>

                    {/* Papers Published */}
                    <div>
                        <label className="font-semibold text-green-600">Papers Published</label>
                        <input type="number" name="papersPublished" value={university.papersPublished} onChange={handleChange} className="form-control" />
                    </div>

                    {/* University Code */}
                    <div>
                        <label className="font-semibold text-green-600">University Code *</label>
                        <input type="text" name="universityCode" value={university.universityCode} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="font-semibold text-green-600">University Logo</label>
                        <input type="file" name="logo" onChange={handleFileChange} className="form-control" accept="image/*" />
                    </div>

                    {/* Show Existing Logo with Remove Option */}
                    {id && logo && !removeLogo && (
                        <div className="relative">
                            <p className="font-semibold text-green-600">Current Logo:</p>
                            <div className="relative">
                                <img 
                                    src={logo} 
                                    alt="University Logo" 
                                    className="w-32 h-32 object-cover border"
                                    onError={(e) => { e.target.src = "/default-logo.png"; }} 
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveLogo}
                                    className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                                >
                                    ✖
                                </button>
                            </div>
                        </div> 
                    )}

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <button type="submit" className="btn btn-success">{loading ? "Saving..." : id ? "Update" : "Save"}</button>
                        <button type="button" onClick={() => navigate('/universities')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewUniversity;
