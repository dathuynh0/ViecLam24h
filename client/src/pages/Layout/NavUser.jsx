import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { LogOut, User, Settings, ChevronDown, Briefcase } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, buttonVariants } from "@/components/ui/button"

export default function NavUser() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  

  const {user, signOut} = useAuthStore();

  const displayName = user?.fullName || user?.companyName;
  const avatarUrl = `${import.meta.env.VITE_BACKEND_URL}/${user?.avatarUrl || user?.logoUrl}`;

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
  };

  const classButton = 'flex w-full items-center justify-start gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer'

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <img
          src={avatarUrl}
          alt={displayName}
          className="h-9 w-9 rounded-full object-cover border border-gray-200"
        />
        <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
          {displayName}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              navigate(
                "/profile"
              );
            }}
            className= {classButton}
          >
            <User className="h-4 w-4" />
            Hồ sơ của tôi
          </Button>

          {user.role === "candidate" ? (
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                navigate("/ung-vien/applications");
              }}
              className={classButton}
            >
              <Briefcase className="h-4 w-4" />
              Việc đã ứng tuyển
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                navigate("/cong-ty/jobs");
              }}
              className={classButton}
            >
              <Briefcase className="h-4 w-4" />
              Quản lý tin tuyển dụng
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              navigate("/settings");
            }}
            className={classButton}
          >
            <Settings className="h-4 w-4" />
            Cài đặt
          </Button>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex w-full items-center justify-start gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}