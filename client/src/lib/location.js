export const toLocation = (location) => {
    if(!location) return '';

    const parts = location.split(',').map(part => part.trim()).filter(Boolean);
    return parts[parts.length - 1] || '';
}