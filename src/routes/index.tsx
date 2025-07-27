import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ShopPage from "@/pages/Shop/ShopPage";
import VendorsPage from "@/pages/Vendors/VendorsPage";
import AccountPage from "@/pages/Account/AccountPage";

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
                path: "/contact-us"
            },
            {
                path: "/account",
                Component: AccountPage
            }
        ]

    }
])