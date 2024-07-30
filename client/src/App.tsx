import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import MyNotes from "./pages/MyNotes"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { VideoContextProvider } from "./contexts/videoContext"
import Register from "./pages/Register"
import GenerateNotes from "./pages/GenerateNotes"
import { Client } from 'appwrite';

const App: React.FC = () => {

  const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6674507e001ebe2ee970');
    
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
        },{
          path: "/generate-notes",
          element: <GenerateNotes />
        },

      ]
    },
    
  ])

  return (
    <VideoContextProvider>
      <RouterProvider router={router} />
    </VideoContextProvider>
  )
}

export default App
