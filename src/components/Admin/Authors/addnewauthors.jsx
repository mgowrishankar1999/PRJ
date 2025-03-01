import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../common/modal";

const AddNewAuthor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL (if editing)
  const BASE_URL = "http://192.168.1.13:8080";

  // ✅ Author state holds all input fields. The status remains default "1".
  const [author, setAuthor] = useState({
    authorCode: "",
    prefix: "",
    firstName: "",
    lastName: "",
    alternateName: "",
    designation: "",
    department: "",
    university: "",
    address: "",
    country: "",
    profileViews: "",
    papersPublished: "",
    status: "1" // Active by default
  });

  // New state for universities and the selected university id.
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [logo, setLogo] = useState(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [modal, setModal] = useState({ show: false, type: "success", message: "" });


  // ✅ Fetch universities for dropdown
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/universities`)
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => console.error("Error fetching universities:", error));
  }, [BASE_URL]);

  // ✅ Fetch existing author data when editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/authors/${id}`)
        .then((response) => {
          // Exclude non-editable fields (like created/updated metadata) and rename logo field if available
          const {
            createdDate,
            createdUserId,
            createdUserType,
            updatedDate,
            updatedUserId,
            updatedUserType,
            id: authorId,
            logo: existingLogo,
            ...editableFields
          } = response.data;
          setAuthor(editableFields);
          // If there's an existing logo, set it.
          if (existingLogo) {
            setLogo(`${BASE_URL}/uploads/${existingLogo}`);
          }
        })
        .catch((error) => console.error("Error fetching author:", error));
    }
  }, [id, BASE_URL]);

  // If editing and universities have been fetched, preselect the matching university (if any)
  useEffect(() => {
    if (universities.length > 0 && author.university) {
      const matchingUni = universities.find(
        (uni) => uni.universityName === author.university
      );
      if (matchingUni) {
        setSelectedUniversityId(matchingUni.id.toString());
      }
    }
  }, [universities, author.university]);

  // ✅ Handle input changes for text and number fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file input change for logo
  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
    setRemoveLogo(false);
  };

  // ✅ Remove the current logo
  const handleRemoveLogo = () => {
    setLogo(null);
    setRemoveLogo(true);
  };

  // ✅ Handle university dropdown change:
  // Updates the university, address, and country fields automatically.
  const handleUniversityChange = (e) => {
    const selectedId = e.target.value;
    setSelectedUniversityId(selectedId);
    const selectedUni = universities.find(
      (u) => u.id.toString() === selectedId
    );
    if (selectedUni) {
      setAuthor((prev) => ({
        ...prev,
        university: selectedUni.universityName,
        address: selectedUni.address,
        country: selectedUni.country,
      }));
    } else {
      // Clear fields if no selection
      setAuthor((prev) => ({
        ...prev,
        university: "",
        address: "",
        country: "",
      }));
    }
  };

  // ✅ Handle form submit to add or update an author
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      // Append all author fields to the form data (status remains "1")
      Object.keys(author).forEach((key) => {
        formData.append(key, author[key] || "");
      });

      // Append logo if it's a new file
      if (logo && typeof logo !== "string") {
        formData.append("logo", logo);
      }

      // Append flag to remove logo if requested
      if (removeLogo) {
        formData.append("removeLogo", "true");
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let response;
      if (id) {
        // Update existing author
        response = await axios.put(`${BASE_URL}/api/authors/${id}`, formData, config);
        setMessage("Author updated successfully!");
      } else {
        // Create a new author
        response = await axios.post(`${BASE_URL}/api/authors`, formData, config);
        setMessage("Author added successfully!");
      }

      if (response && (response.status === 200 || response.status === 201)) {
        setModal({
          show: true,
          type: "success",
          message: id ? "Journal updated successfully!" : "Journal added successfully!",
        });

        setTimeout(() => {
          setModal({ show: false, type: "", message: "" });
          navigate('/authors');
          window.scrollTo(0, 0);
        }, 800);
      }

    } catch (error) {
      setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
      console.error("Error saving author:", error);
      setMessage("Failed to save author. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Edit Author" : "Add New Author"}
        </h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Author Code */}
          <div>
            <label className="font-semibold text-green-600">
              Author Code *
            </label>
            <input
              type="text"
              name="authorCode"
              value={author.authorCode || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {/* Prefix */}
          <div>
            <label className="font-semibold text-green-600">Prefix</label>
            <input
              type="text"
              name="prefix"
              value={author.prefix || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* First Name */}
          <div>
            <label className="font-semibold text-green-600">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={author.firstName || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="font-semibold text-green-600">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={author.lastName || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {/* Alternate Name */}
          <div>
            <label className="font-semibold text-green-600">
              Alternate Name
            </label>
            <input
              type="text"
              name="alternateName"
              value={author.alternateName || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* Designation */}
          <div>
            <label className="font-semibold text-green-600">
              Designation *
            </label>
            <input
              type="text"
              name="designation"
              value={author.designation || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {/* Department */}
          <div>
            <label className="font-semibold text-green-600">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={author.department || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* University Dropdown */}
          <div>
            <label className="font-semibold text-green-600">
              University *
            </label>
            <select
              name="university"
              value={selectedUniversityId}
              onChange={handleUniversityChange}
              className="form-control"
              required
            >
              <option value="">-- Select University --</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {`${uni.universityName} (${uni.address}, ${uni.country})`}
                </option>
              ))}
            </select>
          </div>
          {/* Address (Read Only) */}
          <div>
            <label className="font-semibold text-green-600">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={author.address || ""}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
          {/* Country (Read Only) */}
          <div>
            <label className="font-semibold text-green-600">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={author.country || ""}
              onChange={handleChange}
              className="form-control"
              required
              readOnly
            />
          </div>
          {/* Profile Views */}
          <div>
            <label className="font-semibold text-green-600">
              Profile Views
            </label>
            <input
              type="number"
              name="profileViews"
              value={author.profileViews || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* Papers Published */}
          <div>
            <label className="font-semibold text-green-600">
              Papers Published
            </label>
            <input
              type="number"
              name="papersPublished"
              value={author.papersPublished || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* Logo Upload */}
          <div>
            <label className="font-semibold text-green-600">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
            />
          </div>
          {/* Display current logo when editing */}
          {id && logo && !removeLogo && (
            <div className="relative">
              <p className="font-semibold text-green-600">
                Current Logo:
              </p>
              <div className="relative">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-32 h-32 object-cover border"
                  onError={(e) => {
                    e.target.src = "/default-logo.png";
                  }}
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
            <button type="submit" className="btn btn-success">
              {loading ? "Saving..." : id ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo(0, 0)
                navigate("/authors")
              }
              }
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
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

export default AddNewAuthor;
