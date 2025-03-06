import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../common/modal";

const AddNewSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get subscription ID from URL if editing


  const [modal, setModal] = useState({ show: false, type: "success", message: "" });

  const [subscription, setSubscription] = useState({
    journalId: "",
    issuesPerYear: "",
    amount: "",
    indexingDetails: "",
    periodSubscription: "",
    month: "",
    year: "",
    status: 1, // Default status
    createdUserId: 1,
    createdUserType: 1,
    updatedUserId: 1,
    updatedUserType: 1
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [journals, setJournals] = useState([]);

  const BASE_URL = "http://192.168.1.13:8080";

  // ✅ Fetch journals for dropdown
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/journals`);
        setJournals(response.data);
      } catch (error) {
        console.error("Error fetching journals:", error);
        setMessage("Failed to load journals. Please try again.");
      }
    };
    fetchJournals();
  }, []);

  // ✅ If editing, fetch subscription data by ID
  useEffect(() => {
    if (id) {
      const fetchSubscription = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/journalsubscription/${id}`);
          setSubscription(response.data);
        } catch (error) {
          console.error("Error fetching subscription:", error);
          setMessage("Failed to load subscription details.");
        }
      };
      fetchSubscription();
    }
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscription((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission for both add & edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let response;
    try {
      if (id) {
        response = await axios.put(`${BASE_URL}/api/journalsubscription/${id}`, subscription);
        setMessage("Journal subscription updated successfully!");
      } else {
        response = await axios.post(`${BASE_URL}/api/journalsubscription`, subscription);
        setMessage("Journal subscription added successfully!");
      }

      // setTimeout(() => navigate("/subscription"), 2000);

      if (response && (response.status === 200 || response.status === 201)) {
        setModal({
          show: true,
          type: "success",
          message: id ? "subscription updated successfully!" : "subscription added successfully!",
        });

        setTimeout(() => {
          setModal({ show: false, type: "", message: "" });
          navigate('/subscription');
          window.scrollTo(0, 0);
        }, 800);
      }
    } catch (error) {
      setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
      console.error("Error saving subscription:", error);
      setMessage("Failed to save subscription. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Edit Journal Subscription" : "Add New Journal Subscription"}
        </h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ✅ Journal Selection */}
          <div>
            <label className="font-semibold text-green-600">Journal *</label>
            <select
              name="journalId"
              value={subscription.journalId || ""}
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

          {/* ✅ Issues Per Year */}
          <div>
            <label className="font-semibold text-green-600">Issues Per Year *</label>
            <input
              type="text"
              name="issuesPerYear"
              value={subscription.issuesPerYear || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ✅ Amount */}
          <div>
            <label className="font-semibold text-green-600">Amount *</label>
            <input
              type="text"
              name="amount"
              value={subscription.amount || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ✅ Indexing Details */}
          <div>
            <label className="font-semibold text-green-600">Indexing Details *</label>
            <input
              type="text"
              name="indexingDetails"
              value={subscription.indexingDetails || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ✅ Period Subscription */}
          <div>
            <label className="font-semibold text-green-600">Period Subscription *</label>
            <input
              type="text"
              name="periodSubscription"
              value={subscription.periodSubscription || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ✅ Month */}
          <div>
            <label className="font-semibold text-green-600">Month *</label>
            <input
              type="text"
              name="month"
              value={subscription.month || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ✅ Year */}
          <div>
            <label className="font-semibold text-green-600">Year *</label>
            <input
              type="text"
              name="year"
              value={subscription.year || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ✅ Status (Hidden Field) */}
          <input type="hidden" name="status" value={subscription.status} />

          {/* ✅ Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button type="submit" className="btn btn-success">
              {loading ? "Saving..." : id ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo(0, 0)
                navigate("/subscription")
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

export default AddNewSubscription;
