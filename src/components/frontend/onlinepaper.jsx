import React, { useState, useEffect } from "react";
import HomeNavbar from "./navbar";
import MenuBar from "./menubar";
import SidebarList from "./sidebar";
import Footer from "./footer";

const OnlinePaper = () => {
  const [formData, setFormData] = useState({
    category: "",
    paperTitle: "",
    authorName: "",
    authorEmail: "",
    contactNumber: "",
    country: "",
    file: null, // Change from `manuscriptFile` to `file`
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.13:8080/api/disciplines")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] }); // Change to `file`
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
        if (formData[key]) {
            formDataToSend.append(key, formData[key]);
        }
    });

    try {
        const response = await fetch("http://192.168.1.13:8080/api/submissions", {
            method: "POST",
            body: formDataToSend,
        });

        if (response.ok) {
            alert("Submission Successful!");
        } else {
            alert("Submission Failed. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again later.");
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
      <HomeNavbar />
      <MenuBar />
      <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
        <aside className="w-full bg-white p-2 rounded-lg shadow-sm">
          <SidebarList />
        </aside>

        <main className="w-4/1 bg-white p-8 shadow-xl rounded-lg border-t-4 border-blue-500">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Online Paper Submission</h1>
          <p className="text-gray-700 leading-relaxed text-lg">
            Online paper submission for project publication allows researchers to submit their work digitally...
          </p>
          <h2 className="text-2xl font-bold text-blue-800 mt-6">Manuscript Submission</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4" encType="multipart/form-data">
            <div>
              <label className="block font-medium">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Paper Title</label>
              <input type="text" name="paperTitle" value={formData.paperTitle} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Author Name</label>
              <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Author Email</label>
              <input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Contact Number</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Upload Manuscript</label>
              <input type="file" name="file" onChange={handleFileChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit</button>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OnlinePaper;
