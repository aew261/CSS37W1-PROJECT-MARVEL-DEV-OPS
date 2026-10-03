import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import FullPageLoader from "../components/common/FullPageLoader";

// Wraps /login and /signup. As soon as a session exists (right after a
// successful login) the user is sent straight to the Homepage ("/").
const GuestRoute = () => {
    const { session, mounting } = useAuth()

    if (mounting) {
        return <FullPageLoader />
    }

    if (session) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default GuestRoute