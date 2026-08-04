export const toLocation = (location) => {
    if (!location) return '';

    // "Hà Nội: Phường Cầu Giấy (quận Cầu Giấy)"
    if (location.includes(':')) {
        const [province] = location.split(':').map(part => part.trim()).filter(Boolean);
        return province || '';
    }

    // "123 đường ABC, Phường X, Quận Y, Hà Nội"
    const parts = location.split(',').map(part => part.trim()).filter(Boolean);
    return parts[parts.length - 1] || '';
}