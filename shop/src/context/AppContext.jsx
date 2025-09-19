import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const userCookie = Cookies.get("user");
  const tokenCookie = Cookies.get("token");

  const initialUser =
    userCookie && userCookie !== "undefined" ? JSON.parse(userCookie) : null;

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(tokenCookie || null);

  // ✅ If cookies change (e.g. login/logout), update state
  useEffect(() => {
    if (Cookies.get("user")) {
      setUser(JSON.parse(Cookies.get("user")));
      setToken(Cookies.get("token"));
    } else {
      setUser(null);
      setToken(null);
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
  };

  const value = { user, token, logout };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
