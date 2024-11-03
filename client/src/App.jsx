import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CourseDetails from "./pages/CourseDetails"
import Courses from "./pages/Courses"
import Notes from "./pages/Notes"
import MyCourses from "./pages/MyCourses"
import profile from './pages/Profile'
import AdminLogin from './pages/AdminLogin'
import AddInstructor from "./pages/AddInstructor"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register} />
        {/* <Route path="/loading" Component={Loading } /> */}
        <Route path="/courses/:id" Component={CourseDetails} />
        <Route path="/courses" Component={Courses} />
        <Route path="/courses/:id/notes" Component={Notes} />
        <Route path="/mycourses" Component={MyCourses} />
        <Route path="/profile" Component={profile} />
        <Route path="/adminlogin" Component={AdminLogin} />
        <Route path="/admindashboard" Component={AdminDashboard} />
        <Route path="/admindashboard/addinstructor" Component={AddInstructor} />
      </Routes>
    </>
  )
}

export default App
