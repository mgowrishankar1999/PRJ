// import { useState, useRef, useEffect } from 'react';
// import Sidebar from '../Admin/sidebar';
// import Navbar from '../Admin/navbar'
// function Home() {

//     return (
//         <div className="flex h-screen bg-gray-100 ">
//             <Sidebar />

//             {/* MAIN CONTENT */}
//             <div className="flex-1 flex flex-col mt-20  ">
//                 <Navbar />
//                 {/* DASHBOARD CARDS */}
//                 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
//                     {/* Card 1 */}
//                     <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
//                         <div className="bg-blue-500 p-4 rounded-full text-white">
//                             <span className="material-icons">shopping_cart</span>
//                         </div>
//                         <div>
//                             <h3 className="text-gray-600">Orders</h3>
//                             <p className="text-xl font-bold">1,250</p>
//                         </div>
//                     </div>

//                     {/* Card 2 */}
//                     <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
//                         <div className="bg-green-500 p-4 rounded-full text-white">
//                             <span className="material-icons">attach_money</span>
//                         </div>
//                         <div>
//                             <h3 className="text-gray-600">Revenue</h3>
//                             <p className="text-xl font-bold">$50,000</p>
//                         </div>
//                     </div>

//                     {/* Card 3 */}
//                     <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
//                         <div className="bg-yellow-500 p-4 rounded-full text-white">
//                             <span className="material-icons">people</span>
//                         </div>
//                         <div>
//                             <h3 className="text-gray-600">Customers</h3>
//                             <p className="text-xl font-bold">8,500</p>
//                         </div>
//                     </div>

//                     {/* Card 4 */}
//                     <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
//                         <div className="bg-red-500 p-4 rounded-full text-white">
//                             <span className="material-icons">bar_chart</span>
//                         </div>
//                         <div>
//                             <h3 className="text-gray-600">Growth</h3>
//                             <p className="text-xl font-bold">15%</p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Home;



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Admin/sidebar';
import Navbar from '../Admin/navbar';

function Home() {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);

    // ✅ Redirect to login if the user is not authenticated
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        console.log(authToken)
        if (!authToken) {
            navigate("/login", { replace: true });
        }

        const storedJournals = localStorage.getItem("journals");
        if (storedJournals) {
            try {
                setJournals(JSON.parse(storedJournals)); // Parse JSON data
            } catch (error) {
                console.error("Error parsing journals from localStorage:", error);
            }
        }
    }, [navigate]);

    console.log(journals.length)

    // ✅ Logout function
    // const handleLogout = () => {
    //     localStorage.removeItem("authToken"); // Remove authentication token
    //     navigate("/login", { replace: true }); // Redirect to login page
    // };

    return (
        <div className="flex h-screen  bg-gray-100 ">
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col  mt-20">
                <Navbar />

                {/* Logout Button */}
                {/* <div className="flex justify-end p-4">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div> */}

                {/* DASHBOARD CARDS */}
                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-around ">
                        <div className="bg-blue-500 p-4 rounded-full text-white">
                            <span className="material-icons">Articles</span>
                        </div>
                        <div>
                            {/* <h3 className="text-gray-600 ">Orders</h3> */}
                            <p className="text-xl font-bold">1,250</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-3 rounded-lg shadow-md flex items-center justify-around">
                        <div className="bg-green-500 p-4 rounded-full text-white">
                            <span className="material-icons">Journals</span>
                        </div>
                        <div>
                            {/* <h3 className="text-gray-600">Revenue</h3> */}
                            <p className="text-xl font-bold">{journals.length}</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-3 rounded-lg shadow-md flex items-center justify-around ">
                        <div className="bg-yellow-500 p-4 rounded-full text-white">
                            <span className="material-icons">Authors</span>
                        </div>
                        <div>
                            {/* <h3 className="text-gray-600">Customers</h3> */}
                            <p className="text-xl font-bold">8,500</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-3 rounded-lg shadow-md flex items-center justify-around">
                        <div className="bg-red-500 p-4 rounded-full text-white">
                            <span className="material-icons">universities</span>
                        </div>
                        <div>
                            {/* <h3 className="text-gray-600">Growth</h3> */}
                            <p className="text-xl font-bold">15</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
