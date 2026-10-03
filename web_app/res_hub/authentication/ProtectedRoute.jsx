import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import FullPageLoader from "../components/common/FullPageLoader";

// Guests -> /login.  With requireAdmin, non-admins -> / (the homepage).
const ProtectedRoute = ({ requireAdmin = false }) => {
    const { session, loading, isAdmin } = useAuth()

    if (loading) {
        return <FullPageLoader />
    }

    if (!session) {
        return <Navigate to="/login" replace />
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default ProtectedRoute