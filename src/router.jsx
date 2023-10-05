import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
// import Users from "./views/Users";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
// import DefaultLayout from "./components/DefaultLayout";
import Main from "./views/Main";
import SecondScreen from "./views/SecondScreen";
import MapScreen from "./views/MapScreen";

 const router = createBrowserRouter([
     {
         path: '/',
         element: <GuestLayout/>,
         children: [
             {
                 path: '/',
                 element: <Main/>
             },
             {
                 path: '/enter',
                 element: <SecondScreen/>
             },
             {
                 path: '/login',
                 element: <Login/>
             },
             {
                 path: '/signup',
                 element: <Signup/>
             },
         ]

     },
     {
         path: '/map',
         element: <MapScreen/>,

     },




     {
         path: '*',
         element: <NotFound/>
     },

 ])

export default router
