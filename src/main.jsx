import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Pages/Home/Home';
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
import { axiosPublic } from './Hook/useAxiosPublic';
import EditTask from './Pages/Dashboard/EditTask';
import MyList from './Pages/MyList/MyList';
import Statistic from './Pages/Statistic/Statistic';
import ProfileUpdate from './Pages/Dashboard/ProfileUpdate';
import ErrorPage from './Components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <PrivateRoute><MyList></MyList></PrivateRoute>
      },
      {
        path: '/statistics',
        element: <Statistic></Statistic>
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
        path: 'toDoList/:email',
        element: <ListToDo></ListToDo>,
        loader: ({ params }) => axiosPublic(`/myTasks/${params.email}`)
      },
      {
        path:'profile/updateProfile/:email',
        element: <ProfileUpdate></ProfileUpdate>
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
      },
      {
        path: 'edit/:id',
        element: <EditTask></EditTask>,
        loader: ({ params }) => axiosPublic(`/myTask/${params.id}`)
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
