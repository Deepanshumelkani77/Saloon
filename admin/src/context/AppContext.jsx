import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {


const [user,setUser]=useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);

// Toggle function for sidebar
const toggleSidebar = () => {
  setSidebarOpen(prev => !prev);
};

// Close sidebar function
const closeSidebar = () => {
  setSidebarOpen(false);
};

  const value = {
    user,
    setUser,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    closeSidebar
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
