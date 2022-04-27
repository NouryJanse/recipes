export function readAsDataURLViaPromise(file: File) {
  if (!file.size) return false

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
