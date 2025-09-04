export const textUsername = (name: string | undefined, lastname: string | undefined): string => {
    if (!name || !lastname) return "";
    return `${name} ${lastname}`
}