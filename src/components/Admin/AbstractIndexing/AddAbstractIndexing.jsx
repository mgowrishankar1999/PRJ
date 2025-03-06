// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../../Admin/sidebar";
// import Navbar from "../../Admin/navbar";
// import { Editor } from "@tinymce/tinymce-react";

// const AddAbstractIndexing = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const editorRef = useRef(null);

//     const [abstract, setAbstract] = useState({
//         title: "",
//         content: ""
//     });

//     const [image, setImage] = useState(null);
//     const [document, setDocument] = useState(null);
//     const [removeImage, setRemoveImage] = useState(false);
//     const [removeDocument, setRemoveDocument] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const BASE_URL = "http://192.168.1.13:8080";

//     useEffect(() => {
//         if (id) {
//             axios.get(`${BASE_URL}/api/abstract-indexing/${id}`)
//                 .then(response => {
//                     const { image, document, ...data } = response.data;
//                     setAbstract(data);
//                     if (image) setImage(`${BASE_URL}/uploads/${image}`);
//                     if (document) setDocument(`${BASE_URL}/uploads/${document}`);
//                 })
//                 .catch(error => console.error("Error fetching abstract indexing record:", error));
//         }
//     }, [id]);

//     const handleChange = (e) => {
//         setAbstract({ ...abstract, [e.target.name]: e.target.value });
//     };

//     const handleEditorChange = () => {
//         if (editorRef.current) {
//             setAbstract({ ...abstract, content: editorRef.current.getContent() });
//         }
//     };

//     const handleImageChange = (e) => setImage(e.target.files[0]);
//     const handleDocumentChange = (e) => setDocument(e.target.files[0]);

//     const handleRemoveImage = () => {
//         setImage(null);
//         setRemoveImage(true);
//     };

//     const handleRemoveDocument = () => {
//         setDocument(null);
//         setRemoveDocument(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const formData = new FormData();
//             Object.keys(abstract).forEach(key => formData.append(key, abstract[key]));

//             if (image && typeof image !== "string") formData.append("image", image);
//             if (document && typeof document !== "string") formData.append("document", document);
//             if (removeImage) formData.append("removeImage", "true");
//             if (removeDocument) formData.append("removeDocument", "true");

//             if (id) {
//                 await axios.put(`${BASE_URL}/api/abstract-indexing/${id}`, formData);
//                 setMessage("Abstract Indexing record updated successfully!");
//             } else {
//                 await axios.post(`${BASE_URL}/api/abstract-indexing`, formData);
//                 setMessage("Abstract Indexing record added successfully!");
//             }

//             setTimeout(() => {
//                 window.scrollTo(0, 0)
//                 navigate("/abstractindexing")
//             });
//         } catch (error) {
//             console.error("Error saving abstract indexing record:", error);
//             setMessage("Failed to save abstract indexing record.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="d-flex">
//                 <Sidebar />
//                 <div className="container mt-26 bg-white p-10 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">
//                         {id ? "Edit Abstract Indexing Record" : "Add New Abstract Indexing Record"}
//                     </h2>

//                     {message && <div className="alert alert-info">{message}</div>}

//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Title Input */}
//                         <div>
//                             <label className="font-semibold text-green-600">Title *</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={abstract.title}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         {/* Content Editor */}
//                         <div className="col-span-2">
//                             <label className="font-semibold text-green-600">Content *</label>
//                             <Editor
//                                 apiKey="drrbxe26t58bpx80cp9x5ic592idx2z5vseavugx66teftjl"
//                                 onInit={(_, editor) => (editorRef.current = editor)}
//                                 initialValue={abstract.content || "<p>Type your content here...</p>"}
//                                 init={{
//                                     height: 400,
//                                     width: "100%",
//                                     menubar: false,
//                                     plugins: [
//                                         "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
//                                         "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
//                                         "insertdatetime", "media", "table", "code", "help", "wordcount"
//                                     ],
//                                     toolbar:
//                                         "undo redo | blocks | " +
//                                         "bold italic forecolor | alignleft aligncenter " +
//                                         "alignright alignjustify | bullist numlist outdent indent | " +
//                                         "removeformat | help",
//                                     content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//                                 }}
//                                 onEditorChange={handleEditorChange}
//                             />
//                         </div>

//                         {/* Image Upload */}
//                         <div>
//                             <label className="font-semibold text-green-600">Image *</label>
//                             <input type="file" onChange={handleImageChange} className="form-control" accept="image/*" />
//                         </div>

//                         {/* Show existing Image with Remove Button */}
//                         {id && image && !removeImage && (
//                             <div className="relative">
//                                 <p className="font-semibold text-green-600">Current Image:</p>
//                                 <div className="relative">
//                                     <img src={image} alt="Current Image" className="img-thumbnail" style={{ width: "100px", height: "100px" }} />
//                                     <button type="button" onClick={handleRemoveImage} className="btn btn-danger btn-sm ms-2">
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         )}


//                         {/* Buttons */}
//                         <div className="col-span-2 flex justify-end gap-4 mt-4">
//                             <button type="submit" className="btn btn-success">
//                                 {loading ? "Saving..." : id ? "Update" : "Save"}
//                             </button>
//                             <button type="button" onClick={() => navigate('/abstractindexing')} className="btn btn-secondary">
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddAbstractIndexing;





import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "../../common/modal";

const AddAbstractIndexing = () => {
    const [modal, setModal] = useState({ show: false, type: "success", message: "" });
    const navigate = useNavigate();
    const { id } = useParams();
    const editorRef = useRef(null);

    const [abstract, setAbstract] = useState({
        title: "",
        content: ""
    });

    const [image, setImage] = useState(null);
    const [document, setDocument] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [removeDocument, setRemoveDocument] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = "http://192.168.1.13:8080";

    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/abstract-indexing/${id}`)
                .then(response => {
                    const { image, document, ...data } = response.data;
                    setAbstract(data);
                    if (image) setImage(`${BASE_URL}/uploads/${image}`);
                    if (document) setDocument(`${BASE_URL}/uploads/${document}`);
                })
                .catch(error => console.error("Error fetching abstract indexing record:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setAbstract({ ...abstract, [e.target.name]: e.target.value });
    };

    const handleEditorChange = () => {
        if (editorRef.current) {
            setAbstract({ ...abstract, content: editorRef.current.getContent() });
        }
    };

    const handleImageChange = (e) => setImage(e.target.files[0]);
    const handleDocumentChange = (e) => setDocument(e.target.files[0]);

    const handleRemoveImage = () => {
        setImage(null);
        setRemoveImage(true);
    };

    const handleRemoveDocument = () => {
        setDocument(null);
        setRemoveDocument(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            Object.keys(abstract).forEach(key => formData.append(key, abstract[key]));

            if (image && typeof image !== "string") formData.append("image", image);
            if (document && typeof document !== "string") formData.append("document", document);
            if (removeImage) formData.append("removeImage", "true");
            if (removeDocument) formData.append("removeDocument", "true");

            if (id) {
                await axios.put(`${BASE_URL}/api/abstract-indexing/${id}`, formData);
                setMessage("Abstract Indexing record updated successfully!");
            } else {
                await axios.post(`${BASE_URL}/api/abstract-indexing`, formData);
                setMessage("Abstract Indexing record added successfully!");
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: id ? "Journal updated successfully!" : "Journal added successfully!",
                });

                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate('/abstractindexing');
                    window.scrollTo(0, 0);
                }, 800);
            }

        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to save Journal. Try again." });
            console.error("Error saving abstract indexing record:", error);
            setMessage("Failed to save abstract indexing record.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex  ">
                <Sidebar />
                <div className="container mt-26 bg-white p-10 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {id ? "Edit Abstract Indexing Record" : "Add New Abstract Indexing Record"}
                    </h2>

                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1  md:grid-cols-2 gap-4">
                        {/* Title Input */}
                        <div>
                            <label className="font-semibold text-green-600">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={abstract.title}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        {/* Content Editor */}
                        <div className="col-span-2">
                            <label className="font-semibold text-green-600">Content *</label>
                            <Editor
                                apiKey="drrbxe26t58bpx80cp9x5ic592idx2z5vseavugx66teftjl"
                                onInit={(_, editor) => (editorRef.current = editor)}
                                initialValue={abstract.content || ""}
                                init={{
                                    height: 400,
                                    width: "100%",
                                    menubar: false,
                                    plugins: [
                                        "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                                        "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                                        "insertdatetime", "media", "table", "code", "help", "wordcount"
                                    ],
                                    toolbar:
                                        "undo redo | blocks | " +
                                        "bold italic forecolor | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | help",
                                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="font-semibold text-green-600">Image *</label>
                            <input type="file" onChange={handleImageChange} className="form-control" accept="image/*" />
                        </div>
                        {/* Show existing Image with Remove Button */}
                        {id && image && !removeImage && (
                            <div className="relative">
                                <p className="font-semibold text-green-600">Current Image:</p>
                                <div className="relative">
                                    <img src={image} alt="Current Image" className="img-thumbnail" style={{ width: "100px", height: "100px" }} />
                                    <button type="button" onClick={handleRemoveImage} className="btn btn-danger btn-sm ms-2">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <button type="submit" className="btn btn-success">
                                {loading ? "Saving..." : id ? "Update" : "Save"}
                            </button>
                            <button type="button" onClick={() => {
                                navigate('/abstractindexing')
                                window.scrollTo(0, 0);
                            }
                            }
                                className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                show={modal.show}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ show: false, type: "", message: "" })}
            />
        </>
    );
};
export default AddAbstractIndexing;
