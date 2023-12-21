import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";




const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56  flex justify-center mx-auto mt-20"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default PrivateRoute;