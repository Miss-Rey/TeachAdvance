import React, { useState, useEffect } from 'react'
import AdminDrawer from '../components/AdminDrawer'
import TopNav from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {

  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const uid = localStorage.getItem('UID')
    if (uid) {
      setLoggedIn(true)
    } else {
      navigate('/adminlogin')
    }
  }, [navigate])

  return (
    <div>
      {loggedIn ? (
        <div>
          <AdminDrawer />
        </div>
      ) : (
        <div>Please Loggin</div>
      )}

    </div>
  )
}

export default AdminDashboard