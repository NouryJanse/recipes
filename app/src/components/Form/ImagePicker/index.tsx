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
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = await readAsDataURLViaPromise(acceptedFiles[0])
      onSelectedImageCallback(file)
    },
    [onSelectedImageCallback],
  )

  const { getRootProps, getInputProps, isDragActive, isFileDialogActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  })

  useEffect(() => {
    register(`${name}`)
  }, [register, name])

  const labelClass = classNames({
    'border-blue': isDragActive || isFileDialogActive,
    'border-grey': !isDragActive && !isFileDialogActive,
  })

  const paragraphClass = classNames({
    'font-bold text-blue': isDragActive || isFileDialogActive,
    'font-normal': !isDragActive && !isFileDialogActive,
  })

  return (
    <StyledLabel htmlFor={name} className={labelClass}>
      <div {...getRootProps({ className: 'dropzone' })} className="m-0 p-0">
        <input type="file" name={'testlala'} {...getInputProps()} />
        <p className={paragraphClass}>{label}</p>
      </div>
    </StyledLabel>
  )
}

export default ImagePicker
