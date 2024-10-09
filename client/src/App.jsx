import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CourseDetails from "./pages/CourseDetails"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register} />
        <Route path="/courses/:id" element={<CourseDetails />} />
      </Routes>
    </>
  )
}

export default App
