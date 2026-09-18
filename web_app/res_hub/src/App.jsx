
import { Route,Routes } from "react-router-dom"
import Home from '../components/layout/Home'
function App() {
  return(<>
      <Routes>
          <Route index element={<Home/>} path='/'  />
      </Routes>
  </>)
}

export default App