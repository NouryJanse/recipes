import { useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyledLabel } from './styled'
import { readAsDataURLViaPromise } from '../../../helpers/FileSystemHelper'
import classNames from 'classnames'

const ImagePicker = ({
  name,
  label,
  register,
  onSelectedImageCallback,
}: {
  name: string
  label: string
  register: any
  validation?: any
  onSelectedImageCallback: any
}) => {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = await readAsDataURLViaPromise(acceptedFiles[0])
    onSelectedImageCallback(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive, isFileDialogActive, isFocused } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  })

  useEffect(() => {
    register(`${name}`)
  }, [register, name])

  const btnClass = classNames({
    'border-blue text-red pt-2': isDragActive || isFileDialogActive,
    'border-transparent': !isDragActive && !isFileDialogActive,
  })

  return (
    <StyledLabel htmlFor={name} className={btnClass}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input type="file" name={'testlala'} {...getInputProps()} />
        <p>{label}</p>
      </div>
    </StyledLabel>
  )
}

export default ImagePicker
