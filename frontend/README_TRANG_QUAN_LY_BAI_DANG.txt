HUONG DAN TRANG QUAN LY BAI DANG TUYEN DUNG

Trang da them:
- http://localhost:5173/#/manage-jobs
- http://localhost:5173/#/employer/jobs

Chuc nang:
- Hien thi danh sach bai dang tuyen dung tu API GET /api/jobs
- Tim kiem bai dang theo tieu de, cong ty, dia diem, nganh nghe
- Dang bai moi bang API POST /api/jobs
- Sua bai dang bang API PUT /api/jobs/:id
- Xoa bai dang bang API DELETE /api/jobs/:id
- Co thong ke tong bai dang, so cong ty, so dia diem

File frontend da them/sua:
- frontend/src/App.jsx
- frontend/src/api/jobApi.js
- frontend/src/components/Header.jsx
- frontend/src/pages/ManageJobPostsPage.jsx
- frontend/src/styles.css

Luu y:
- Backend phai dang chay o http://localhost:8080
- Frontend chay o http://localhost:5173
- Khi push Git nhom, chi add cac file tren, khong add node_modules, .env, dist.

Lenh chay frontend:
cd frontend
npm install
npm run dev

Link mo trang:
http://localhost:5173/#/manage-jobs
