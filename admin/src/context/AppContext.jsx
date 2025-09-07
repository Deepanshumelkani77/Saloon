import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {


const [user,setUser]=useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);

 

  const value = {
    user,
    setUser,
    sidebarOpen,
    setSidebarOpen
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
