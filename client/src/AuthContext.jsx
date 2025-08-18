import { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId")); // null if not logged in

  // Check localStorage on load
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const login = (id) => {
    localStorage.setItem("userId", id); // save as plain string
    setUserId(id);
    console.log("User logged in with ID:", id);    
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
