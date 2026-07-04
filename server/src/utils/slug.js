const toSlug = (str) => {
  str = str.toLowerCase();
  // Chuyển các ký tự có dấu thành không dấu
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Xử lý riêng chữ đ/Đ vì NFD không tách được
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  // Xóa ký tự đặc biệt, chỉ giữ chữ, số, khoảng trắng, gạch ngang
  str = str.replace(/[^a-z0-9\s-]/g, '');
  // Thay khoảng trắng/liên tiếp bằng 1 dấu gạch ngang
  str = str.trim().replace(/\s+/g, '-');
  // Xóa gạch ngang liên tiếp nếu có
  str = str.replace(/-+/g, '-');

  return str;
}

export default toSlug;