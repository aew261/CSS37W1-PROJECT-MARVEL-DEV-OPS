import Home from "../components/pages/Home"

import { Route,Routes } from "react-router-dom"
function App() {
  return(<>
      <Routes>
          <Route index element={<Home/>} path='/'  />
      </Routes>
  </>)
}

export default App