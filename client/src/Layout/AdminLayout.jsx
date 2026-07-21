import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/pages/Company/AppSidebar'
import { LayoutDashboard, NotebookText, StickyNote, User, UserPlus } from 'lucide-react'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'


const menuItems = [
    {
      title: "Dashboard",
      url: "/quan-tri",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý nhà tuyển dụng",
      url: "/quan-tri/nha-tuyen-dung",
      icon: UserPlus,
    },
    {
      title: "Quản lý người dùng",
      url: "/quan-tri/nguoi-dung",
      icon: User,
    },
    {
      title: "Quản lý bài đăng tuyển",
      url: "/quan-tri/bai-dang",
      icon: StickyNote,
    },
    {
      title: "Quản lý danh mục việc làm",
      url: "/quan-tri/danh-muc",
      icon: NotebookText,
    },
  ]

const AdminLayout = () => {
    const { pathname } = useLocation();

    const currentPage = menuItems.find(m => m.url === pathname)

    useEffect(() => {
        document.title = `Việc làm 24h - ${currentPage.title}`
    }, [pathname])

  return (
    <SidebarProvider>
      <AppSidebar menuItems={menuItems} pathname={pathname}/>
      <main className="w-full">

        <div className="flex items-center gap-4 py-3 bg-slate-200">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">{currentPage?.title}</h1>
        </div>

        <Outlet />
        
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout
