import { createContext, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";

export const AppContext = createContext();



const AppContextProvider=(props)=>{



  //store current user in cookie than we use currentuser anywhere
  const userCookie = Cookies.get("user");
const initialUser = userCookie && userCookie !== "undefined" 
  ? JSON.parse(userCookie) 
  : null;

const [user, setUser] = useState(initialUser);



//signup
 const signup = async (username, email, password,phone) => {
      try {
        await axios.post("http://localhost:5000/user/signup", { username, email, password,phone });
        alert("Signup successful! Please login.");
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
      }
    };
  
    //login
      const login = async (email, password) => {
      try {
        const response = await axios.post("http://localhost:5000/user/login", { email, password });
        console.log("Login response:", response.data);
        Cookies.set("token", response.data.token, { expires: 1 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 });
        setUser(response.data.user);
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }
  



const value={

    user,
    signup,
    login


}


return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)


}

export default AppContextProvider