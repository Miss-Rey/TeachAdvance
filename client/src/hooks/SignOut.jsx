import React, { createContext, useEffect, useCallback, useRef } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const timeoutRef = useRef(null);

  // Sign-out function
  const signOut = useCallback(() => {
    console.log('Sign out triggered'); // Debug log
    localStorage.clear();
    sessionStorage.clear(); // Clear session storage, if used
    window.location.href = '/login'; // Redirect to login page
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
      console.log('User activity detected, resetting timeout'); // Debug log
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
