export const toLocation = (location) => {
    const lastIndex = location.lastIndexOf(',')

    return location.slice(lastIndex + 1);
}