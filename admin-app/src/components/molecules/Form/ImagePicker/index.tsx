import React, { useEffect, useCallback, ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

import StyledLabel from './styled'
import readAsDataURLViaPromise from '../../../../helpers/FileSystemHelper'

type ImagePickerProps = {
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  onSelectedImageCallback: (image: ImageData) => void
  validation: object
}

const ImagePicker: React.FC<ImagePickerProps> = ({ name, label, register, onSelectedImageCallback }): ReactElement => {
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
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/webp': ['.webp'],
    },
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
        <input type="file" {...getInputProps()} />
        <p className={paragraphClass}>{label}</p>
      </StyledLabel>
    </div>
  )
}

export default ImagePicker
