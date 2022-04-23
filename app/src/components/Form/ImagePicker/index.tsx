import { useEffect, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyledLabel } from './styled'

interface File {
  name: string
  path?: string
  size?: number
}

interface Image {}

const ImagePicker = ({
  name,
  images,
  label,
  register,
  setValue,
}: {
  name: string
  images?: Image[]
  label: string
  register: any
  validation?: any
  setValue: any
}) => {
  let [files, setFiles] = useState(images as any)
  let [filesHTML, setFilesHTML] = useState([] as any)

  function readAsDataURL(file: any) {
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

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setFiles((prevState: any) => [...prevState, ...acceptedFiles])
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFileDialogActive,
    isFocused,
  } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' })

  useEffect(() => {
    Promise.all(
      files.map((f: File) => {
        return readAsDataURL(f)
      }),
    ).then((files) => setValue(name, files))

    setFilesHTML(
      [...files].map((file: any) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      )),
    )
  }, [files, name, setValue])

  useEffect(() => {
    register(`${name}`)
  }, [register, name])

  return (
    <StyledLabel htmlFor={name}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input type="file" name={'testlala'} {...getInputProps()} />
        <p>{label}</p>
        {!!files.length && (
          <div>
            <h4>Selected images</h4>

            <ul>{filesHTML}</ul>
          </div>
        )}
      </div>
    </StyledLabel>
  )
}

export default ImagePicker
