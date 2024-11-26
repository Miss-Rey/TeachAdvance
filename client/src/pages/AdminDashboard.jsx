import React, { useState, useEffect } from 'react';
import AdminDrawer from '../components/AdminDrawer';
import TopNav from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import FooterContainer from '../components/Footer';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("/admindashboard/manageinstructors"); // Default active tab

  useEffect(() => {
    const uid = localStorage.getItem('UID');
    if (uid) {
      setLoggedIn(true);
    } else {
      navigate('/adminlogin');
    }
  }, [navigate]);

  return (
    <div>
      {loggedIn ? (
        <div>
          <TopNav /> 
          <AdminDrawer />
        </div>
      ) : (
        <div>Please Login</div>
      )}
      <FooterContainer />
    </div>
  );
};

export default AdminDashboard;
