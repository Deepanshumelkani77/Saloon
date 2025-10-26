import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userCookie = Cookies.get("user");
  const tokenCookie = Cookies.get("token");

  const initialUser =
    userCookie && userCookie !== "undefined" ? JSON.parse(userCookie) : null;

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(tokenCookie || null);

  // ✅ Sync authentication state across frontend and shop
  useEffect(() => {
    const checkCookieChanges = () => {
      const currentUserCookie = Cookies.get("user");
      const currentTokenCookie = Cookies.get("token");

      // If cookies exist but state doesn't match, update state (logged in from frontend)
      if (currentUserCookie && currentTokenCookie) {
        const cookieUser = JSON.parse(currentUserCookie);
        if (!user || user.id !== cookieUser.id) {
          setUser(cookieUser);
          setToken(currentTokenCookie);
        }
      }
      // If cookies are removed but state exists, clear state (logged out from frontend)
      else if (!currentUserCookie && !currentTokenCookie && user) {
        setUser(null);
        setToken(null);
      }
    };

    // Check every 500ms for cookie changes
    const interval = setInterval(checkCookieChanges, 500);

    return () => clearInterval(interval);
  }, [user]);

  // Handle Google login redirect (query params)
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
      Cookies.set("token", response.data.token, { expires: 1, path: '/' });
      Cookies.set("user", JSON.stringify(response.data.user), { expires: 1, path: '/' });
      setUser(response.data.user);
      setToken(response.data.token);
      toast.success(`Welcome back, ${response.data.user.name || response.data.user.username}!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("token", { path: '/' });
    Cookies.remove("user", { path: '/' });
    setUser(null);
    setToken(null);
    toast.info("Logged out successfully");
    navigate("/");
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
    setUser 
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
