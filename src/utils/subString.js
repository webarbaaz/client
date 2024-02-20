export const subString = (string) => {
    return string.length > 50
    ? string.slice(0, 100) + "..."
    : string
}