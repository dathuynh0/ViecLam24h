
import { ChevronsUpDown, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"

export default function NavCompany({ user }) {
  const { isMobile } = useSidebar()
  const signOut = useAuthStore((state) => state.signOut)
  const navigate = useNavigate();

  const displayName = user?.companyName || user?.fullName;
  const avatarUrl = `${import.meta.env.VITE_BACKEND_URL}/${user?.logoUrl || user?.avatarUrl}`;

  const handleLogout = async () => {
    await signOut();
    navigate('/signin')
  }
  

  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                    >
                        <img
                            src={avatarUrl}
                            alt={displayName}
                            className="h-8 w-8 rounded-full object-contain border border-gray-200"
                        />
                        <div className="flex flex-col flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{displayName}</span>
                            <span className="truncate text-xs text-muted-foreground">
                            {user?.email}
                            </span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-[--radix-popper-anchor-width] min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <img
                                src={avatarUrl}
                                alt={displayName}
                                className="h-8 w-8 rounded-full object-contain"
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{displayName}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <SidebarMenuButton onClick={handleLogout} className="hover:bg-red-100 hover:text-red-800 text-red-600 cursor-pointer">
                            <LogOut className="mr-2 size-4" />
                            Đăng xuất
                        </SidebarMenuButton>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}