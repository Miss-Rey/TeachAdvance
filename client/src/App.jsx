import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CourseDetails from "./pages/CourseDetails"
import Courses from "./pages/Courses"
import Notes from "./pages/Notes"
import MyCourses from "./pages/MyCourses"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses" Component={Courses} />
        <Route path="/courses/:id/notes" Component={Notes} />
        <Route path="/mycourses" Component={MyCourses} />
      </Routes>
    </>
  )
}

export default App
