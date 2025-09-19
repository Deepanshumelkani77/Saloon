import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore from localStorage
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Handle Google login redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");

    if (tokenParam && id && email) {
      const newUser = { _id: id, name, email };

      // Save in localStorage
      localStorage.setItem("token", tokenParam);
      localStorage.setItem("user", JSON.stringify(newUser));

      setToken(tokenParam);
      setUser(newUser);

      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);

  // Signup
  const signup = async (username, email, password, phone) => {
    try {
      await axios.post("http://localhost:1000/user/signup", {
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
      const response = await axios.post("http://localhost:1000/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      setToken(response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const value = {
    user,
    token,
    signup,
    login,
    logout,
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
