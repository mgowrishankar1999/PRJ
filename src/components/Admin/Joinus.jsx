// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../Admin/sidebar";
// import Navbar from "../Admin//navbar";
// import $ from "jquery";

// import "bootstrap/dist/css/bootstrap.min.css";

// // ✅ DataTables Imports
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import "datatables.net-dt";
// import "datatables.net-buttons/js/dataTables.buttons.min";
// import "datatables.net-buttons/js/buttons.html5.min";
// import "datatables.net-buttons/js/buttons.print.min";
// import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Joinus() {
//     const [joinRequests, setJoinRequests] = useState([]);
//     const BASE_URL = "http://localhost:8080";

//     // ✅ Fetch JoinUs Data
//     const fetchJoinRequests = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/api/joinus`);
//             setJoinRequests(response.data);
//         } catch (error) {
//             console.error("Error fetching join requests:", error);
//         }
//     };

//     useEffect(() => {
//         fetchJoinRequests();
//     }, []);

//     // ✅ Initialize DataTable
//     useEffect(() => {
//         if (joinRequests.length > 0) {
//             setTimeout(() => {
//                 if (!$.fn.DataTable.isDataTable("#joinUsTable")) {
//                     $("#joinUsTable").DataTable({
//                         destroy: true,
//                         responsive: true,
//                         dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
//                         buttons: [
//                             { extend: "copy", className: "btn btn-primary btn-sm text-blue" },
//                             { extend: "csv", className: "btn btn-primary btn-sm text-blue" },
//                             { extend: "excel", className: "btn btn-primary btn-sm text-blue" },
//                             { extend: "pdf", className: "btn btn-primary btn-sm text-blue" },
//                             { extend: "print", className: "btn btn-primary btn-sm text-blue" }
//                         ]
//                     });
//                 }
//             }, 500);
//         }
//     }, [joinRequests]);

//     // ✅ Delete Request
//     const deleteRequest = async (id) => {
//         if (window.confirm("Are you sure you want to delete this request?")) {
//             try {
//                 await axios.delete(`${BASE_URL}/api/joinus/${id}`);
//                 setJoinRequests(joinRequests.filter((request) => request.id !== id));
//                 console.log(`Deleted request with ID: ${id}`);
//             } catch (error) {
//                 console.error("Error deleting request:", error);
//             }
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="d-flex h-screen">
//                 <Sidebar />
//                 <div className="container py-20 overflow-scroll">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h3 className="fw-bold text-uppercase">Join Editorial Board</h3>
//                     </div>

//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered">
//                             <thead className="table-dark">
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Date</th>
//                                     <th>Message</th>
//                                     <th>Country</th>
//                                     <th>Document</th>
//                                     <th>Phone Number</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>1</td>
//                                     <td>gowrishankar</td>
//                                     <td>mgowrishankar1998@gmail.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>India</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>6301354325</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>2</td>
//                                     <td>yYeiLvKTyWTKE</td>
//                                     <td>povto9ll8w@yahoo.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>XKCytSIHjolzGus</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>7186634380</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>3</td>
//                                     <td>OitfJiqTiwxe</td>
//                                     <td>povto9ll8w@yahoo.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>zcochDphEO</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>8825688054</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>4</td>
//                                     <td>IADivktcrU</td>
//                                     <td>tc9qilhfz@yahoo.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>XqLXjexx</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>7681858866</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>5</td>
//                                     <td>YSIlfcggMqKyAp</td>
//                                     <td>tc9qilhfz@yahoo.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>nvbpoAGuMdjUuq</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>4265631920</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>6</td>
//                                     <td>HoLeXuoV</td>
//                                     <td>vddhlisumdl@yahoo.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>wtHQChTjzeLgDne</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>9869800735</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>7</td>
//                                     <td>IsijRnFdMUvHpaO</td>
//                                     <td>vddhlisumdl@yahoo.com</td>
//                                     <td>01-01-1970</td>
//                                     <td></td>
//                                     <td>vjPLSrqxmm</td>
//                                     <td><a href="#">Download</a></td>
//                                     <td>4783649956</td>
//                                     <td>
//                                         <button className="btn btn-danger btn-sm">
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// }

// export default Joinus;


import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Admin/sidebar";
import Navbar from "../Admin/navbar";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import "datatables.net-buttons/js/dataTables.buttons.min";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.min";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";

function Joinus() {
    const [joinRequests, setJoinRequests] = useState([]);
    const BASE_URL = "http://192.168.1.13:8080";

    // ✅ Fetch JoinUs Data
    const fetchJoinRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/joinus`);
            setJoinRequests(response.data);
        } catch (error) {
            console.error("Error fetching join requests:", error);
        }
    };

    useEffect(() => {
        fetchJoinRequests();
    }, []);

    // ✅ Initialize DataTable
    useEffect(() => {
        if (joinRequests.length > 0) {
            setTimeout(() => {
                if (!$.fn.DataTable.isDataTable("#joinUsTable")) {
                    $("#joinUsTable").DataTable({
                        destroy: true,
                        responsive: true,
                        dom: '<"d-flex justify-content-between align-items-center mb-3"Bf>rtip',
                        buttons: [
                            { extend: "copy", className: "btn btn-primary btn-sm text-blue" },
                            { extend: "csv", className: "btn btn-primary btn-sm text-blue" },
                            { extend: "excel", className: "btn btn-primary btn-sm text-blue" },
                            { extend: "pdf", className: "btn btn-primary btn-sm text-blue" },
                            { extend: "print", className: "btn btn-primary btn-sm text-blue" }
                        ]
                    });
                }
            }, 500);
        }
    }, [joinRequests]);

    // ✅ Delete Request
    const deleteRequest = async (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            try {
                await axios.delete(`${BASE_URL}/api/joinus/${id}`);
                setJoinRequests(joinRequests.filter((request) => request.id !== id));
                console.log(`Deleted request with ID: ${id}`);
            } catch (error) {
                console.error("Error deleting request:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex h-screen">
                <Sidebar />
                <div className="container py-20 overflow-scroll">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold text-uppercase">Join Editorial Board</h3>
                    </div>

                    <div className="table-responsive">
                        <table id="joinUsTable" className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Message</th>
                                    <th>Country</th>
                                    <th>Document</th>
                                    <th>Phone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {joinRequests.length > 0 ? (
                                    joinRequests.map((request, index) => (
                                        <tr key={request.id}>
                                            {/* ✅ First column (S.No) as Link */}
                                            <td className="p-3 border border-gray-300 text-blue-500 underline cursor-pointer">
                                                <Link to={`/joinus/${request.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                                                    {index + 1}
                                                </Link>
                                            </td>
                                            <td className="p-3 border border-gray-300">{request.name}</td>
                                            <td className="p-3 border border-gray-300">{request.email}</td>
                                            <td className="p-3 border border-gray-300">{request.date || "N/A"}</td>
                                            <td className="p-3 border border-gray-300">{request.message || "N/A"}</td>
                                            <td className="p-3 border border-gray-300">{request.country || "N/A"}</td>
                                            <td className="p-3 border border-gray-300">
                                                {request.document ? (
                                                    <a href={request.document} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                                        Download
                                                    </a>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td className="p-3 border border-gray-300">{request.mobileNumber || "N/A"}</td>
                                            <td className="p-3 border border-gray-300">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteRequest(request.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted">No join requests found.</td>
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

export default Joinus;
