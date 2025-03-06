import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../common/modal";

const AddNewAward = () => {
  const [modal, setModal] = useState({ show: false, type: "success", message: "" });
  const navigate = useNavigate();
  const { id } = useParams(); // award ID from URL if editing
  const BASE_URL = "http://192.168.1.13:8080";

  // State for award fields
  const [award, setAward] = useState({
    name: "",
    affiliation: "",
    email: "",
    awardType: "",
    content: "",
    linkedin: "",
    researchgate: "",
    academia: "",
    googleScholar: "",
    orcid: "",
    profilePhoto: "", // Store file or string
    status: "1", // Active by default
  });

  const [removePhoto, setRemovePhoto] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing award if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/awards/${id}`)
        .then((response) => {
          setAward(response.data);
        })
        .catch((error) => console.error("Error fetching award:", error));
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAward((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for profile photo
  const handleFileChange = (e) => {
    setAward((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
    setRemovePhoto(false);
  };

  // Remove the current photo
  const handleRemovePhoto = () => {
    setAward((prev) => ({ ...prev, profilePhoto: null }));
    setRemovePhoto(true);
  };

  // Submit form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const formData = new FormData();

  //     Object.keys(award).forEach((key) => {
  //       if (key !== "profilePhoto") {
  //         formData.append(key, award[key] || "");
  //       }
  //     });

  //     if (award.profilePhoto && typeof award.profilePhoto !== "string") {
  //       formData.append("profilePhoto", award.profilePhoto);
  //     }

  //     if (removePhoto) {
  //       formData.append("removePhoto", "true");
  //     }

  //     const config = { headers: { "Content-Type": "multipart/form-data" } };

  //     if (id) {
  //       await axios.put(`${BASE_URL}/api/awards/${id}`, formData, config);
  //       setMessage("Award updated successfully!");
  //     } else {
  //       await axios.post(`${BASE_URL}/api/awards`, formData, config);
  //       setMessage("Award added successfully!");
  //     }

  //     if (response && (response.status === 200 || response.status === 201)) {
  //       setModal({
  //         show: true,
  //         type: "success",
  //         message: id ? "Journal updated successfully!" : "Journal added successfully!",
  //       });

  //       setTimeout(() => {
  //         setModal({ show: false, type: "", message: "" });
  //         navigate('/awardslist');
  //         window.scrollTo(0, 0);
  //       }, 800);
  //     }

  //   } catch (error) {
  //     setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
  //     console.error("Error saving award:", error);
  //     setMessage("Failed to save award.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      Object.keys(award).forEach((key) => {
        if (key !== "profilePhoto") {
          formData.append(key, award[key] || "");
        }
      });

      if (award.profilePhoto && typeof award.profilePhoto !== "string") {
        formData.append("profilePhoto", award.profilePhoto);
      }

      if (removePhoto) {
        formData.append("removePhoto", "true");
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let response;

      if (id) {
        response = await axios.put(`${BASE_URL}/api/awards/${id}`, formData, config);
      } else {
        response = await axios.post(`${BASE_URL}/api/awards`, formData, config);
      }

      if (response.status === 200 || response.status === 201) {
        setModal({
          show: true,
          type: "success",
          message: id ? "Award updated successfully!" : "Award added successfully!",
        });

        setTimeout(() => {
          setModal({ show: false, type: "", message: "" });
          navigate('/awardslist');
          window.scrollTo(0, 0);
        }, 800);
      }

    } catch (error) {
      setModal({ show: true, type: "error", message: "Failed to save award. Try again." });
      console.error("Error saving award:", error);
      setMessage("Failed to save award.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-uppercase mb-4">
        {id ? "Edit Award" : "Add New Award"}
      </h3>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Name *</label>
          <input
            type="text"
            name="name"
            value={award.name || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Affiliation */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Affiliation *</label>
          <input
            type="text"
            name="affiliation"
            value={award.affiliation || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Email *</label>
          <input
            type="email"
            name="email"
            value={award.email || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Award Type */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Award Type *</label>
          <input
            type="text"
            name="awardType"
            value={award.awardType || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Content */}
        <div className="col-md-12">
          <label className="form-label fw-bold text-success">Description</label>
          <textarea
            name="content"
            value={award.content || ""}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>

        {/* Social Links */}
        {["linkedin", "researchgate", "academia", "googleScholar", "orcid"].map((field) => (
          <div className="col-md-6" key={field}>
            <label className="form-label fw-bold text-success">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={award[field] || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}

        {/* Profile Photo */}
        <div className="col-md-6">
          <label className="form-label fw-bold text-success">Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
          />
        </div>

        {/* Show current photo if editing */}
        {id && award.profilePhoto && typeof award.profilePhoto === "string" && !removePhoto && (
          <div className="col-md-6 d-flex flex-column">
            <label className="form-label fw-bold text-success">Current Photo</label>
            <img
              src={`${BASE_URL}/static${award.profilePhoto}`}
              alt="Award"
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
            onClick={() => {
              window.scrollTo(0, 0)
              navigate("/awardslist")
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
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

export default AddNewAward;
