import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ allow cookies

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);

  // ✅ Fetch user session from backend
  useEffect(() => {
    axios.get("http://localhost:1000/user/me", { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const value = { user };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
