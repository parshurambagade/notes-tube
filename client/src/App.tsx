import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import MyNotes from "./pages/MyNotes"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { VideoContextProvider } from "./contexts/videoContext"
import Register from "./pages/Register"
import GenerateNotes from "./pages/GenerateNotes"
import { AuthContextProvider } from "./contexts/authContext"
import { CurrentNotesContextProvider } from "./contexts/currentNotesContext"
import { UserContextProvider } from "./contexts/userContext"
import NotesPage from "./pages/Notes"

const App: React.FC = () => {
    
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/notes/:id",
          element: <NotesPage />
        },
        {
          path: "/my-notes",
          element: 
          <ProtectedRoute>
            <MyNotes />
          </ProtectedRoute>
        }
      ]
    },
    
  ])

  return (
    <AuthContextProvider>
      <UserContextProvider>
    <CurrentNotesContextProvider>
      <RouterProvider router={router} />
    </CurrentNotesContextProvider>
    </UserContextProvider>
    </AuthContextProvider>
  )
}

export default App
