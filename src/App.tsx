import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import MyNotes from "./pages/MyNotes"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"


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
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
