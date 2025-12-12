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
  const [openLogin, setOpenLogin] = useState(false);
  const [initialMode, setInitialMode] = useState("login");
  const [isLoading, setIsLoading] = useState(true); 
  
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

  const initialAdmin = adminCookie && adminCookie !== "undefined" ? JSON.parse(adminCookie) : null;
  const [admin, setAdmin] = useState(initialAdmin);
  const [token, setToken] = useState(tokenCookie || null);
  const hasCheckedAuth = useRef(false);
  
  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (token && admin) {
        try {
          // Verify token with backend
          await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // Token is valid
          setAdmin(admin);
          setToken(token);
          if (location.pathname === '/login') {
            navigate('/');
          }
        } catch (error) {
          // Token is invalid or expired
          console.error('Token verification failed:', error);
          Cookies.remove('token');
          Cookies.remove('admin');
          setAdmin(null);
          setToken(null);
          setOpenLogin(true);
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        }
      } else if (!hasCheckedAuth.current) {
        // No token found
        setOpenLogin(true);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
      setIsLoading(false);
      hasCheckedAuth.current = true;
    };

    checkAuth();
  }, [navigate, token, admin, location.pathname]);

  // Handle Google login redirect (query params)
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
      toast.success(`Welcome back, ${name}!`);

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
      setInitialMode("login");
    } catch (error) {
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
        email,
        password,
      });
      
      const { token, admin } = response.data;
      
      // Save to cookies
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("admin", JSON.stringify(admin), { expires: 1 });
      
      // Update state
      setToken(token);
      setAdmin(admin);
      setOpenLogin(false);
      
      toast.success(`Welcome back, ${admin.name || 'Admin'}!`);
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = () => {
    // Clear cookies
    Cookies.remove("token");
    Cookies.remove("admin");
    
    // Reset state
    setToken(null);
    setAdmin(null);
    
    // Redirect to login
    navigate("/login");
    setOpenLogin(true);
    
    toast.success("Logged out successfully!");
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        closeSidebar,
        openLogin,
        setOpenLogin,
        initialMode,
        setInitialMode,
        admin,
        token,
        login,
        logout,
        signup,
        isLoading,
      }}
    >
      {!isLoading && props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
