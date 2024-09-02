import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType} from "../types";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext<AuthContextType | null>(null);

interface DecodedUser {
  userId: string
}

const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        setAuthToken(token);
        // Decode the token and set the user state
        const decodedUser = jwtDecode<DecodedUser>(token);
        setUserId(decodedUser.userId);

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [])
  
  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
export default AuthContext;
