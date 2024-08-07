import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      setAuthToken(localStorage.getItem('authToken'));
    }

    if(localStorage.getItem('loggedInUser')){
      setLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')!));
    }
  }, [])
  
  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, loggedInUser, setLoggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
export default AuthContext;
