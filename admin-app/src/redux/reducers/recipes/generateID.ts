// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.

const ID = (): string => {
  return Math.random().toString(36).substring(2, 15)
}
export default ID
