import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './auth/sign-in/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Dashboard from './dashboard'

const root = createBrowserRouter(
   [
    {
        element: <App />,
        children : [
            {
                path: '/',
                element: <Home />
            },
             {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
            
    },
    {
        path: '/auth/sign-in',
        element: <SignIn />
    },
   ]
)
createRoot(document.getElementById('root')).render(
    <RouterProvider router={root}>
        <App />
    </RouterProvider>
)
