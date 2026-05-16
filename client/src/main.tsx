import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth/auth-context";
import Login from "./auth/login";
import Register from "./auth/register";
import { ProtectedRoute } from "./auth/protected-route";
import Layout from "./components/Layout";
import PrivacyASCII from "./components/Privacy";
import "./index.css";
import AllHabitsPage from "./pages/AllHabitspage";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/habits",
        element: (
          <ProtectedRoute>
            <AllHabitsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/privacy",
        element: <PrivacyASCII />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster position="bottom-right" />
  </StrictMode>,
);
