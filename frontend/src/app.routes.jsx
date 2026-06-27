import {createBrowserRouter} from "react-router-dom";
import Register from "./features/auth/pages/Register";
import RegisterArtist from "./features/auth/pages/RegisterArtist";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";
import Home from "./features/home/pages/home";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>
  },

  {
    path:"/register",
    element:<Register/>
  },
  {
    path: "/register-artist",
    element: <RegisterArtist />
  },

  {
    path:"/login",
    element:<Login/>
  }
])