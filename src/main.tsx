import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout';
import LoginPage from './pages/login';
import AdminLayout from './components/admin/admin.layout';
import UserPage from './pages/user';
import RegisterPage from './pages/register/register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "book",
        element: <div>book page</div>,
      },
      {
        path: "about",
        element: <div>about page</div>,
      },

    ]
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "book",
        element: <div>book page</div>,
      },

    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/user",
    element: <UserPage />,
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
