import { Navigate, Route, Routes } from "react-router-dom"

import Layout from '../components/layout/Layout'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Signup from '../components/pages/Signup'
import Search from '../components/pages/Search'

import Residence_Info from "../components/pages/Residence_Info"



import ProtectedRoute from "../authentication/ProtectedRoute"
import GuestRoute from "../authentication/GuestRoute"

function App() {
  return (
    <Routes>

      {/* Pages that use the normal site Header + Footer */}

      <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            
            <Route index  element={<Home/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/residence_info" element={<Residence_Info/>}/>

          </Route>

      </Route>

      

    </Routes>
  )
}

export default App
