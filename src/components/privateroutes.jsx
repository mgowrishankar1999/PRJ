import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem("authToken"); // Check if user is logged in

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
