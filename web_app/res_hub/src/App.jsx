import { Route, Routes } from "react-router-dom"

import Layout from '../components/layout/Layout'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Signup from '../components/pages/Signup'
import Search from '../components/pages/Search'

import protectedRoute from "../authentication/ProtectedRoute"
import ProtectedRoute from "../authentication/ProtectedRoute"

function App() {
  return (
    <Routes>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            
            <Route index  element={<Home />} />
            <Route path="/search" element={<Search />} />

          </Route>
      </Route>
      
    </Routes>
  )
}

export default App