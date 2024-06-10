import Authlayout from "../layout/Authlayout";
import MainLayout from "../layout/mainlayout";
import Home from "../pages/home";
import Signup from "../pages/signup";
import NotFound from "../pages/notFound";
import ProductDetails from "../pages/home/components/ProductDetails";
import Login from "../pages/login";
import Checkout from "../pages/home/components/Checkout";
import Ordereceipt from "../pages/home/components/Ordereceipt";
export const Allroutes = [
    {
        path: "/home",
        component:Home,
        layout:MainLayout
    }, 
    {
        path: "/product/:id",
        component:ProductDetails,
        layout:MainLayout
    },
    {
        path: "/checkout",
        component:Checkout,
        layout:MainLayout
    },
    {
        path: "/",
        component:Signup,
        layout:Authlayout
    },
    {
        path: "/login",
        component:Login,
        layout:Authlayout
    },
    
]