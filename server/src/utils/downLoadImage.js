import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const downloadImage = async (url, fileName) => {
    const uploadDir = path.join(__dirname, '../../public/uploads/avatars');

    // Đảm bảo thư mục tồn tại
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Không tải được ảnh: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Trả về đường dẫn tương đối để lưu vào DB
    return `public/uploads/avatars/${fileName}`;
}