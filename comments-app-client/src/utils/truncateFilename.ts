export const truncateFilename = (filename: string, maxLength = 5) => {
    return filename.length > maxLength
        ? filename.slice(0, maxLength) + '...'
        : filename
}
