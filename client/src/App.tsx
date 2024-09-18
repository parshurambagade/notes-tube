import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { CurrentNotesContextProvider } from "./contexts/currentNotesContext";
import router from "./routes/Routes.tsx";
import { UserContextProvider } from "./contexts/userContext.tsx";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
      <CurrentNotesContextProvider>
        <RouterProvider router={router} />
      </CurrentNotesContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default App;
