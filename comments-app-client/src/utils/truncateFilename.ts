export const truncateFilename = (filename: string, maxLength: number = 5) => {
    return filename.length > maxLength ? filename.slice(0, maxLength) + '...' : filename;
};