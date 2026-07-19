export const format = (jsonb) => {
    return jsonb.trim()
    .split(/\n+/)          // tách theo dòng trống hoặc xuống dòng
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}