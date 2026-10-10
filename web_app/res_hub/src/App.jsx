import { Route, Routes } from "react-router-dom"
import {useAuth} from "../authentication/AuthProvider"
import {Outlet,Navigate} from "react-router-dom"


import Layout from '../components/layout/Layout'

import Login from '../components/pages/Login'
import Signup from '../components/pages/Signup'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminLayout from '../components/admin/AdminLayout'
import About from '../components/pages/About'
import Search from '../components/pages/Search'
import UploadResidence from "../components/admin/UploadResidence"
import ResidenceReview from "../components/pages/ResidenceReview"
import Residence_Info from "../components/pages/Residence_Info"

import RootRedirect from "../authentication/RootRedirect"
import ProtectedRoute from "../authentication/ProtectedRoute"
import AddAdmin from "../components/admin/AddAdmin"



function App() {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
      
        
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="upload" element={<UploadResidence />} /> 
            <Route path="add_admin" element={<AddAdmin />} />
           </Route>

        
        <Route element={<Layout />}>
          <Route index element={<RootRedirect />}  />
          <Route path="/search" element={<Search />} /> 
          <Route path="/residence_info" element={<Residence_Info />} />
          <Route path="/residence_review" element={<ResidenceReview />} />
          <Route path="/About" element={<About />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App
