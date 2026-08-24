import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { LogOut, User, ChevronDown, Briefcase, Bell, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button"
import { useNotification } from "@/stores/useNotification";

export default function NavUser() {
  const [open, setOpen] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const dropdownRef = useRef(null);
  const notifyRef = useRef(null);
  const navigate = useNavigate();
  const { unReadCount, notifications, readNotification } = useNotification()

  const { user, signOut } = useAuthStore();

  const displayName = user?.fullName
  const avatarUrl = `${import.meta.env.VITE_BACKEND_URL}/${user?.avatarUrl}`;

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setOpenNotify(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
    document.title = 'Việc làm 24h'
    useNotification.getState().reset();
  };

  const classButton = 'flex w-full items-center justify-start gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer'

  return (
    <div className="relative flex items-center gap-2">
      {/* Notification dropdown */}
      <div className="relative" ref={notifyRef}>
        <Button
          variant="ghost"
          onClick={() => setOpenNotify((prev) => !prev)}
          className="relative bg-slate-100 text-slate-800"
        >
          <Bell />
          {unReadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              {unReadCount}
            </span>
          )}
        </Button>

        {openNotify && (
          <div
            className="
              fixed inset-x-3 top-16 z-50
              sm:absolute sm:inset-x-auto sm:top-auto sm:right-0 sm:mt-2 sm:w-80
              rounded-lg border border-gray-200 bg-white shadow-lg py-1
              max-w-full
            "
          >

            <div className="max-h-[70vh] sm:max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-gray-500">
                  Không có thông báo nào
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    onClick={() => readNotification(n.id)}
                    key={n.id}
                    className={`px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                      !n.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900">{n.title}</p>
                      {!n.read && (
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* User dropdown */}
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
                navigate("/ho-so");
              }}
              className={classButton}
            >
              <User className="h-4 w-4" />
              Hồ sơ của tôi
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                navigate("/lich-su-ung-tuyen");
              }}
              className={classButton}
            >
              <Briefcase className="h-4 w-4" />
              Việc đã ứng tuyển
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
    </div>
  );
}