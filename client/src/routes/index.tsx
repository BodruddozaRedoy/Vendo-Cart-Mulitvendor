import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ShopPage from "@/pages/Shop/ShopPage";
import VendorsPage from "@/pages/Vendors/VendorsPage";
import AccountPage from "@/pages/Account/AccountPage";
import ContactUs from "@/pages/Contact/ContactUs";
import WishlistPage from "@/pages/Wishlist/WishlistPage";
import CartPage from "@/pages/Cart/CartPage";
import ProductDetailsPage from "@/pages/ProductDetails/ProductDetailsPage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import OpenAShop from "@/pages/OpenAShop/OpneAShop";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: "/",
                Component: HomePage
            },
            {
                path: "/shop",
                Component: ShopPage
            },
            {
                path: "/vendors",
                Component: VendorsPage
            }, 
            {
                path: "/contact-us",
                Component: ContactUs
            },
            {
                path: "/account",
                Component: AccountPage,
                children: [
                    {
                        path: "profile",
                        Component: AccountPage
                    },
                    {
                        path: "order-tracking",
                        Component: AccountPage
                    },
                    {
                        path: "my-orders",
                        Component: AccountPage
                    },
                    {
                        path: "settings",
                        Component: AccountPage
                    },
                ]
            },
            {
                path: "/wishlist",
                Component: WishlistPage
            },
            {
                path: "/cart",
                Component: CartPage
            },
            {
                path: "/product-details",
                Component: ProductDetailsPage
            },
            {
                path:"/login",
                Component: LoginPage
            },
            {
                path: "/register",
                Component: RegisterPage
            },
            {
                path: "/open-a-shop",
                Component: OpenAShop
            }
        ]

    }
])