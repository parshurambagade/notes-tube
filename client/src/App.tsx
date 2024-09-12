import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/home/Home"
import Dashboard from "./pages/dashboard/Dashboard"
import Layout from "./components/layouts/Layout"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/common/ProtectedRoute"
import { VideoContextProvider } from "./contexts/videoContext"
import Register from "./pages/auth/Register"
import GenerateNotes from "./pages/GenerateNotes"
import { AuthContextProvider } from "./contexts/authContext"
import { CurrentNotesContextProvider } from "./contexts/currentNotesContext"
import EditNotes from "./pages/notes/EditNotes.tsx"
import NotesPage from "./pages/notes/Notes"
import HomePage from "./pages/home/HomePage2"


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
          path: "/notes/edit",
          element: <EditNotes />
        },
        {
          path: "/my-notes",
          element: 
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ]
    },
    
  ])

  return (
    <AuthContextProvider>
    <CurrentNotesContextProvider>
      <RouterProvider router={router} />
    </CurrentNotesContextProvider>
    </AuthContextProvider>
  )
}

export default App
