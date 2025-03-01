import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import $ from "jquery";
import Sidebar from "../../Admin/sidebar";
import Navbar from "../../Admin/navbar";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "bootstrap/dist/css/bootstrap.min.css";

function Testimonial() {
    const [testimonials, setTestimonials] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch Testimonials
    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/testimonial`);
            setTestimonials(response.data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (testimonials.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#testimonialTable")) {
                    $("#testimonialTable").DataTable({
                        destroy: true,
                        responsive: true,
                        dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
                        buttons: [
                            { extend: "copy", className: "btn btn-primary btn-sm" },
                            { extend: "csv", className: "btn btn-primary btn-sm" },
                            { extend: "excel", className: "btn btn-primary btn-sm" },
                            { extend: "pdf", className: "btn btn-primary btn-sm" },
                            { extend: "print", className: "btn btn-primary btn-sm" }
                        ]
                    });
                }
            }, 500);
        }
    }, [testimonials]);

    // ✅ Delete Testimonial
    const deleteTestimonial = async (id) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            try {
                await axios.delete(`${BASE_URL}/api/testimonial/${id}`);
                setTestimonials(testimonials.filter((testimonial) => testimonial.testimonialId !== id));
                console.log(`Deleted testimonial with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting testimonial:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container mt-26">
                    {/* ✅ Heading and Add Button Right-Aligned */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold">Testimonials</h3>
                        <a href="/addtestimonial" className="btn btn-success shadow-sm">
                            Add New
                        </a>
                    </div>

                    <div className="table-responsive">
                        <table id="testimonialTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Affiliation</th>
                                    <th>Content</th>
                                    <th>Link</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.length > 0 ? (
                                    testimonials.map((testimonial, index) => (
                                        <tr key={testimonial.testimonialId}>
                                            <td>{index + 1}</td>
                                            <td>{testimonial.name}</td>
                                            <td>{testimonial.affiliation}</td>
                                            <td>{testimonial.content}</td>
                                            {/* <td>
                                                {testimonial.photo ? (
                                                    <img
                                                        src={`${BASE_URL}/static/${testimonial.photo}`}
                                                        alt="Photo"
                                                        className="img-thumbnail"
                                                        style={{ width: "50px", height: "50px" }}
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td> */}
                                            {/* <td>
                                                {testimonial.attachment ? (
                                                    <a
                                                        href={`${BASE_URL}/uploads/${testimonial.attachment}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    "No Attachment"
                                                )}
                                            </td> */}
                                            <td>
                                                {testimonial.link ? (
                                                    <a href={testimonial.link} target="_blank" rel="noopener noreferrer">
                                                        Visit
                                                    </a>
                                                ) : (
                                                    "No Link"
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => navigate(`/addTestimonial/${testimonial.testimonialId}`)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteTestimonial(testimonial.testimonialId)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted">No testimonials found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonial;
