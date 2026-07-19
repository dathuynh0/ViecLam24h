import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'
import { Link } from 'react-router'
import NavCompany from './NavCompany'
import { useAuthStore } from '@/stores/useAuthStore'


const AppSidebar = ({ menuItems, pathname }) => {
    const user = useAuthStore(s => s.user)
    

  return (
    <Sidebar className={`border border-slate-500`}>
        <SidebarHeader>
            <div className='flex items-center gap-2'>
                <Button variant='ghost' className={`h-12 w-12 bg-green-200`}>
                    <Building2 />
                </Button>
                <div>
                    <h1 className='font-bold text-green-700'>Việc làm 24h</h1>
                    <p className='text-sm text-muted-foreground'>Nhà tuyển dụng</p>
                </div>
            </div>
        </SidebarHeader>

        <SidebarContent className={`pt-6`}>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className={`space-y-2`}>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.url
                            return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                <Link to={item.url} className='w-full flex items-center-safe gap-4'>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
            <SidebarMenuButton size='lg'>
                <NavCompany user={user}/>
            </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
