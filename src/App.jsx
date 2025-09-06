import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import Layout from './Layouts/layout';
import FeedPage from './Pages/FeedPage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFoundPage from './Pages/NotFoundPage';
import ProtectedRoute from './Layouts/ProtectedRoute';
import AuthRoute from './Layouts/AuthRoute';
import PostDetailsPage from './Pages/PostDetailsPage';
import ChangePassword from './Pages/ChangePassword';

const router = createBrowserRouter([
  {path: '', element: <Layout/>, children: [
    // {index: true, element: <FeedPage/>},
    {index: true, element: <ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path: 'profile', element: <ProtectedRoute><Profile/></ProtectedRoute>},
    {path: 'post-details/:id', element: <ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
    {path: 'change-password', element: <ProtectedRoute><ChangePassword/></ProtectedRoute>},
    
    {path: '*', element: <NotFoundPage/>},
  ]},
  {path: '', element: <AuthLayout/>, children: [
    // {path: 'login', element: <Login/>},
    // {path: 'register', element: <Register/>},
    {path: 'login', element: <AuthRoute><Login/></AuthRoute>},
    {path: 'register', element: <AuthRoute><Register/></AuthRoute>},
  ]}
]);
export default function App() {
  return <>
    <RouterProvider router={router}></RouterProvider>  
  </>
}
