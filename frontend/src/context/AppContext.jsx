import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore user from cookies if available
  const userCookie = Cookies.get("user");
  const tokenCookie = Cookies.get("token");

  const initialUser =
    userCookie && userCookie !== "undefined" ? JSON.parse(userCookie) : null;

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(tokenCookie || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Sync authentication state across frontend and shop
  useEffect(() => {
    const checkCookieChanges = () => {
      const currentUserCookie = Cookies.get("user");
      const currentTokenCookie = Cookies.get("token");

      // If cookies exist but state doesn't match, update state (logged in from shop)
      if (currentUserCookie && currentTokenCookie) {
        const cookieUser = JSON.parse(currentUserCookie);
        if (!user || user.id !== cookieUser.id) {
          setUser(cookieUser);
          setToken(currentTokenCookie);
        }
      }
      // If cookies are removed but state exists, clear state (logged out from shop)
      else if (!currentUserCookie && !currentTokenCookie && user) {
        setUser(null);
        setToken(null);
      }
    };

    // Check every 500ms for cookie changes
    const interval = setInterval(checkCookieChanges, 500);

    return () => clearInterval(interval);
  }, [user]);

  // ✅ Handle Google login redirect (query params)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");

    if (tokenParam && id && email) {
      const newUser = { id: id, name, email };

      // Save to cookies (shared across frontend & shop)
      Cookies.set("token", tokenParam, { expires: 1, path: '/' });
      Cookies.set("user", JSON.stringify(newUser), { expires: 1, path: '/' });

      // Update state
      setToken(tokenParam);
      setUser(newUser);

      // Show success toast
      toast.success(`Welcome back, ${name}! Logged in with Google`);

      // Remove params from URL
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);

  // Signup
  const signup = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, userData);
      toast.success("Signup successful! Please login.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1, path: '/' });
      Cookies.set("user", JSON.stringify(response.data.user), { expires: 1, path: '/' });
      setUser(response.data.user);
      setToken(response.data.token);
      toast.success(`Welcome back, ${response.data.user.name || response.data.user.username}!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove("token", { path: '/' });
    Cookies.remove("user", { path: '/' });
    setUser(null);
    setToken(null);
    toast.info("Logged out successfully");
    navigate("/");
  };

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Close sidebar function
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Update user function
  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    Cookies.set("user", JSON.stringify(newUser), { expires: 1, path: '/' });
  };

  const value = {
    user,
    token,
    signup,
    login,
    logout,
    updateUser,
    setUser,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    closeSidebar,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
