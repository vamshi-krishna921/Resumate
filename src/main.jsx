import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SignIn from "./auth/sign-in/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard";
import { ClerkProvider } from "@clerk/clerk-react";

const publishKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
]);
createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={publishKey}>
    <RouterProvider router={root}>
      <App />
    </RouterProvider>
  </ClerkProvider>
);
