import { Navigate, Route, Routes } from "react-router-dom"

import Layout from '../components/layout/Layout'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Signup from '../components/pages/Signup'
import Search from '../components/pages/Search'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../components/admin/AdminDashboard'
import UploadResidence from '../components/admin/UploadResidence'

import ProtectedRoute from "../authentication/ProtectedRoute"
import GuestRoute from "../authentication/GuestRoute"

function App() {
  return (
    <Routes>

      {/* Pages that use the normal site Header + Footer */}
      <Route element={<Layout />}>

        {/* Guests only: a signed-in user is bounced to "/" */}
        <Route element={<GuestRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        {/* Signed-in users only: guests are sent to /login */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Route>

      </Route>

      {/* Admin area: signed in AND role = admin, has its own layout */}
      <Route element={<ProtectedRoute requireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="upload" element={<UploadResidence />} />
        </Route>
      </Route>

      {/* Anything unknown -> "/" (guests then continue to /login) */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App
