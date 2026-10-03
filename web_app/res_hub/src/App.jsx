import { Route, Routes } from "react-router-dom"
import {useAuth} from "../authentication/AuthProvider"
import {Outlet,Navigate} from "react-router-dom"


import Layout from '../components/layout/Layout'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Signup from '../components/pages/Signup'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminLayout from '../components/admin/AdminLayout'
import Search from '../components/pages/Search'
import UploadResidence from "../components/admin/UploadResidence"

import Residence_Info from "../components/pages/Residence_Info"

import ProtectedRoute from "../authentication/ProtectedRoute"


function App() {

  const AdminRoute = () => {
    const { user } = useAuth();

    if (user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

  return (<>
    <Routes>

      <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}  >
              <Route path="/admin" element={<AdminLayout/>} >
                <Route index element={<AdminDashboard/>} />
                <Route path="/admin/upload" element={<UploadResidence />} />
              </Route>
          </Route>
          

          <Route element={<Layout />}>
            
            <Route index  element={<Home/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/residence_info" element={<Residence_Info/>}/>

          </Route>

      </Route>

    </Routes>
  </>)
}

export default App
