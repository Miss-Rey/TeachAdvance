import React, { createContext, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const timeoutRef = useRef(null);
  const navigate = useNavigate()

  const signOut = useCallback(() => {
    const uid = localStorage.getItem('i')

    switch (uid) {
      case '1':
        localStorage.clear();
        sessionStorage.clear();
        navigate('/instructorlogin')
        break;
      case '2':
        localStorage.clear();
        sessionStorage.clear(); 
        navigate('/adminlogin')
        break;
      default:
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login')
        break;
    }

  }, []);

  // Reset timeout on user activity
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      console.log('Session expired, signing out'); // Debug log
      signOut();
    }, 15 * 60 * 1000); // 15 minutes
  }, [signOut]);

  // Handle user activity events
  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    const handleUserActivity = () => {
      // console.log('User activity detected, resetting timeout'); // Debug log
      resetTimeout();
    };

    // Add event listeners
    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    resetTimeout(); // Start the timeout on mount

    // Cleanup
    return () => {
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimeout]);

  return (
    <SessionContext.Provider value={{ signOut }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
