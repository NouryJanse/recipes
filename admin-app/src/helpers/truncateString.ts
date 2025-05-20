// unit test needed

const truncateString = (str: string, num: number): string => {
    if (str.length > num) {
        return `${str.substring(0, num)}...`
    }
    return str
}

export default truncateString
