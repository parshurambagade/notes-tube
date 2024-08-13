import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType} from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      setAuthToken(localStorage.getItem('authToken'));
    }

    if(localStorage.getItem('userId')){
      setUserId(localStorage.getItem('userId'));
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
