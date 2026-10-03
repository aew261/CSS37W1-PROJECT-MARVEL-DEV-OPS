import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import FullPageLoader from "../components/common/FullPageLoader";


const ProtectedRoute = ({ requireAdmin = false }) => {
    const {user,mounting } = useAuth()
    
    if (mounting) {
        return <FullPageLoader />
    }


    if(!user){
        return <Navigate to="/login" replace />
    }

   

    return <Outlet/>
      
}

export default ProtectedRoute