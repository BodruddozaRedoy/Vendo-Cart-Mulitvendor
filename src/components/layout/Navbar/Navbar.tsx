import { Link, useLocation } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownNarrowWide, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TiArrowSortedDown } from "react-icons/ti";
import { Separator } from "@/components/ui/separator"


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
    title: "Title"
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
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const location = useLocation()

  const [selectCategory, setSelectCategory] = useState("All Categories")
  const [toggleCategory, setToggleCategory] = useState(false)
  return (
    <div className="flex items-center justify-between px-20 py-5 border-b">
      {/* logo  */}
      <div className="font-bold text-2xl">
        Vendo<span className="text-primary">Cart</span>
      </div>
      {/* categories bar  */}
      <div className="flex">
        {/* select container  */}
        <div className="py-2  px-5 border-y border-l rounded-l-lg relative">
          <p onClick={() => setToggleCategory(!toggleCategory)} className="flex items-center gap-2 cursor-pointer select-none"><p className="w-[120px] truncate">{selectCategory}</p><TiArrowSortedDown/></p>
          {
            toggleCategory && (
              <div  className={` absolute top-10 left-2 border py-3 px-3  space-y-2 bg-white max-h-[400px] overflow-y-auto`}>
            {
              categories.map((category, i) => (
                <p onClick={() => {setSelectCategory(category.value); setToggleCategory(false)}} key={i} className="py-1 px-3 pr-20 hover:bg-primary hover:text-white text-primary cursor-pointer select-none">{category.label}</p>
              ))
            }
          </div>
            )
          }
        </div>
        {/* <Separator  orientation="vertical" /> */}
        {/* input */}
        <input className="py-2 px-5 border-y border-r rounded-r-lg w-full" type="text" name="" id="" placeholder="Search here..." />
      </div>
      {/* main nav links  */}
      <div className="flex items-center gap-5">
        {
          mainNavLinks.map((link, i) => (
            <Link to={link.path} key={i}><p className={`${location.pathname.includes(link.path) && 'text-secondary border-b'} text-primary pb-0.2  hover:text-secondary border-secondary`}>{link.title}</p></Link>
          ))
        }
      </div>
      {/* nav end links  */}
      <div className="flex items-center gap-4">
        {/* account  */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 items-center font-semibold text-primary"><img className="w-5" src="https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000" alt="" /> Account</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* wishlist  */}
        <div className="flex gap-2 items-center text-primary font-semibold">
          <img className="w-5" src="https://img.icons8.com/?size=100&id=112373&format=png&color=000000" alt="" />
          <Link to={"/wishlist"}><p>Wishlist</p></Link>
        </div>
        {/* cart  */}
        <div className="flex gap-2 items-center text-primary font-semibold">
          <img className="w-5" src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=000000" alt="" />
          <Link to={"/cart"}><p>Cart</p></Link>
        </div>
      </div>
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
