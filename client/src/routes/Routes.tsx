import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import EditNotes from "../pages/notes/EditNotes";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../pages/home/Home";
import ViewNotes from "../pages/notes/ViewNotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/notes/:notesId",
        element: (
          <ProtectedRoute>
            <ViewNotes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notes/edit/:notesId",
        element: (
          <ProtectedRoute>
            <EditNotes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
