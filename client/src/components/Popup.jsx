import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Popup = ({ openLoginDialog, setOpenLoginDialog }) => {
    const navigate = useNavigate();

  return (
     <>
      <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`text-center font-bold`}>Bạn chưa đăng nhập</DialogTitle>
            <DialogDescription className={`text-center`}>
              Vui lòng đăng nhập để lưu tin tuyển dụng và có thêm nhiều trải nghiệm.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" className={`text-red-800 bg-red-100`} onClick={() => setOpenLoginDialog(false)}>
              Thoát
            </Button>
            <Button variant="ghost" className={`text-green-800 bg-green-200`} onClick={() => navigate("/signin")}>Đăng nhập ngay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Popup
