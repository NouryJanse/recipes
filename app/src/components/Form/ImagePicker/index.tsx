import { useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyledLabel } from './styled'
import { readAsDataURLViaPromise } from '../../../helpers/FileSystemHelper'
import classNames from 'classnames'

interface ImagePickerProps {
  name: string
  label: string
  register: any
  validation?: any
  onSelectedImageCallback: any
}

const ImagePicker = ({ name, label, register, onSelectedImageCallback }: ImagePickerProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = await readAsDataURLViaPromise(acceptedFiles[0])
      onSelectedImageCallback(file)
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
