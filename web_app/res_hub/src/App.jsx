import React from 'react'
import { Route,Routes } from "react-router-dom"
import Home from '../components/layout/Home'
function App() {
  return(<>
      <Routes>
          <Route index path='/' element={<Home/>}  />
      </Routes>
  </>)
}

export default App