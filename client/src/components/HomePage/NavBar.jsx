"use client"

import * as React from "react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

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
import NavUser from "../../Layout/NavUser"
import { useAuthStore } from "@/stores/useAuthStore"
import { Menu } from "lucide-react";

function NavBar() {
  const { categories, getAllCategory } = useCategoryStore();
  const accessToken = useAuthStore((s) => s.accessToken);

   const [open, setOpen] = React.useState(false);
    
  React.useEffect(() => {
    getAllCategory();
  }, [])
     
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <a href="/" className="text-green-900 font-semibold text-lg">
          ViệcLàm24h
        </a>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Việc làm</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories?.map((category) => (
                    <ListItem
                      key={category.title}
                      title={category.title}
                      href={`danh-muc/${category.slug}`}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to="/cong-ty">Danh sách công ty</Link>}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      
      <div className="hidden lg:flex items-center gap-4">
        {accessToken ? (
          <NavUser />
        ) : (
          <>
            <Button
              variant="ghost"
              className="bg-white text-green-700 hover:text-white hover:bg-green-700 border-green-700 cursor-pointer"
            >
              <Link to="/signup">Đăng ký</Link>
            </Button>
            <Button
              variant="ghost"
              className="bg-green-700 text-white hover:text-green-700 hover:bg-white border-green-700 cursor-pointer"
            >
              <Link to="/signin">Đăng nhập</Link>
            </Button>
          </>
        )}
      </div>

      <div className="flex lg:hidden items-center gap-2">
        {accessToken && <NavUser />}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-6 w-6 text-green-800" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="text-green-900 text-left">
                ViệcLàm24h
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-6 px-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="jobs">
                  <AccordionTrigger className="text-base font-medium">
                    Việc làm
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 pl-2">
                      {categories?.map((category) => (
                        <li key={category.title}>
                          <Link
                            to={`danh-muc/${category.slug}`}
                            onClick={() => setOpen(false)}
                            className="text-sm text-gray-700 hover:text-green-700"
                          >
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                to="/cong-ty"
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2"
              >
                Danh sách công ty
              </Link>

              {!accessToken && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full bg-white text-green-700 hover:text-white hover:bg-green-700 border border-green-700 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/signup" className="w-full">Đăng ký</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full bg-green-700 text-white hover:text-green-700 hover:bg-white border border-green-700 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/signin" className="w-full">Đăng nhập</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
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