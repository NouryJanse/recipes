import { useEffect, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UseFormRegister } from 'react-hook-form'

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
}: {
  name: string
  images?: Image[]
  label: string
  register: any
  validation?: any
}) => {
  let [files, setFiles] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: any) => {
    const newFiles = acceptedFiles.map((file: any) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ))
    const updatedFiles = [...files, ...newFiles]
    console.log(updatedFiles)
    setFiles(updatedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFileDialogActive,
    isFocused,
  } = useDropzone({ onDrop })

  const test = [images, label]

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input name={name} {...getInputProps()} {...register(name)} />

        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <aside>
        <h4>Files</h4>

        <ul>{files}</ul>
      </aside>
    </section>
  )
}

export default ImagePicker
