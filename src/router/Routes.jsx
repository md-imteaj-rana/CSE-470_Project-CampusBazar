import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import AddListing from "../pages/AddListing";
import MyOrders from "../pages/MyOrders";
import MyProfile from "../pages/MyProfile";
import MyCart from "../pages/MyCart";
import Marketplace from "../pages/Marketplace";
import ViewDetails from "../pages/ViewDetails";
import Login from "../pages/Login";
import Regisger from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children:[
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "AddListing",
          element: <PrivateRoutes><AddListing></AddListing></PrivateRoutes>
        },
        {
          path: "MyOrders",
          element: <PrivateRoutes><MyOrders></MyOrders></PrivateRoutes>
        },
        {
          path: "MyProfile",
          element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
        },
        {
          path: "MyCart",
          element: <PrivateRoutes><MyCart></MyCart></PrivateRoutes>
        },
        {
          path: "Maretplace",
          element: <Marketplace></Marketplace>
        },
        {
          path: "ViewDetails",
          element: <PrivateRoutes><ViewDetails></ViewDetails></PrivateRoutes>
        },
        {
          path: "Login",
          element: <Login></Login>
        },
        {
          path: "Register",
          element: <Regisger></Regisger>
        }
        
    ]
  },
]);

export default router;