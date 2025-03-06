// import HomeNavbar from "../frontend/navbar";
// import MenuBar from "../frontend/menubar";
// import Footer from "../frontend/footer";
// import Sidebar from "../frontend/sidebar";
// import { Link, useLocation } from "react-router-dom";

// function joineditorialboard() {
//     const location = useLocation();
//     const currentPath = location.pathname.split("/").filter(Boolean);
//     return (
//         <>
//             <HomeNavbar />
//             <MenuBar />
//             <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white ">
//                 {/* Sidebar on Left */}
//                 <aside className="w-full bg-white p-2 rounded-lg shadow-sm ">
//                     <Sidebar />
//                 </aside>
//                 {/* Main Content */}
//                 <main className="w-4/1  bg-white p-8 shadow-sm flex flex-col rounded-lg ">

//                     <div className="text-sm mb-2">
//                         <Link to="/" className="text-blue-500 hover:underline">Home</Link>
//                         {currentPath.map((segment, index) => (
//                             <span key={index}>
//                                 <span className="mx-1">/</span>
//                                 <span className="capitalize">{segment.replace("-", " ")}</span>
//                             </span>
//                         ))}
//                     </div>
//                     <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">JOIN EDITORIAL BOARD</div>
//                 </main>
//             </div>
//             <Footer />
//         </>
//     )
// }
// export default joineditorialboard


import HomeNavbar from "../frontend/navbar";
import MenuBar from "../frontend/menubar";
import Footer from "../frontend/footer";
import Sidebar from "../frontend/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function JoinEditorialBoard() {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        mobile: "",
        message: "",
        photo: null,
        cv: null,
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
        if (!formData.cv) newErrors.cv = "CV upload is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            alert("Form submitted successfully!");
        }
    };


    const [joinEditorial, setJoinEditorial] = useState([
        'Online Form',
        'Qualification & Requirement',
        'Benifits & Responsibilites',
    ]);

    return (
        <>
            <HomeNavbar />
            <MenuBar />
            <div className="w-full mx-auto px-4 py-8 flex flex-row gap-12 bg-white">
                {/* Sidebar on Left */}
                {/* <aside className="w-1/4 bg-white p-2 rounded-lg shadow-sm hidden lg:block">
                    <Sidebar />
                </aside> */}

                <aside className="w-[25%] bg-white p-2 rounded-lg shadow-sm ">
                    <div>
                        <h3
                            className="text-sm font-semibold border-b-2 p-0 py-1 text-center uppercase"
                            style={{ fontFamily: 'Times New Roman' }}
                        >
                            Join Editorial Board
                        </h3>
                        <ul className="mt-3 space-y-3 ps-0">
                            {joinEditorial.map((joineditorial) => (
                                <li
                                    key={joineditorial}
                                    className="p-2 text-lg font-medium transition-all cursor-pointer rounded-sm 
                              hover:text-cyan-400 hover:bg-gray-200 hover:scale-105 transform duration-200 
                              ease-in-out"
                                    style={{ fontFamily: 'Times New Roman', color: '#333' }}
                                >
                                    {joineditorial}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full lg:w-3/4 bg-white p-8 shadow-sm flex flex-col rounded-lg">
                    {/* Breadcrumb Navigation */}
                    <div className="text-sm mb-2">
                        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                        {currentPath.map((segment, index) => (
                            <span key={index}>
                                <span className="mx-1">/</span>
                                <span className="capitalize">{segment.replace("-", " ")}</span>
                            </span>
                        ))}
                    </div>

                    {/* Page Title */}
                    <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">
                        Join Editorial Board
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="font-semibold">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Country */}
                        <div className="flex flex-col">
                            <label className="font-semibold">Country</label>
                            <input
                                type="text" name="country" value={formData.country} onChange={handleChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="flex flex-col">
                            <label className="font-semibold">Mobile Number <span className="text-red-500">*</span></label>
                            <input
                                type="text" name="mobile" value={formData.mobile} onChange={handleChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                        </div>

                        {/* Photo Upload */}
                        <div className="flex flex-col">
                            <label className="font-semibold">Photo</label>
                            <input
                                type="file" name="photo" onChange={handleFileChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* CV Upload */}
                        <div className="flex flex-col">
                            <label className="font-semibold">CV <span className="text-red-500">*</span></label>
                            <input
                                type="file" name="cv" onChange={handleFileChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
                        </div>

                        {/* Message */}
                        <div className="flex flex-col col-span-1 lg:col-span-2">
                            <label className="font-semibold">Message</label>
                            <textarea
                                name="message" value={formData.message} onChange={handleChange}
                                className="border p-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 h-24"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-1 lg:col-span-2 flex justify-start">
                            <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                                Join
                            </button>
                        </div>
                    </form>
                </main>
            </div>
            <Footer />
        </>
    );
}
export default JoinEditorialBoard;
