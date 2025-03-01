import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddEditorialBoard = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL

    const [editor, setEditor] = useState({
        memberKey: "",
        journalId: "",
        prefix: "",
        editorName: "",
        editorAffiliation: "",
        editorEmail: "",
        editorType: "",
        profileLink: "",
        institutionalProfile: "",
        googleScholarProfile: "",
        orcidLink: "",
        publonLink: "",
        scopusAuthorId: "",
        researchGateProfile: "",
    });

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [removePhoto, setRemovePhoto] = useState(false); // ✅ Fix: Add this state
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

    // ✅ Fetch Editorial Board Member Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/editorial-board/${id}`)
                .then(response => {
                    const { createdDate, createdUserId, createdUserType, updatedDate, updatedUserId, updatedUserType, status, id, profilePhoto, ...editableFields } = response.data;
                    setEditor(editableFields);
                    if (profilePhoto) {
                        setProfilePhoto(`${BASE_URL}/uploads/${profilePhoto}`);
                    }
                })
                .catch(error => console.error("Error fetching editor:", error));
        }
    }, [id]);

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditor((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle Profile Photo Upload
    const handleFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
        setRemovePhoto(false); // Reset remove flag
    };

    // ✅ Remove Profile Photo
    const handleRemoveImage = () => {
        setProfilePhoto(null);
        setRemovePhoto(true); 
    };

    // ✅ Save or Update Editorial Board Member
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();

            // Append only editable editor data
            Object.keys(editor).forEach(key => {
                formData.append(key, editor[key] || "");
            });

            // Append profile photo separately
            if (profilePhoto && typeof profilePhoto !== "string") {
                formData.append("profilePhoto", profilePhoto);
            }

            if (removePhoto) {
                formData.append("removePhoto", "true");
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (id) {
                // Update existing editor
                await axios.put(`${BASE_URL}/api/editorial-board/${id}`, formData, config);
                setMessage("Editorial board member updated successfully!");
            } else {
                // Save new editor
                await axios.post(`${BASE_URL}/api/editorial-board`, formData, config);
                setMessage("Editorial board member added successfully!");
            }

            setTimeout(() => navigate('/editorial-board'), 2000);
        } catch (error) {
            console.error("Error saving editor:", error);
            setMessage("Failed to save editor. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{id ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}</h2>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Member Key */}
                    <div>
                        <label className="font-semibold text-green-600">Member Key *</label>
                        <input type="text" name="memberKey" value={editor.memberKey || ""} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Journal Selection */}
                    <div>
                        <label className="font-semibold text-green-600">Journal *</label>
                        <select 
                            name="journalId" 
                            value={editor.journalId || ""} 
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

                    {/* Prefix */}
                    <div>
                        <label className="font-semibold text-green-600">Prefix</label>
                        <input type="text" name="prefix" value={editor.prefix || ""} onChange={handleChange} className="form-control" />
                    </div>

                    {/* Editor Name */}
                    <div>
                        <label className="font-semibold text-green-600">Editor Name *</label>
                        <input type="text" name="editorName" value={editor.editorName || ""} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Affiliation */}
                    <div>
                        <label className="font-semibold text-green-600">Affiliation *</label>
                        <input type="text" name="editorAffiliation" value={editor.editorAffiliation || ""} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-semibold text-green-600">Email *</label>
                        <input type="email" name="editorEmail" value={editor.editorEmail || ""} onChange={handleChange} className="form-control" required />
                    </div>

                    <div>
                        <label className="font-semibold text-green-600">Editor Type *</label>
                        <select 
                            name="editorType" 
                            value={editor.editorType || ""} 
                            onChange={handleChange} 
                            className="form-control" 
                            required
                        >
                            <option value="">-- Select Editor Type --</option>
                            <option value="Chief Editor">Chief Editor</option>
                            <option value="Reviewer">Reviewer</option>
                            <option value="Associate Editor">Associate Editor</option>
                        </select>
                    </div>


                    {/* Social Media & Research Profiles */}
                    {["profileLink", "institutionalProfile", "googleScholarProfile", "orcidLink", "publonLink", "scopusAuthorId", "researchGateProfile"].map((field) => (
                        <div key={field}>
                            <label className="font-semibold text-green-600">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                            <input type="text" name={field} value={editor[field] || ""} onChange={handleChange} className="form-control" />
                        </div>
                    ))}

                          {/* Profile Photo Upload */}
                    
                    {/* Profile Photo Upload */}
                    <div>
                        <label className="font-semibold text-green-600">Profile Photo</label>
                        <input type="file" name="profilePhoto" onChange={handleFileChange} className="form-control" accept="image/*" />
                    </div>

                    {/* Show existing profile image with remove button */}
                    {id && profilePhoto && !removePhoto && (
                        <div className="relative">
                            <p className="font-semibold text-green-600">Current Profile Photo:</p>
                            <div className="relative">
                                <img 
                                    src={profilePhoto} 
                                    alt="Profile" 
                                    className="w-32 h-32 object-cover border"
                                    onError={(e) => { e.target.src = "/default-profile.png"; }} 
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
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
                        <button type="button" onClick={() => navigate('/editorial-board')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditorialBoard;
