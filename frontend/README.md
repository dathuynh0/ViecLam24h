# ViecLam24h - Frontend ReactJS
## Cách chạy

1. Giải nén file zip.
2. Mở thư mục bằng VS Code.
3. Mở Terminal và chạy:

```bash
npm install
npm run dev 
or
npm.cmd install
npm.cmd run dev
```

4. Mở link Vite hiện ra, thường là: http://localhost:5173

## Cấu trúc chính

- `src/App.jsx`: xử lý chuyển trang bằng hash route.
- `src/pages.js`: nội dung các màn hình đã chuyển từ HTML sang React data.
- `src/styles.css`: CSS đồng bộ giao diện ViecLam24h.

## Các trang

- Trang chủ
- Danh sách việc làm
- Chi tiết việc làm
- Đăng nhập
- Đăng ký
- Quên mật khẩu
- Hồ sơ ứng viên
- Dashboard Nhà tuyển dụng
- Đăng tin tuyển dụng
- Quản lý tin tuyển dụng
- Quản lý hồ sơ ứng tuyển
- Hồ sơ công ty
- Quản lý công ty
- Dashboard Quản trị
- Quản lý người dùng
- Báo cáo và thống kê

## Ghi chú

Đây là bản ReactJS frontend tĩnh, chưa kết nối backend/database. Khi kết nối backend, bạn có thể thay dữ liệu mẫu trong `src/pages.js` bằng API hoặc tách thành component riêng.
