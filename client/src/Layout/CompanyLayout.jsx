import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet, useLocation } from 'react-router';
import AppSidebar from '@/pages/Company/AppSidebar';
import { Building2, FilePlus2, History, LayoutDashboard } from "lucide-react";
import { useEffect } from "react";

const menuItems = [
    {
      title: "Dashboard",
      url: "/nha-tuyen-dung",
      icon: LayoutDashboard,
    },
    {
      title: "Đăng tin tuyển dụng",
      url: "/nha-tuyen-dung/dang-tin",
      icon: FilePlus2,
    },
    {
      title: "Quản lý bài đăng",
      url: "/nha-tuyen-dung/quan-ly-bai-dang",
      icon: History,
    },
    {
      title: "Quản lý công ty",
      url: "/nha-tuyen-dung/cong-ty",
      icon: Building2,
    },
  ]

const CompanyLayout = () => {
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

export default CompanyLayout
