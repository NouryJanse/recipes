// unit test needed

const compareDate = (dateA: string, dateB: string): -1 | 1 => {
  if (dateA < dateB) return 1
  return -1
}

export default compareDate
