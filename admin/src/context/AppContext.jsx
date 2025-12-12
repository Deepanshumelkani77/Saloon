import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

const [sidebarOpen, setSidebarOpen] = useState(false);
const [openLogin,setOpenLogin] = useState(false);
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
  const hasCheckedAuth = useRef(false);
  

  // ✅ Auto-open login modal if not logged in (only on initial mount)
  useEffect(() => {
    if (!hasCheckedAuth.current && !admin && !token) {
      setOpenLogin(true);
      hasCheckedAuth.current = true;
    }
  }, []);

  // ✅ Close modal and redirect when login is successful
  useEffect(() => {
    if (admin && token && hasCheckedAuth.current) {
      setOpenLogin(false);
      navigate("/");
    }
  }, [admin, token, navigate]);

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
      Cookies.set("admin", JSON.stringify(newUser), { expires: 1 });

      // Update state
      setToken(tokenParam);
      setAdmin(newUser);

      // Show success toast
      toast.success(`Welcome back, ${name}! Logged in with Google`);

      // Remove params from URL
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);

  // Signup
  const signup = async (username, email, password, phone) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/signup`, {
        username,
        email,
        password,
        phone,
      });
      toast.success("Signup successful! Please login.");
      // Redirect to login page after successful signup
      setInitialMode("login");
      
      // Set a flag in localStorage to indicate we just signed up
      localStorage.setItem('justSignedUp', 'true');
      
      // Refresh to ensure clean state for login
      window.location.reload();
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("admin", JSON.stringify(response.data.admin), { expires: 1 });
      setAdmin(response.data.admin);
      setToken(response.data.token);
      toast.success(`Welcome back, ${response.data.admin.name || response.data.admin.username}!`);
      
      // Set a flag in localStorage to indicate we just logged in
      localStorage.setItem('justLoggedIn', 'true');
      
      // Force a refresh to ensure all components get the updated auth state
      window.location.reload();
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("admin");
    setAdmin(null);
    setToken(null);
    toast.info("Logged out successfully");
    hasCheckedAuth.current = false; // Reset auth check flag
    setOpenLogin(true); // Open login modal immediately
    navigate("/");
  };




  const value = {
    admin,
    setAdmin,
    token,
    setToken,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openLogin,
    setOpenLogin,
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
