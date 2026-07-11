"use client"

import * as React from "react"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router"
import { useCategoryStore } from "@/stores/useCategoryStore"
import { Button } from "../ui/button"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

function NavBar() {
    const { categories, getAllCategory } = useCategoryStore();

    React.useEffect(() => {
        getAllCategory();
    }, [])
    
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <a href="/" className='text-green-900 font-semibold'>ViệcLàm24h</a>
        <NavigationMenu className={`hidden lg:block`}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Việc làm</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories?.map((category) => (
                    <ListItem 
                        key={category.title} 
                        title={category.title}
                        href={category.slug}></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link to={`nha-tuyen-dung`}>Nhà tuyển dụng</Link>}/>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link to="/tin-tuc">Tin tức</Link>} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' className={`bg-white text-green-700 hover:text-white hover:bg-green-700 border-green-700 cursor-pointer`}>
          <Link to={`/signup`}>Đăng ký</Link>
        </Button>
        <Button variant='ghost' className={`bg-green-700 text-white hover:text-green-700 hover:bg-white border-green-700 cursor-pointer`}>
          <Link to={`/signin`}>Đăng nhập</Link>
        </Button>
      </div>
    </div>
  )
}

function ListItem({
  title,
  href,
  ...props
}){
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link to={`/${href}`}>
          <div className="leading-none font-medium">{title}</div>
        </Link>} />
    </li>
  )
}

export default NavBar;