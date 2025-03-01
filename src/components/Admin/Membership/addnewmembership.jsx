import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddNewMembership = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // membershipId from URL if editing
  const BASE_URL = "http://192.168.1.13:8080";

  const membershipTypes = [
    "-- Select --",
    "Associate Membership",
    "Senior Membership",
    "Fellow Membership",
    "Software Professional Fellow Membership",
    "Engineering Professional Fellow Membership",
    "Management Professional Fellow Membership",
    "Executive Membership",
    "Advisory Membership",
    "HonoraryFellow Membership"
  ];
  
  // State to hold membership fields
  const [membership, setMembership] = useState({
    membershipType: "",
    membershipYear: "",
    name: "",
    affiliation: "",
    specialization: "",
    googleScholarLink: "",
    researchgateLink: "",
    academiaLink: "",
    orcid: "",
    ssrn: "",
    github: "",
    institutionProfileLink: "",
    scopusLink: "",
    wosLink: "",
    photo: null, // We'll store the file or string here
    email: "",
    mobileNumber: "",
    status: "1" // Active by default
  });

  const [removePhoto, setRemovePhoto] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing membership if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/memberships/${id}`)
        .then((response) => {
          const {
            membershipId,
            createdDate,
            updatedDate,
            ...editableFields
          } = response.data;

          // If there's a photo, we store the URL or path
          // The API might return just a filename or a full URL
          // Adjust as needed (e.g. `BASE_URL + "/uploads/" + editableFields.photo`)
          setMembership({ ...editableFields, photo: editableFields.photo });
        })
        .catch((error) => console.error("Error fetching membership:", error));
    }
  }, [id, BASE_URL]);

  // Handle changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembership((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for photo
  const handleFileChange = (e) => {
    setMembership((prev) => ({ ...prev, photo: e.target.files[0] }));
    setRemovePhoto(false);
  };

  // Remove the current photo
  const handleRemovePhoto = () => {
    setMembership((prev) => ({ ...prev, photo: null }));
    setRemovePhoto(true);
  };

  // Save or Update membership
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      // Append membership fields
      Object.keys(membership).forEach((key) => {
        if (key === "photo") {
          // If it's a file (not a string), append it
          if (membership.photo && typeof membership.photo !== "string") {
            formData.append("photo", membership.photo);
          }
        } else {
          formData.append(key, membership[key] || "");
        }
      });

      // If we removed the photo
      if (removePhoto) {
        formData.append("removePhoto", "true");
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (id) {
        // Update existing
        await axios.put(`${BASE_URL}/api/memberships/${id}`, formData, config);
        setMessage("Membership updated successfully!");
      } else {
        // Create new
        await axios.post(`${BASE_URL}/api/memberships`, formData, config);
        setMessage("Membership added successfully!");
      }

      setTimeout(() => navigate("/memberships"), 2000);
    } catch (error) {
      console.error("Error saving membership:", error);
      setMessage("Failed to save membership. Check console for details.");
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-uppercase mb-4">
        {id ? "Edit Membership" : "Add New Membership"}
      </h3>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Membership Type */}
        <div className="col-md-6">
            <label className="form-label fw-bold text-success">Membership Type *</label>
            <select
                name="membershipType"
                value={membership.membershipType || ""}
                onChange={handleChange}
                className="form-control"
                required
            >
                {membershipTypes.map((type, index) => (
                <option key={index} value={type === "-- Select --" ? "" : type}>
                    {type}
                </option>
                ))}
            </select>
            </div>

        {/* Membership Year */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Membership Year</label>
          <input
            type="number"
            name="membershipYear"
            value={membership.membershipYear || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Name */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Name</label>
          <input
            type="text"
            name="name"
            value={membership.name || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Affiliation */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Affiliation</label>
          <input
            type="text"
            name="affiliation"
            value={membership.affiliation || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Specialization */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={membership.specialization || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Email</label>
          <input
            type="email"
            name="email"
            value={membership.email || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Mobile */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={membership.mobileNumber || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Google Scholar Link */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Google Scholar</label>
          <input
            type="text"
            name="googleScholarLink"
            value={membership.googleScholarLink || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* ResearchGate Link */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">ResearchGate</label>
          <input
            type="text"
            name="researchgateLink"
            value={membership.researchgateLink || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Academia Link */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Academia</label>
          <input
            type="text"
            name="academiaLink"
            value={membership.academiaLink || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* ORCID */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">ORCID</label>
          <input
            type="text"
            name="orcid"
            value={membership.orcid || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* SSRN */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">SSRN</label>
          <input
            type="text"
            name="ssrn"
            value={membership.ssrn || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* GitHub */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">GitHub</label>
          <input
            type="text"
            name="github"
            value={membership.github || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Institution Profile Link */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Institution Profile</label>
          <input
            type="text"
            name="institutionProfileLink"
            value={membership.institutionProfileLink || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Scopus Link */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Scopus</label>
          <input
            type="text"
            name="scopusLink"
            value={membership.scopusLink || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* WOS Link */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">WOS</label>
          <input
            type="text"
            name="wosLink"
            value={membership.wosLink || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Photo Upload */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
          />
        </div>

        {/* Display current photo if editing */}
        {id && membership.photo && typeof membership.photo === "string" && !removePhoto && (
          <div className="col-md-6 d-flex flex-column">
            <label className="form-label fw-bold text-success">Current Photo</label>
            <img
              src={`${BASE_URL}/uploads/${membership.photo}`}
              alt="Membership"
              className="img-thumbnail mb-2"
              style={{ width: "150px", height: "150px" }}
            />
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="btn btn-danger btn-sm"
            >
              Remove Photo
            </button>
          </div>
        )}

        {/* Form Buttons */}
        <div className="col-12 d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-success me-2">
            {loading ? "Saving..." : id ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/memberships")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMembership;
