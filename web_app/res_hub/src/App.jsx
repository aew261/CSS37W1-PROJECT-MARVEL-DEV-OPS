import { Route, Routes } from "react-router-dom"
import Layout from '../components/layout/Layout'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Signup from '../components/pages/Signup'
import Search from '../components/pages/Search'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/search' element={<Search />} />
      </Route>
    </Routes>
  )
}

export default App