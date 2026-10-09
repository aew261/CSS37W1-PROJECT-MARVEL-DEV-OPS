import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import FullPageLoader from "../components/common/FullPageLoader";


const ProtectedRoute = () => {
    const {session,user,mounting } = useAuth()

    useEffect(()=>{
        //console.log("Hey",session)
    })

    if (mounting) {
        return <FullPageLoader />
    }

    


    if(!session){
        return <Navigate to="/login" replace />
    }

    
   
    return <Outlet/>
      
}

export default ProtectedRoute