import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import PRJ_logo from '../../assets/prj_logo.jpg';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);

            try {
                const response = await fetch('http://192.168.1.13:8080/api/users', {
                    method: "GET", // Simple GET request
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Login failed");

                const data = await response.json();

                // Assuming the response is an array, checking if the username and password match
                if (data.length > 0) {
                    const user = data[0]; // Assuming first user is the match
                    console.log(user);

                    // Check if username and password are correct
                    if (user.username === username && user.password === password) {
                        alert("Login Successful");
                        console.log("Logged in user:", user);

                        // Delay navigation to ensure all operations complete
                        setTimeout(() => {
                            navigate("/dashboard"); // Redirect to Home after successful login
                        }, 100); // Adjust timeout if necessary
                    }
                    else {
                        alert("Incorrect username or password");
                    }
                } else {
                    alert("User not found");
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
        <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-500">
            {/* Login Form */}
            <div className="bg-white h-[60vh] w-[35vw] box-border p-6 rounded-lg shadow-lg">
                <div className="mb-5 flex items-center justify-center">
                    <img src={PRJ_logo} alt="Logo" className="h-16 rounded" />
                </div>
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Admin Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Username */}
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

                    {/* Password */}
                    <div className="flex flex-col text-left">
                        <label className="text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
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
