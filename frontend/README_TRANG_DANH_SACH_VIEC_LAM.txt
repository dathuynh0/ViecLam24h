Đã xây dựng trang Danh sách việc làm bằng ReactJS.

File đã thêm:
- src/api/jobApi.js
- src/components/Header.jsx
- src/pages/JobsPage.jsx

File đã sửa:
- src/App.jsx
- src/styles.css

API frontend đang gọi:
GET http://localhost:8080/api/jobs

Cách chạy:
1. Mở backend trước:
   cd server
   npm run dev

2. Mở frontend:
   npm install
   npm run dev

3. Vào trình duyệt:
   http://localhost:5173/#/jobs

Lưu ý:
- Nếu API chưa có dữ liệu thì trang sẽ báo chưa có việc làm.
- Nếu frontend không kết nối được API, trang sẽ hiển thị dữ liệu mẫu để xem giao diện.
- Có thể cấu hình API bằng file .env ở frontend:
  VITE_API_URL=http://localhost:8080
