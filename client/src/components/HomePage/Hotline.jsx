import { useState } from "react";
import { Headphones } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

export default function Hotline() {
  const [open, setOpen] = useState(false);

  const hotlines = [
    { region: "Hotline hỗ trợ miền Nam", city: "HCM", phone: "(028) 7109 2424" },
    { region: "Hotline hỗ trợ miền Bắc", city: "HN", phone: "(024) 7309 2424" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: gọi API gửi form tư vấn ở đây
    setOpen(false);
  };

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-8">
          Hotline cho Người tìm việc
        </h2>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2">
          {hotlines.map((h) => (
            <div key={h.city} className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-green-700 text-sm mb-1">
                <Headphones className="w-4 h-4" />
                <span>{h.region}</span>
              </div>
              <p className="text-lg md:text-xl font-bold">
                {h.city}: {h.phone}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={() => setOpen(true)}
          className="border-2 border-green-700 text-green-700 font-semibold px-6 py-2.5 rounded-md hover:bg-green-700 hover:text-white"
        >
          Tư vấn cho Người tìm việc
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-green-700 text-xl font-bold">
                Đăng ký tư vấn việc làm
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label className="text-sm font-medium mb-1 block">Họ và tên</Label>
                <Input placeholder="Nhập họ và tên" required />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">Email</Label>
                <Input type="email" placeholder="Nhập email" required />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">Số điện thoại</Label>
                <Input type="tel" placeholder="Nhập số điện thoại" required />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">Nội dung cần tư vấn</Label>
                <Textarea placeholder="Bạn cần hỗ trợ về vấn đề gì?" rows={3} />
              </div>
              <Button
                variant="ghost"
                type="submit"
                className="w-full bg-green-700 text-white"
              >
                Gửi yêu cầu tư vấn
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}