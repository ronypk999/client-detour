import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRouter from "./ProtectedRouter";
import Property from "../pages/Property";
import PrivateRouter from "./PrivateRouter";
import Error from "../pages/Error";
import UpdateProfile from "../pages/UpdateProfile";
import AddTouristSpot from "../pages/AddTouristSpot";
import Allspots from "../pages/Allspots";
import List from "../pages/List";
import AuthProvider from "../provider/AuthProvider";
import Update from "../pages/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout></Layout>
      </AuthProvider>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: (
          <ProtectedRouter>
            <Login></Login>
          </ProtectedRouter>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRouter>
            <SignUp></SignUp>
          </ProtectedRouter>
        ),
      },
      {
        path: "/property/:id",
        element: (
          <PrivateRouter>
            <Property></Property>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/spots/${params.id}`),
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <UpdateProfile></UpdateProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/add-tourist-spot",
        element: (
          <PrivateRouter>
            <AddTouristSpot></AddTouristSpot>
          </PrivateRouter>
        ),
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/countries`),
      },
      {
        path: "/all-tourist-spot",
        element: <Allspots></Allspots>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/spots/all`),
      },
      {
        path: "/all-tourist-spot/:country",
        element: <Allspots></Allspots>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/spotsByCountry/${params.country}`
          ),
      },
      {
        path: "/list",
        element: (
          <PrivateRouter>
            <List></List>
          </PrivateRouter>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRouter>
            <Update></Update>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/spots/${params.id}`),
      },
    ],
  },
]);

export default router;
