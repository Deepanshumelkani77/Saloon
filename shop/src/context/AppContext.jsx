import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore user from localStorage (shared across frontend and shop on same domain)
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const initialUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const initialToken = storedToken || null;

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);

  // ✅ Sync authentication across tabs and apps (frontend + shop) using storage events
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only react to user/token changes
      if (e.key === "user" || e.key === "token" || e.key === null) {
        const currentUser = localStorage.getItem("user");
        const currentToken = localStorage.getItem("token");

        if (currentUser && currentToken) {
          // User logged in from another tab/app
          const authUser = JSON.parse(currentUser);
          setUser(authUser);
          setToken(currentToken);
        } else {
          // User logged out from another tab/app
          setUser(null);
          setToken(null);
        }
      }
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // ✅ Handle Google OAuth redirect callback
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");

    if (tokenParam && id && email) {
      const newUser = { id, name, email };

      // Save to localStorage (automatically syncs to frontend app)
      localStorage.setItem("token", tokenParam);
      localStorage.setItem("user", JSON.stringify(newUser));

      // Update state
      setToken(tokenParam);
      setUser(newUser);

      // Show success message
      toast.success(`Welcome back, ${name}! Logged in with Google`);

      // Clean up URL
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);


  // Signup function
  const signup = async (username, email, password, phone) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
        phone,
      });
       
      toast.success("Signup successful! Please login.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        email,
        password,
      });
      
      // Save to localStorage (automatically syncs to frontend app)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      setToken(response.data.token);
      toast.success(`Welcome back, ${response.data.user.name || response.data.user.username}!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout (automatically syncs to frontend app via storage event)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    toast.info("Logged out successfully");
    navigate("/");
  };

  // Update user function
  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const value = { 
    user, 
    token, 
    signup, 
    login, 
    logout, 
    updateUser, 
    setUser 
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
