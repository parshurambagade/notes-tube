import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { CurrentNotesContextProvider } from "./contexts/currentNotesContext";
import router from "./routes/Routes.tsx";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <CurrentNotesContextProvider>
        <RouterProvider router={router} />
      </CurrentNotesContextProvider>
    </AuthContextProvider>
  );
};

export default App;
