import { useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyledLabel } from './styled'
import { readAsDataURLViaPromise } from '../../../helpers/FileSystemHelper'
import classNames from 'classnames'
import { ImageData } from '../../../types/ImageData'

interface ImagePickerProps {
  name: string
  label: string
  register: Function
  validation?: string | object
  onSelectedImageCallback: (image: ImageData) => void
}

const ImagePicker = ({ name, label, register, onSelectedImageCallback }: ImagePickerProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = await readAsDataURLViaPromise(acceptedFiles[0])
      if (file && typeof file === 'object') {
        onSelectedImageCallback(file as ImageData)
      }
    },
    [onSelectedImageCallback],
  )

  const { getRootProps, getInputProps, isDragActive, isFileDialogActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/webp',
    multiple: false,
  })

  useEffect(() => {
    register(`${name}`)
  }, [register, name])

  const labelClass = classNames({
    'border-blue': isDragActive || isFileDialogActive,
    'border-grey hover:border-black': !isDragActive && !isFileDialogActive,
  })

  const paragraphClass = classNames({
    'font-bold text-blue': isDragActive || isFileDialogActive,
    'font-normal': !isDragActive && !isFileDialogActive,
  })

  return (
    <div {...getRootProps({ className: 'dropzone' })} className="m-0 p-0">
      <StyledLabel htmlFor={name} className={labelClass}>
        <input type="file" name={'testlala'} {...getInputProps()} />
        <p className={paragraphClass}>{label}</p>
      </StyledLabel>
    </div>
  )
}

export default ImagePicker
