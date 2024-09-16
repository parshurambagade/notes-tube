import { createContext, useContext, useEffect, useState } from "react";
import { CurrentNotesContextType, User, UserContextType } from "../types";
import { useAuthContext } from "./authContext";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

const currentUserContext = createContext<UserContextType | null>(null);

const useUserContext = () => {
  return useContext(currentUserContext);
};

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const { userId } = useAuthContext() as { userId: string };

  useEffect(() => {
    userId && fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/user/${userId}`);
      console.log(response.data);
      setUser(response.data);
    } catch (err) { 
      console.error(err);
    }
  };

  return (
    <currentUserContext.Provider value={{ user, setUser }}>
      {children}
    </currentUserContext.Provider>
  );
};

export { UserContextProvider, useUserContext };

export default currentUserContext;
