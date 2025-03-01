// import PRJ_logo from '../../assets/prj_logo.jpg';
// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


// function navbar() {
//     const navigate = useNavigate();

//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const logouthandler = () => {

//         navigate('/login')
//     }

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);


//     useEffect(() => {
//         const authToken = localStorage.getItem("authToken");
//         if (!authToken) {
//             navigate("/login", { replace: true });
//         }
//     }, [navigate]);

//     // ✅ Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("authToken"); // Remove authentication token
//         navigate("/login", { replace: true }); // Redirect to login page
//     };

//     return (

//         <div className="fixed top-0 left-0 w-full bg-white shadow-md h-[10vh] flex items-center px-8 justify-between z-50">

//             <div className="flex items-center gap-4">
//                 <img className="h-[50px] w-[70px] p-2 rounded" src={PRJ_logo} alt="Logo" />
//                 <h1 className="text-lg font-bold text-gray-800">PRJ</h1>
//             </div>


//             {/* <div className="relative w-[30%]">
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//             </div> */}


//             <div className="relative" ref={dropdownRef}>
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="bg-blue-400 text-white rounded px-4 py-2 rounded-md shadow-md flex items-center gap-2 border"
//                 >
//                     Admin

//                 </button>

//                 {isOpen && (
//                     <div className="absolute right-0 h-[130px] py-2 w-[15vw]  bg-white shadow-lg rounded-md">
//                         <ul class='p-0'>
//                             <li className=" py-2 px-3 hover:bg-gray-200 cursor-pointer">Profile</li>
//                             <li className=" py-2 px-3 hover:bg-gray-200 cursor-pointer">Settings</li>
//                             <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }
// export default navbar;





import PRJ_logo from '../../assets/prj_logo.jpg';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove authentication token
        navigate("/login", { replace: true }); // Redirect to login page
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md h-[10vh] flex items-center px-8 justify-between z-50">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <img className="h-[50px] w-[70px] p-2 rounded" src={PRJ_logo} alt="Logo" />
                <h1 className="text-lg font-bold text-gray-800">PRJ</h1>
            </div>

            {/* User Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-400 text-white rounded px-4 py-2 shadow-md flex items-center gap-2 border"
                >
                   Admin {isOpen ? <span className="text-sm">▲</span> : <span className="text-sm">▼</span>}  {/* ✅ Bold Up/Down Arrow */}
                </button>

                {isOpen && (
                    <div className="absolute right-0 h-[130px] py-2 w-[15vw] bg-white shadow-lg rounded-md">
                        <ul className="p-0">
                            <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer">Profile</li>
                            <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer">Settings</li>
                            <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
