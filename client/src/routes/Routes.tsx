import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotesPage from "../pages/notes/Notes";
import EditNotes from "../pages/notes/EditNotes";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../pages/home/Home";

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
        path: "/notes/edit/:id",
        element: <EditNotes />
      },
      {
        path: "/dashboard",
        element: 
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    ]
  },
]);

export default router;