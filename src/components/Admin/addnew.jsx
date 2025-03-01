import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddNew = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get discipline ID from URL
    const [disciplineName, setDisciplineName] = useState("");
    const [department, setDepartment] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Fetch existing data if editing
    useEffect(() => {
        if (id) {
            axios.get(`http://192.168.1.13:8080/api/disciplines/${id}`)
                .then(response => {
                    setDisciplineName(response.data.name);
                    setDepartment(response.data.department);
                })
                .catch(error => console.error("Error fetching discipline:", error));
        }
    }, [id]);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const requestData = {
            name: disciplineName,
            department: department,  
            updatedUserId: null,
            updatedUserType: null,
        };

        try {
            let response;
            if (id) {
                // ✅ Update existing discipline
                response = await axios.put(`http://192.168.1.13:8080/api/disciplines/${id}`, requestData);
            } else {
                // ✅ Add new discipline
                response = await axios.post("http://192.168.1.13:8080/api/disciplines", requestData);
            }

            if (response.status === 200 || response.status === 201) {
                setMessage(id ? "Discipline updated successfully!" : "Discipline added successfully!");
                setTimeout(() => navigate('/disciplinemaster'), 2000);
            }
        } catch (error) {
            console.error("Error saving discipline:", error);
            setMessage("Failed to save discipline. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[80vw] mx-auto h-auto bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="mr-2">📌</span> {id ? "Edit Discipline" : "Add Discipline"}
                </h2>

                {message && (
                    <div className={`mb-4 p-2 rounded ${message.includes("success") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={disciplineName}
                        onChange={(e) => setDisciplineName(e.target.value)}
                        placeholder="Enter discipline name"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        required
                    />
                    <button type="submit" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
                        {loading ? "Saving..." : id ? "🔄 Update" : "✅ Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNew;
