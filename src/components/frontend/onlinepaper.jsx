import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";

const BASE_URL = "http://192.168.1.13:8080";

const OnlinePaperSubmission = () => {
  // 🔹 Form State
  const [formData, setFormData] = useState({
    disciplineId: "",
    journalId: "",
    title: "",
    pages: "",
    file: null,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    articleId: "",
  });

  const [disciplines, setDisciplines] = useState([]);
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Disciplines & Journals
  useEffect(() => {
    axios.get(`${BASE_URL}/api/disciplines`)
      .then(response => setDisciplines(response.data))
      .catch(error => console.error("Error fetching disciplines:", error));

    axios.get(`${BASE_URL}/api/journals`)
      .then(response => setJournals(response.data))
      .catch(error => console.error("Error fetching journals:", error));
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Discipline Change & Filter Journals
  const handleDisciplineChange = (e) => {
    const selectedValue = e.target.value;
    const selectedDisciplineId = selectedValue ? Number(selectedValue) : "";

    setFormData(prev => ({
      ...prev,
      disciplineId: selectedDisciplineId,
      journalId: "", // Reset journal selection when discipline changes
    }));

    // ✅ Filter journals based on selected discipline
    if (selectedDisciplineId) {
      const filtered = journals.filter(journal => journal.disciplineId === selectedDisciplineId);
      setFilteredJournals(filtered);
    } else {
      setFilteredJournals([]);
    }
  };

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("Final Data Sent:", formData); // ✅ Debugging

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(`${BASE_URL}/api/submissions`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data); // ✅ Debug API Response

      if (response.status === 200) {
        setMessage("✅ Submission Successful!");
        setFormData({
          disciplineId: "", journalId: "", title: "", pages: "",
          file: null, firstName: "", lastName: "", email: "", country: "", articleId: "",
        });
        setFilteredJournals([]); // Reset filtered journals after submission
      }
    } catch (error) {
      console.error("Submission Error:", error);
      if (error.response) {
        setMessage(`❌ Submission Failed: ${error.response.data}`);
      } else {
        setMessage("❌ Submission Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeNavbar />
      <MenuBar />
      <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
        <aside className="w-1/4 p-2 rounded-lg shadow-sm">
          <SidebarList />
        </aside>

        {/* Main Content */}
        <main className="w-3/4 bg-white p-8 shadow-xl rounded-lg border-t-4 border-blue-500">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Online Paper Submission</h1>

          {message && (
            <div className={`alert ${message.includes("⚠") ? "bg-yellow-100 text-yellow-700" : message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} p-3 rounded mt-4`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4" encType="multipart/form-data">

            {/* 🔹 Discipline Selection */}
            <div>
              <label className="block font-medium">Discipline *</label>
              <select name="disciplineId" value={formData.disciplineId || ""} onChange={handleDisciplineChange} className="w-full border p-2 rounded" required>
                <option value="">-- Select Discipline --</option>
                {disciplines.map(discipline => (
                  <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                ))}
              </select>
            </div>

            {/* 🔹 Journal Selection (Filtered Based on Discipline) */}
            <div>
              <label className="block font-medium">Journal Name *</label>
              <select name="journalId" value={formData.journalId} onChange={handleChange} className="w-full border p-2 rounded" required>
                <option value="">-- Select Journal --</option>
                {filteredJournals.map(journal => (
                  <option key={journal.id} value={journal.id}>{journal.journalName}</option>
                ))}
              </select>
            </div>

            {/* 🔹 Other Fields */}
            {["title", "pages", "firstName", "lastName", "email", "country"].map((field, index) => (
              <div key={index}>
                <label className="block font-medium">{field.replace(/([A-Z])/g, " $1").trim()} *</label>
                <input type="text" name={field} value={formData[field]} onChange={handleChange} className="w-full border p-2 rounded" required />
              </div>
            ))}

            {/* 🔹 File Upload */}
            <div>
              <label className="block font-medium">Upload Manuscript *</label>
              <input type="file" name="file" onChange={handleFileChange} className="w-full border p-2 rounded" accept=".pdf,.doc,.docx" required />
            </div>

            {/* 🔹 Submission Button */}
            <div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OnlinePaperSubmission;
