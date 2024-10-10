
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home'
import Favorites from '../pages/Favorites'
import Navbar from '../components/Navbar'
import Iteminfo from '../pages/Iteminfo';
import Footer from './Footer';
import ReadBooks from '../pages/ReadBooks'

import { createBrowserRouter, RouterProvider, } from "react-router-dom"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Signup />
    },
    {
        path: "/Footer",
        element: <Footer />
    },
    {
        path: "/Iteminfo/:id",
        element: <Iteminfo />
    },
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/Home",
        element: <Home />
    },
    {
        path: "/Navbar",
        element: <Navbar />
    },
    {
        path: "/Favorites",
        element: <Favorites />
    },
    {
        path: "/ReadBooks",
        element: <ReadBooks />
    },



]);
const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router