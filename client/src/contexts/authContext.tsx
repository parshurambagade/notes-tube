import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { initialNotes, useCurrentNotesContext } from "./currentNotesContext";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setVideoId, setNotes, setIsSaved } = useCurrentNotesContext();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/auth/status`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setUserId(response.data.user._id);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${API_ENDPOINT}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuthenticated(false);
      setUserId("");
      setVideoId("");
      setNotes(initialNotes);
      setIsSaved(false);
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        userId,
        isAuthenticated,
        user,
        setUserId,
        setIsAuthenticated,
        setUser,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
export default AuthContext;
