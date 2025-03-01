import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import Modal from "../../common/modal";
// Import CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddNewArticle = () => {

  const [modal, setModal] = useState({ show: false, type: "success", message: "" });
  const navigate = useNavigate();
  const { id } = useParams(); // For editing an existing article
  const BASE_URL = "http://192.168.1.13:8080";
  const editorRef = useRef(null);

  // ───────── Article State ─────────
  const [article, setArticle] = useState({
    articleKey: "",
    articleTitle: "",
    journalId: "",
    doi: "",
    pageFrom: "",
    pageTo: "",
    volume: "",
    issue: "",
    monthFrom: "",
    monthTo: "",
    year: "",
    dateOfReceived: "",
    dateOfAcceptance: "",
    dateOfPublication: "",
    abstractText: "",  // CKEditor content will go here
    googleScholar: "",
    keywords: "",
    reference: "",     // CKEditor content will go here
    correspondingAuthor: "",
    authorIds: "",
    status: "1"
  });

  const [articleFile, setArticleFile] = useState(null);
  const [removeFile, setRemoveFile] = useState(false);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ───────── AUTHOR DETAILS STATES ─────────
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [authorsList, setAuthorsList] = useState([]);
  const [authorSearchQuery, setAuthorSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [articleAuthors, setArticleAuthors] = useState([]);

  // ───────── Fetch Journals ─────────
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/journals`)
      .then((response) => setJournals(response.data))
      .catch((error) => console.error("Error fetching journals:", error));
  }, [BASE_URL]);

  // ───────── Fetch Article Data (Edit Mode) ─────────
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/articles/${id}`)
        .then((response) => {
          const {
            createdDate,
            createdUserId,
            createdUserType,
            updatedDate,
            updatedUserId,
            updatedUserType,
            id: articleId,
            articleFile: existingFile,
            ...editableFields
          } = response.data;
          setArticle(editableFields);

          if (existingFile) {
            setArticleFile(`${BASE_URL}/static${existingFile}`);
          }

          if (editableFields.authorIds) {
            const idArray = editableFields.authorIds
              .split(",")
              .map((s) => parseInt(s.trim(), 10))
              .filter((n) => !isNaN(n));
            axios
              .get(`${BASE_URL}/api/authors`)
              .then((res) => {
                const allAuthors = res.data;
                const filtered = allAuthors.filter((a) => idArray.includes(a.id));
                let corrIds = [];
                if (editableFields.correspondingAuthor) {
                  corrIds = editableFields.correspondingAuthor
                    .split(",")
                    .map((s) => parseInt(s.trim(), 10))
                    .filter((n) => !isNaN(n));
                }
                const enriched = filtered.map((a) => ({
                  ...a,
                  isCorresponding: corrIds.includes(a.id)
                }));
                setArticleAuthors(enriched);
              })
              .catch((error) =>
                console.error("Error fetching authors for article", error)
              );
          }
        })
        .catch((error) => console.error("Error fetching article:", error));
    }
  }, [id, BASE_URL]);

  // ───────── Handle Input Changes ─────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  // ───────── Handle CKEditor Changes ─────────
  // const handleAbstractChange = (event, editor) => {
  //   const data = editor.getData();
  //   setArticle((prev) => ({ ...prev, abstractText: data }));
  // };

  // const handleReferenceChange = (event, editor) => {
  //   const data = editor.getData();
  //   setArticle((prev) => ({ ...prev, reference: data }));
  // };

  const handleEditorChange = (content) => {
    setArticle((prev) => ({ ...prev, abstractText: content })); // ✅ Use `content`
  };

  const handleReferenceChanges = (content) => {
    setArticle((prev) => ({ ...prev, reference: content })); // ✅ Use `content`
  };



  // ───────── Handle File Changes ─────────
  const handleFileChange = (e) => {
    setArticleFile(e.target.files[0]);
    setRemoveFile(false);
  };

  const handleRemoveFile = () => {
    setArticleFile(null);
    setRemoveFile(true);
  };

  // ───────── AUTHOR SEARCH MODAL LOGIC ─────────
  const openAuthorModal = () => {
    setShowAuthorModal(true);
    if (authorsList.length === 0) {
      fetchAuthors();
    }
  };

  const fetchAuthors = () => {
    axios
      .get(`${BASE_URL}/api/authors`)
      .then((response) => setAuthorsList(response.data))
      .catch((error) => console.error("Error fetching authors:", error));
  };

  const filteredAuthors = authorsList.filter((authorItem) => {
    const fullName = `${authorItem.firstName} ${authorItem.lastName}`.toLowerCase();
    return fullName.includes(authorSearchQuery.toLowerCase());
  });

  const toggleAuthorSelection = (authorId) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorId)
        ? prev.filter((id) => id !== authorId)
        : [...prev, authorId]
    );
  };

  const addSelectedAuthors = () => {
    const newAuthors = authorsList.filter((a) => selectedAuthors.includes(a.id));
    const updatedArticleAuthors = [...articleAuthors];
    newAuthors.forEach((auth) => {
      if (!updatedArticleAuthors.some((x) => x.id === auth.id)) {
        updatedArticleAuthors.push({ ...auth, isCorresponding: false });
      }
    });
    setArticleAuthors(updatedArticleAuthors);
    setShowAuthorModal(false);
    setSelectedAuthors([]);
    setAuthorSearchQuery("");
  };

  const handleRemoveAuthor = (id) => {
    setArticleAuthors((prev) => prev.filter((auth) => auth.id !== id));
  };

  const toggleCorresponding = (id) => {
    setArticleAuthors((prev) =>
      prev.map((auth) =>
        auth.id === id ? { ...auth, isCorresponding: !auth.isCorresponding } : auth
      )
    );
  };

  // ───────── Handle Form Submission ─────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(article).forEach((key) => {
        formData.append(key, article[key] || "");
      });

      // Set authorIds and correspondingAuthor fields using the selected authors.
      formData.set(
        "authorIds",
        articleAuthors.map((a) => a.id).join(",")
      );
      formData.set(
        "correspondingAuthor",
        articleAuthors
          .filter((a) => a.isCorresponding)
          .map((a) => a.id)
          .join(",")
      );

      if (articleFile && typeof articleFile !== "string") {
        formData.append("articleFile", articleFile);
      }
      if (removeFile) {
        formData.append("removeFile", "true");
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let response;
      if (id) {
        response = await axios.put(`${BASE_URL}/api/articles/${id}`, formData, config);
        setMessage("Article updated successfully!");
      } else {
        response = await axios.post(`${BASE_URL}/api/articles`, formData, config);
        setMessage("Article added successfully!");
      }

      if (response && (response.status === 200 || response.status === 201)) {
        setModal({
          show: true,
          type: "success",
          message: id ? "Journal updated successfully!" : "Journal added successfully!",
        });

        setTimeout(() => {
          setModal({ show: false, type: "", message: "" });
          navigate('/article');
          window.scrollTo(0, 0);
        }, 800);
      }


    } catch (error) {
      console.error("Error saving article:", error);
      setMessage("Failed to save article. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ───────── RENDER ─────────
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-[80vw] mx-auto bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Edit Article" : "Add New Article"}
        </h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Existing Inputs */}
          <div>
            <label className="font-semibold text-green-600">Article Key *</label>
            <input
              type="text"
              name="articleKey"
              value={article.articleKey || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Article Title *</label>
            <input
              type="text"
              name="articleTitle"
              value={article.articleTitle || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Journal *</label>
            <select
              name="journalId"
              value={article.journalId || ""}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">-- Select Journal --</option>
              {journals.map((journal) => (
                <option key={journal.id} value={journal.id}>
                  {journal.journalName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-green-600">DOI</label>
            <input
              type="text"
              name="doi"
              value={article.doi || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Pages (From - To)</label>
            <div className="d-flex">
              <input
                type="text"
                name="pageFrom"
                value={article.pageFrom || ""}
                onChange={handleChange}
                className="form-control me-2"
                placeholder="From"
              />
              <input
                type="text"
                name="pageTo"
                value={article.pageTo || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="To"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-green-600">Volume</label>
            <input
              type="text"
              name="volume"
              value={article.volume || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Issue</label>
            <input
              type="text"
              name="issue"
              value={article.issue || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Month From</label>
            <input
              type="text"
              name="monthFrom"
              value={article.monthFrom || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Month To</label>
            <input
              type="text"
              name="monthTo"
              value={article.monthTo || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Year</label>
            <input
              type="text"
              name="year"
              value={article.year || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Date of Received</label>
            <input
              type="date"
              name="dateOfReceived"
              value={article.dateOfReceived || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Date of Acceptance</label>
            <input
              type="date"
              name="dateOfAcceptance"
              value={article.dateOfAcceptance || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label className="font-semibold text-green-600">Date of Publication</label>
            <input
              type="date"
              name="dateOfPublication"
              value={article.dateOfPublication || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* ✅ Subject Area (TinyMCE Editor) */}
          {/* <div className="col-span-2">
                            <label className="font-semibold text-green-600">Abstract *</label>
                            <Editor
                                apiKey="jru2ftka8ewwu68zgu3u33hmfc5kjpy825l4ebkjrhkb8rca"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                value={article.abstractText || ""}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                    toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </div> */}


          {/* CKEditor for Reference */}
          {/* <div className="col-span-2">
            <label className="font-semibold text-green-600">Reference</label>
            <textarea
              name="reference"
              value={article.reference || ""}
              onChange={handleChange}
              className="form-control"
              rows="3"
            ></textarea>
          </div> */}


          {/* ✅ Subject Area (TinyMCE Editor) */}
          {/* <div className="col-span-2">
                            <label className="font-semibold text-green-600">References *</label>
                            <Editor
                                apiKey="jru2ftka8ewwu68zgu3u33hmfc5kjpy825l4ebkjrhkb8rca"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                value={article.reference || ""}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                    toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </div> */}

          {/* ✅ Abstract Editor */}
          <div className="col-span-2">
            <label className="font-semibold text-green-600">Abstract *</label>
            <Editor
              apiKey="jru2ftka8ewwu68zgu3u33hmfc5kjpy825l4ebkjrhkb8rca"
              value={article.abstractText || ""}
              init={{
                height: 300,
                menubar: false,
                plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange} // ✅ Correct function reference
            />
          </div>

          {/* ✅ Reference Editor */}
          <div className="col-span-2">
            <label className="font-semibold text-green-600">References *</label>
            <Editor
              apiKey="jru2ftka8ewwu68zgu3u33hmfc5kjpy825l4ebkjrhkb8rca"
              value={article.reference || ""}
              init={{
                height: 300,
                menubar: false,
                plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleReferenceChanges} // ✅ Correct function reference
            />
          </div>



          <div>
            <label className="font-semibold text-green-600">Keywords</label>
            <textarea
              name="keywords"
              value={article.keywords || ""}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>

          {/* Corresponding Author(s) Section */}
          <div className="col-span-2">
            <label className="font-semibold text-green-600">Corresponding Author(s)</label>
            <div className="d-flex">
              <input
                type="text"
                name="correspondingAuthor"
                value={article.correspondingAuthor || ""}
                readOnly
                className="form-control"
              />
              <button
                type="button"
                onClick={openAuthorModal}
                className="btn btn-primary ms-2"
              >
                Search Author
              </button>
            </div>
          </div>

          {/* Article File Upload */}
          <div>
            <label className="font-semibold text-green-600">Article File</label>
            <input
              type="file"
              name="articleFile"
              onChange={handleFileChange}
              className="form-control"
              accept=".pdf,.doc,.docx"
            />
          </div>
          {id && articleFile && !removeFile && (
            <div className="relative col-span-2">
              <p className="font-semibold text-green-600">Current File:</p>
              <div className="relative">
                <a href={articleFile} target="_blank" rel="noreferrer">
                  {articleFile.toString().split("/").pop()}
                </a>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                >
                  ✖
                </button>
              </div>
            </div>
          )}

          {/* Form Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button type="submit" className="btn btn-success">
              {loading ? "Saving..." : id ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/article")}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Selected Authors Table */}
        <div className="mt-5">
          <h4>Selected Authors</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Department</th>
                <th>University</th>
                <th>Corresponding</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articleAuthors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No authors added.
                  </td>
                </tr>
              ) : (
                articleAuthors.map((auth) => (
                  <tr key={auth.id}>
                    <td>{`${auth.prefix || ""} ${auth.firstName} ${auth.lastName}`.trim()}</td>
                    <td>{auth.department || ""}</td>
                    <td>{auth.university || ""}</td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={auth.isCorresponding}
                        onChange={() => toggleCorresponding(auth.id)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveAuthor(auth.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Author Search Modal */}
      {showAuthorModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            className="modal-content bg-white p-4 rounded"
            style={{ width: "80%", maxHeight: "80%", overflowY: "auto" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Search Author</h5>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setShowAuthorModal(false)}
              >
                Close
              </button>
            </div>
            <div className="mb-3 d-flex">
              <input
                type="text"
                placeholder="Search by first name or last name"
                value={authorSearchQuery}
                onChange={(e) => setAuthorSearchQuery(e.target.value)}
                className="form-control me-2"
              />
              <button className="btn btn-success" onClick={fetchAuthors}>
                Search
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Department</th>
                  <th>University</th>
                  <th>Address</th>
                  <th>Country</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.length > 0 ? (
                  filteredAuthors.map((auth) => (
                    <tr key={auth.id}>
                      <td>{auth.firstName}</td>
                      <td>{auth.lastName}</td>
                      <td>{auth.department}</td>
                      <td>{auth.university}</td>
                      <td>{auth.address}</td>
                      <td>{auth.country}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedAuthors.includes(auth.id)}
                          onChange={() => toggleAuthorSelection(auth.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No authors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-success"
                onClick={addSelectedAuthors}
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ show: false, type: "", message: "" })}
      />
    </div>
  );
};

export default AddNewArticle;