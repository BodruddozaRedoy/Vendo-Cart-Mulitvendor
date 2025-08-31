import { Link, useLocation } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useRef, useState } from "react"
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
import { Button } from "@/components/ui/button";
import { RiLoginBoxFill } from "react-icons/ri";
import { authApi, useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetProfile } from "@/hooks/useGetProfile";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";
import useGetCart from "@/hooks/useGetCart";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import type { ICategories } from "@/types";


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
// const categories = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

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
            <SelectValue placeholder="Currency" />
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
  const categoryRef = useRef<HTMLDivElement | null>(null)
  const [logout, result] = useLogoutMutation()
  const {cart} = useGetCart()
  const {categories, isLoading} = useGetAllCategories()
  const dispatch = useDispatch()
  const { user } = useGetProfile()

  const handleLogout = async () => {
    await logout(null).unwrap()
    dispatch(authApi.util.resetApiState())
    dispatch(logOut())
    if (result.isSuccess) {
      toast.success("Logged Out")
    }
  }

  // Close category dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!toggleCategory) return
      const target = e.target as Node
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setToggleCategory(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setToggleCategory(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleCategory])

  

  return (
    <div className="flex items-center justify-between px-5 lg:px-20 py-5 border-b">
      {/* logo  */}
      <div className="font-bold text-2xl">
        <Link to={"/"}>Vendo<span className="text-primary">Cart</span></Link>
      </div>
      {/* categories bar  */}
      <div className="hidden lg:flex z-50">
        {/* <Skeleton className="w-full h-10"/> */}
        {/* select container  */}
        <div ref={categoryRef} className="py-2  px-5 border-y border-l rounded-l-lg relative">
          <p onClick={() => setToggleCategory(!toggleCategory)} className="flex items-center gap-2 cursor-pointer select-none"><p className="w-[120px] truncate">{selectCategory}</p><TiArrowSortedDown /></p>
          {
            toggleCategory && (
              <div className={` absolute top-10 left-2 border py-3 px-3  space-y-2 bg-white max-h-[400px] overflow-y-auto`}>
                {
                  categories?.data?.map((category:ICategories, i:number) => (
                    <p onClick={() => { setSelectCategory(category.name); setToggleCategory(false) }} key={i} className="py-1 px-3 pr-20 hover:bg-primary hover:text-background text-primary cursor-pointer select-none">{category.name}</p>
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
        <Link to={"/cart"} className="flex relative gap-2 items-center text-primary font-semibold cursor-pointer select-none hover:bg-primary/20 py-1 px-3 rounded-lg transition-all">
          <img className="w-5 " src="/public/cart.svg" alt=""/>
          <div className="flex items-start"><p>Cart</p><p className="text-xs bg-muted w-4 h-4 flex items-center justify-center absolute top-0 right-0 rounded-full text-center">{cart?.products?.length || "0"}</p></div>
        </Link>

        {/* mobile bars  */}
      </div>
      <HiMiniBars3CenterLeft className="flex lg:hidden font-bold text-2xl" />
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
