import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SignIn from "./auth/sign-in/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard";
import { ClerkProvider } from "@clerk/clerk-react";
import Edit from "./dashboard/resume/[resumeId]/edit";
import View from "./my-resume/[resume-id]/View/View";

const publishKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <Edit />,
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
  {
    path: "/my-resume/:resumeId/view",
    element: <View />,
  },
]);
createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={publishKey}>
    <RouterProvider router={root}></RouterProvider>
  </ClerkProvider>
);
