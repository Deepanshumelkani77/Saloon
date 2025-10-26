import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore user from cookies AND localStorage (for cross-domain support)
  const userCookie = Cookies.get("user");
  const tokenCookie = Cookies.get("token");
  const userLocalStorage = localStorage.getItem("user");
  const tokenLocalStorage = localStorage.getItem("token");

  const initialUser =
    userCookie && userCookie !== "undefined" ? JSON.parse(userCookie) : 
    userLocalStorage && userLocalStorage !== "undefined" ? JSON.parse(userLocalStorage) : null;
  
  const initialToken = tokenCookie || tokenLocalStorage || null;

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Sync authentication state (localStorage for cross-domain, cookies for same-domain)
  useEffect(() => {
    const checkStorageChanges = () => {
      const currentUserCookie = Cookies.get("user");
      const currentTokenCookie = Cookies.get("token");
      const currentUserLocal = localStorage.getItem("user");
      const currentTokenLocal = localStorage.getItem("token");

      // Check both cookie and localStorage
      const currentUser = currentUserCookie || currentUserLocal;
      const currentToken = currentTokenCookie || currentTokenLocal;

      // If auth data exists but state doesn't match, update state
      if (currentUser && currentToken) {
        const authUser = JSON.parse(currentUser);
        if (!user || user.id !== authUser.id) {
          setUser(authUser);
          setToken(currentToken);
        }
      }
      // If auth data is removed but state exists, clear state
      else if (!currentUser && !currentToken && user) {
        setUser(null);
        setToken(null);
      }
    };

    // Check every 500ms for storage changes
    const interval = setInterval(checkStorageChanges, 500);

    // Also listen to storage events (for cross-tab sync on same domain)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "token") {
        checkStorageChanges();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
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

      // Save to both cookies AND localStorage (for cross-domain support)
      Cookies.set("token", tokenParam, { expires: 1, path: '/' });
      Cookies.set("user", JSON.stringify(newUser), { expires: 1, path: '/' });
      localStorage.setItem("token", tokenParam);
      localStorage.setItem("user", JSON.stringify(newUser));

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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    localStorage.setItem("user", JSON.stringify(newUser));
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
