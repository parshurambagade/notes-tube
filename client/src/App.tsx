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
    <VideoContextProvider>
      <RouterProvider router={router} />
    </VideoContextProvider>
    </AuthContextProvider>
  )
}

export default App
