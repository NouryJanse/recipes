export const bytesToSize = (bytes: number): string => {
    const units = ['byte', 'kilobyte', 'megabyte', 'terabyte', 'petabyte']
    const unit = Math.floor(Math.log(bytes) / Math.log(1024))
    return new Intl.NumberFormat('en', { style: 'unit', unit: units[unit] }).format(
        bytes / 1024 ** unit,
    )
}

export const formatImageSize = (imageSize: number | string | undefined): string | false => {
    if (imageSize && !Number.isNaN(imageSize)) {
        return bytesToSize(Number(imageSize))
    }
    return false
}
