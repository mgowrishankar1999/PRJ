import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddNewJournal = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL

    const [journal, setJournal] = useState(null); // Initially null to prevent errors
    const [coverPage, setCoverPage] = useState(null); // Separate state for file
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [removeImage, setRemoveImage] = useState(false); // Track image removal

    const BASE_URL = "http://192.168.1.13:8080"; // Change if backend URL is different

    // ✅ Fetch Disciplines for Dropdown
    useEffect(() => {
        axios.get(`${BASE_URL}/api/disciplines`)
            .then(response => setDisciplines(response.data))
            .catch(error => console.error("Error fetching disciplines:", error));
    }, []);

    // ✅ Fetch Journal Data for Editing
    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/journals/${id}`)
                .then(response => {
                    const { createdUserId, createdUserType, createdDate, updatedDate, updatedUserId, updatedUserType, status, ...editableFields } = response.data;
                    setJournal(editableFields); // ✅ Ensure state updates correctly
                    if (response.data.coverPage) {
                        setCoverPage(response.data.coverPage.startsWith("/") ? `${BASE_URL}${response.data.coverPage}` : response.data.coverPage);
                    }
                })
                .catch(error => console.error("Error fetching journal:", error));
        } else {
            // ✅ Set default values for new journal
            setJournal({
                disciplineId: "",
                journalKey: "",
                journalName: "",
                abbrevation: "",
                issnOnlineFrom: "",
                issnOnlineTo: "",
                issnPrintFrom: "",
                issnPrintTo: "",
                doi: "",
                publicationFrequency: "",
                subjectArea: "",
                coden: "",
                email: "",
                startMonth: "",
                startYear: "",
                coverPage: "",
                subPrice: "",
            });
        }
    }, [id]);

    // ✅ Handle Form Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJournal((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle File Upload
    const handleFileChange = (e) => {
        setCoverPage(e.target.files[0]); // Store file separately
        setRemoveImage(false); // Reset removeImage flag
    };

    // ✅ Remove Image
    const handleRemoveImage = () => {
        setCoverPage(null);
        setRemoveImage(true); // Mark image as removed
    };

    // ✅ Handle Discipline Selection
    const handleDisciplineChange = (e) => {
        setJournal((prev) => ({ ...prev, disciplineId: e.target.value }));
    };

    // ✅ Save or Update Journal (excluding non-editable fields)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();

            // Append only editable journal data
            Object.keys(journal).forEach(key => {
                formData.append(key, journal[key] || ""); // Prevent null values
            });

            // Append file separately
            if (coverPage && typeof coverPage !== "string") {
                formData.append("coverImage", coverPage);
            }

            // If removing an image, send a flag
            if (removeImage) {
                formData.append("removeImage", "true");
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (id) {
                // Update existing journal
                await axios.put(`${BASE_URL}/api/journals/${id}`, formData, config);
                setMessage("Journal updated successfully!");
            } else {
                // Save new journal
                await axios.post(`${BASE_URL}/api/journals`, formData, config);
                setMessage("Journal added successfully!");
            }

            setTimeout(() => navigate('/journal'), 2000);
        } catch (error) {
            console.error("Error saving journal:", error);
            setMessage("Failed to save journal. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[80vw] mx-auto h-auto bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{id ? "Edit Journal" : "Add New Journal"}</h2>

                {message && <div className="alert alert-info">{message}</div>}

                {journal && (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Discipline Dropdown */}
                        <div>
                            <label className="font-semibold text-green-600">Discipline</label>
                            <select 
                                name="disciplineId" 
                                value={journal.disciplineId || ""} 
                                onChange={handleDisciplineChange} 
                                className="form-control mb-3" 
                                required
                            >
                                <option value="">-- Select Discipline --</option>
                                {disciplines.length > 0 ? (
                                    disciplines.map((discipline) => (
                                        <option key={discipline.id} value={discipline.id}>
                                            {discipline.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Loading disciplines...</option>
                                )}
                            </select>
                        </div>
                        
                        {/* Journal Inputs */}
                        {Object.entries(journal).map(([key, value]) => (
                            key !== "disciplineId" &&
                            key !== "coverPage" && (
                                <div key={key} className="mb-3">
                                    <label className="font-semibold text-green-600">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={value || ""}
                                        onChange={handleChange}
                                        placeholder={key.replace(/([A-Z])/g, " $1").trim()} 
                                        className="form-control"
                                        required={["journalKey", "journalName", "publicationFrequency", "startMonth", "startYear"].includes(key)}
                                    />
                                </div>
                            )
                        ))}


                        {/* From Month */}
                            {/* <div className="mb-3">
                                <label className="font-semibold text-green-600">From Month *</label>
                                <select 
                                    name="fromMonth" 
                                    value={journal.fromMonth || ""} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    required
                                >
                                    <option value="">-- Select Month --</option>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div> */}

                            {/* To Month */}
                            {/* <div className="mb-3">
                                <label className="font-semibold text-green-600">To Month *</label>
                                <select 
                                    name="toMonth" 
                                    value={journal.toMonth || ""} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    required
                                >
                                    <option value="">-- Select Month --</option>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div> */}

                            {/* Year */}
                            {/* <div className="mb-3">
                                <label className="font-semibold text-green-600">Year *</label>
                                <input 
                                    type="number" 
                                    name="year" 
                                    value={journal.year || ""} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    min="1900" 
                                    max="2100" 
                                    required 
                                />
                            </div> */}


                        {/* Cover Image Upload */}
                        <div className="mb-3">
                            <label className="font-semibold text-green-600">Cover Image</label>
                            <input type="file" name="coverImage" onChange={handleFileChange} className="form-control" accept="image/*" />
                        </div>

                        {/* Show existing cover image when editing */}
                        {id && coverPage && (
                            <div className="mb-3">
                                <p className="font-semibold text-green-600">Current Cover Image:</p>
                                <div className="relative">
                                    <img 
                                        src={coverPage} 
                                        alt="Cover" 
                                        className="w-32 h-32 object-cover border"
                                        onError={(e) => { e.target.src = "/default-image.png"; }} // Fallback image
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -left-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4 col-span-2">
                            <button type="submit" className="btn btn-success">
                                {loading ? "Saving..." : id ? "Update" : "Save"}
                            </button>
                            <button type="button" onClick={() => navigate('/journal')} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddNewJournal;
