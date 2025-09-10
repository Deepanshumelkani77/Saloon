import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";



export const AppContext = createContext();

const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

const [sidebarOpen, setSidebarOpen] = useState(false);
const [loginForm, setLoginForm] = useState(false);
const [initialMode, setInitialMode] = useState("login");

// Toggle function for sidebar
const toggleSidebar = () => {
  setSidebarOpen(prev => !prev);
};

// Close sidebar function
const closeSidebar = () => {
  setSidebarOpen(false);
};




  // Restore user from cookies if available
  const adminCookie = Cookies.get("admin");
  const tokenCookie = Cookies.get("token");

  const initialAdmin =
    adminCookie && adminCookie !== "undefined" ? JSON.parse(adminCookie) : null;

  const [admin, setAdmin] = useState(initialAdmin);
  const [token, setToken] = useState(tokenCookie || null);
  

  // ✅ Handle Google login redirect (query params)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");

    if (tokenParam && id && email) {
      const newUser = { _id: id, name, email };

      // Save to cookies
      Cookies.set("token", tokenParam, { expires: 1 });
      Cookies.set("admin", JSON.stringify(newAdmin), { expires: 1 });

      // Update state
      setToken(tokenParam);
      setAdmin(newAdmin);

      // Remove params from URL
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);

  // Signup
  const signup = async (username, email, password, phone) => {
    try {
      await axios.post("http://localhost:1000/admin/signup", {
        username,
        email,
        password,
        phone,
      });
      alert("Signup successful! Please login.");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:1000/admin/login", {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("admin", JSON.stringify(response.data.admin), { expires: 1 });
      setAdmin(response.data.admin);
      setToken(response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("admin");
    setAdmin(null);
    setToken(null);
    navigate("/");
  };




  const value = {
    admin,
    setAdmin,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    closeSidebar,
    loginForm,
    setLoginForm,
    signup,
    login,
    logout,
    initialMode,
    setInitialMode
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
