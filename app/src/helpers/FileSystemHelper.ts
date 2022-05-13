export const readAsDataURLViaPromise = (file: File): Promise<{} | boolean> => {
  if (!file.size) return new Promise(() => false)

  return new Promise((resolve, _reject) => {
    let fileReader = new FileReader()
    fileReader.onload = function () {
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
