import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './Providers/AuthProvider';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import PrivateRoute from './Providers/PrivateRoute';
import Main from './Layout/Main';
import DashBoard from './Layout/DashBoard';
import CreateTask from './Pages/Dashboard/CreateTask';
import ListToDo from './Pages/Dashboard/ListToDo';
import OngoingTask from './Pages/Dashboard/OngoingTask';
import PreviousTask from './Pages/Dashboard/PreviousTask';
import Profile from './Pages/Dashboard/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
     {
      path: '/',
      element: <Home></Home>
     }
     ,
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/to-do-list',
        element: <ListToDo></ListToDo>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      {
        path: 'createTask',
        element: <CreateTask></CreateTask>
      },
      {
        path: 'to-do-list',
        element: <ListToDo></ListToDo>
      },
      {
        path: 'ongoingTask',
        element: <OngoingTask></OngoingTask>
      },
      {
        path: 'prevTask',
        element: <PreviousTask></PreviousTask>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
