import { createContext, useContext, useEffect, useState } from "react";
import { Notes, UserContextType } from "../types";
import { useAuthContext } from "./authContext";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

const userContext = createContext<UserContextType>({} as UserContextType);

const useUserContext = () => {
  return useContext(userContext);
};
const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [savedNotes, setSavedNotes] = useState<Notes[]>([] as Notes[]);
  const { userId } = useAuthContext();

  useEffect(() => {
    fetchAllNotes().then((res) => setSavedNotes(res));
  }, [userId]);

  const fetchAllNotes = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_ENDPOINT}/notes/all/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching all notes:", err);
    }
  };

  return (
    <userContext.Provider value={{ savedNotes, setSavedNotes, fetchAllNotes }}>
      {children}
    </userContext.Provider>
  );
};

export { UserContextProvider, useUserContext };

export default userContext;
