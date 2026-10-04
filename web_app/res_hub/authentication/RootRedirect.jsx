import { Navigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";
import Home from "../components/pages/Home";
import FullPageLoader from "../components/common/FullPageLoader";

const RootRedirect = () => {
  const { user, mounting } = useAuth();

  if (mounting) {
    return <FullPageLoader />;
  }

  // If user is an admin returning to '/', send them to '/admin'
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Regular user lands on Home
  return <Home />;
};

export default RootRedirect;