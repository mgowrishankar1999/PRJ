// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PRJ_logo from '../../assets/prj_logo.jpg';

// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation
//         let newErrors = {};
//         if (!username.trim()) newErrors.username = "Username is required";
//         if (!password.trim()) newErrors.password = "Password is required";
//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             setLoading(true);

//             try {
//                 const response = await fetch('http://192.168.1.13:8080/api/users', {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 if (!response.ok) throw new Error("Login failed");

//                 const data = await response.json();

//                 // Simulated authentication: Check if username and password match
//                 const user = data.find((user) => user.username === username && user.password === password);

//                 if (user) {
//                     alert("Login Successful");

//                     // ✅ Store authentication status (Token can be used if available)
//                     localStorage.setItem("authToken", "user-authenticated");

//                     // ✅ Redirect to Dashboard
//                     navigate("/dashboard");
//                 } else {
//                     alert("Incorrect username or password");
//                 }
//             } catch (error) {
//                 console.error("Error during login:", error);
//                 alert("Login error: Check CORS settings.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <div className="w-screen h-screen flex items-center justify-center bg-gray-500 bg-[url('../../assets/prj_logo.jpg')] bg-cover bg-center bg-no-repeat">
//             <div className="bg-white w-full max-w-md min-h-[50vh] box-border p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-80">
//                 <div className="mb-5 flex items-center justify-center">
//                     <img src={PRJ_logo} alt="Logo" className="h-16 rounded" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Admin Login</h2>
    
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-semibold">Username</label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="border border-gray-300 p-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter username"
//                         />
//                         {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
//                     </div>
    
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-semibold">Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="border border-gray-300 p-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter password"
//                         />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//                     </div>
    
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
    

// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PRJ_logo from "../../assets/prj_logo.jpg"; // Importing local image
import BG_IMAGE from "../../assets/BG_image.webp"; // Import your background image

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);

            try {
                const response = await fetch('http://192.168.1.13:8080/api/users', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error("Login failed");

                const data = await response.json();
                const user = data.find((user) => user.username === username && user.password === password);

                if (user) {
                    alert("Login Successful");
                    localStorage.setItem("authToken", "user-authenticated");
                    navigate("/dashboard");
                } else {
                    alert("Incorrect username or password");
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("Login error: Check CORS settings.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-gray-500"
            style={{
                backgroundImage: `url(${BG_IMAGE})`, // Using imported image
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-white w-full max-w-md min-h-[50vh] box-border p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-80">
                <div className="mb-5 flex items-center justify-center">
                    <img src={PRJ_logo} alt="Logo" className="h-16 rounded" />
                </div>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Admin Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col text-left">
                        <label className="text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="flex flex-col text-left">
                        <label className="text-gray-100 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

