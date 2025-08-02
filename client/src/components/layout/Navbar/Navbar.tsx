import { Link, useLocation } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TiArrowSortedDown } from "react-icons/ti";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import LoginPage from "@/pages/Login/LoginPage";
import { Button } from "@/components/ui/button";
import { RiLoginBoxFill } from "react-icons/ri";
import { useGetUserQuery, useLoginUserMutation, useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetProfile } from "@/hooks/useGetProfile";
import { toast } from "sonner";


// top nav links 
const topNavLinks = [
  {
    path: "/about-us",
    title: "About Us"
  },
  {
    path: "/careers",
    title: "Careers"
  },
  {
    path: "/open-a-shop",
    title: "Open a shop"
  }
]

// categories 
const categories = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

// main nav links 
const mainNavLinks = [
  {
    path: "/",
    title: "Home"
  },
  {
    path: "/shop",
    title: "Shop"
  },
  {
    path: "/vendors",
    title: "Vendors"
  },
  {
    path: "/contact-us",
    title: "Contact Us"
  }
]


const TopNavbar = () => {
  return (
    <div className="hidden md:grid grid-cols-3 border-b px-20 py-3 items-center justify-center">
      {/* links  */}
      <div className="flex gap-5">
        {
          topNavLinks.map((link, i) => (
            <Link to={link.path} key={i}><p className="text-primary text-xs font-semibold border-r-2 pr-5">{link.title}</p></Link>
          ))
        }
      </div>
      {/* middle text  */}
      <div className="text-center text-primary text-xs font-semibold">Free shipping for all orders over <span className="font-bold text-green-500">$80.00</span></div>
      {/* end text  */}
      <div className="flex gap-5 justify-end items-center">
        <p className="text-primary text-xs font-semibold">Need help? Call Us: <span className="font-bold text-green-500">+880 175 838 3869</span></p>
        <Select>
          <SelectTrigger size="sm" className="w-[115px] text-xs h-[40px] text-primary font-semibold">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem className="text-xs text-primary font-semibold" value="bengali">Bengali</SelectItem>
            <SelectItem className="text-xs text-primary font-semibold" value="arabic">Arabic</SelectItem>
            <SelectItem className="text-xs text-primary font-semibold" value="english">English</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger size="sm" className="w-[110px] text-xs h-[40px] text-primary font-semibold">
            <SelectValue  placeholder="Currency" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem className="text-xs text-primary font-semibold" value="usd">USD</SelectItem>
            <SelectItem className="text-xs text-primary font-semibold" value="bdt">BDT</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


const MainNavbar = () => {
  const location = useLocation()

  const [selectCategory, setSelectCategory] = useState("All Categories")
  const [toggleCategory, setToggleCategory] = useState(false)
  const [logout, result] = useLogoutMutation()
  const {user} = useGetProfile()

  const handleLogout = () => {
    logout(null)
    if(result.isSuccess){
      toast.success("Logged Out")
    }
  }

  return (
    <div className="flex items-center justify-between px-5 lg:px-20 py-5 border-b">
      {/* logo  */}
      <div className="font-bold text-2xl">
        <Link to={"/"}>Vendo<span className="text-primary">Cart</span></Link>
      </div>
      {/* categories bar  */}
      <div className="hidden lg:flex z-50">
        {/* select container  */}
        <div className="py-2  px-5 border-y border-l rounded-l-lg relative">
          <p onClick={() => setToggleCategory(!toggleCategory)} className="flex items-center gap-2 cursor-pointer select-none"><p className="w-[120px] truncate">{selectCategory}</p><TiArrowSortedDown/></p>
          {
            toggleCategory && (
              <div  className={` absolute top-10 left-2 border py-3 px-3  space-y-2 bg-white max-h-[400px] overflow-y-auto`}>
            {
              categories.map((category, i) => (
                <p onClick={() => { setSelectCategory(category.value); setToggleCategory(false) }} key={i} className="py-1 px-3 pr-20 hover:bg-primary hover:text-background text-primary cursor-pointer select-none">{category.label}</p>
              ))
            }
          </div>
            )
          }
        </div>
        {/* input */}
        <input className="py-2 px-5 border-y border-r rounded-r-lg w-full" type="text" name="" id="" placeholder="Search here..." />
      </div>
      {/* main nav links  */}
      <div className="hidden lg:flex items-center gap-5">
        {
          mainNavLinks.map((link, i) => (
            <Link to={link.path} key={i}><p className={`${location.pathname === link.path && 'text-secondary border-b'} text-primary pb-0.2  hover:text-secondary border-secondary`}>{link.title}</p></Link>
          ))
        }
      </div>
      {/* nav end links  */}
      <div className="hidden lg:flex items-center gap-4">
        {/* account  */}
        {
          user ? <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 items-center font-semibold text-primary cursor-pointer select-none hover:bg-primary/20 py-1 px-3 rounded-lg transition-all"><img className="w-5" src="/public/account.svg" alt="" /> Account</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link to={"/account/profile"}>Profile</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to={"account/order-tracking"}>Order Tracking</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to={"/account/my-orders"}>My Orders</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to={"/account/settings"}>Settings</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> : (
          <Link to={"/login"}><Button variant={"outline"}><RiLoginBoxFill /> Login</Button></Link>
        )
        }
        {/* wishlist  */}
        <div className="flex gap-2 items-center text-primary font-semibold cursor-pointer select-none hover:bg-primary/20 py-1 px-3 rounded-lg transition-all">
          <img className="w-5" src="/public/wishlist.svg" alt="" />
          <Link to={"/wishlist"}><p>Wishlist</p></Link>
        </div>
        {/* cart  */}
        <div className="flex gap-2 items-center text-primary font-semibold cursor-pointer select-none hover:bg-primary/20 py-1 px-3 rounded-lg transition-all">
          <img className="w-5" src="/public/cart.svg" alt="" />
          <Link to={"/cart"}><p>Cart</p></Link>
        </div>

        {/* mobile bars  */}
      </div>
        <HiMiniBars3CenterLeft className="flex lg:hidden font-bold text-2xl"/>
    </div>
  )
}


export default function Navbar() {
  return (
    <div>
      {/* Top bar  */}
      <TopNavbar />
      {/* Bottom bar  */}
      <MainNavbar />
    </div>
  )
}
