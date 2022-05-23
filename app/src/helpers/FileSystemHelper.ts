// unit test needed

const readAsDataURLViaPromise = (file: File): Promise<object> | boolean => {
  if (!file.size) return false

  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = (): void => {
      return resolve({
        data: fileReader.result,
        name: file.name,
        size: file.size,
        type: file.type,
      })
    }
    fileReader.readAsDataURL(file)
  })
}

export default readAsDataURLViaPromise
