# Hướng dẫn thêm Swagger vào dự án ViecLam24h

Các file trong thư mục này là bản đã thêm Swagger cho API đang được khai báo trong `server.js`:

- `/api/jobs`
- `/api/applications`

## Cách chép vào dự án

1. Copy các file trong thư mục `server` của gói này vào thư mục `server` trong dự án của bạn.
2. Cho phép ghi đè các file:
   - `package.json`
   - `server.js`
   - `routes/jobRoutes.js`
   - `routes/applicationRoutes.js`
3. Mở terminal tại thư mục `server` rồi chạy:

```bash
npm install
npm run dev
```

4. Mở trình duyệt:

```text
http://localhost:8080/api-docs
```

## Lưu ý

File `routes/authRoute.js` hiện chưa được gắn trong `server.js`, đồng thời `authController.js` đang export `signIn`, `signOut` nhưng trong file chưa thấy khai báo hai hàm này. Vì vậy phần Swagger này chưa đưa nhóm Auth vào để tránh lỗi khi chạy server.
