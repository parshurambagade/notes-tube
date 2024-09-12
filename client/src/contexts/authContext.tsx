import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User} from "../types";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the cookie exists to determine authentication status

    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/auth/status`, {
          withCredentials: true,
        });
        console.log("Check is Authenticated", response);  
        setUser(response.data.user);
        setUserId(response.data.user._id);
        setIsAuthenticated(true); 
      } catch (err) {
        console.error("User is not authenticated", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);
  
  const logout = async () => {
    try {
      await axios.post(`${API_ENDPOINT}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      setUserId("");
      console.log("User logged out");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userId, isAuthenticated, user,setUserId, setIsAuthenticated, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
export default AuthContext;
