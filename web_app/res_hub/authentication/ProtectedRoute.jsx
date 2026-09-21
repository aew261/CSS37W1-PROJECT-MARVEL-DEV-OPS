import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute=()=>{
    const {user, mounting}=useAuth()

    if(mounting){
         return <div>Loading...</div>;
    }

    if(!user){
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}

export default ProtectedRoute