import React, { useEffect, useCallback, ReactElement } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'

import readAsDataUrlViaPromise from '../../../../helpers/readAsDataUrlViaPromise'
import clsx from 'clsx'

type ImagePickerProps = {
    name: string
    label: string
    register: UseFormRegister<FieldValues>
    onSelectedImageCallback: (image: ImageData) => void
    validation: object
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    name,
    label,
    register,
    onSelectedImageCallback,
}): ReactElement => {
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = await readAsDataUrlViaPromise(acceptedFiles[0])
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

    const baseClasses = `block border-2 border-black border-dashed p-2 pt-3 items-center justify-center
  h-full text-black relative text-center w-full hover:cursor-pointer max-w-2x`

    const labelClass = clsx(baseClasses, {
        'border-blue': isDragActive || isFileDialogActive,
        'border-grey hover:border-black': !isDragActive && !isFileDialogActive,
    })

    const paragraphClass = clsx({
        'font-bold text-blue': isDragActive || isFileDialogActive,
        'font-normal': !isDragActive && !isFileDialogActive,
    })

    return (
        <div {...getRootProps({ className: 'dropzone' })} className="m-0 p-0">
            <label htmlFor={name} className={labelClass}>
                <input type="file" {...getInputProps()} />
                <p className={paragraphClass}>{label}</p>
            </label>
        </div>
    )
}

export default ImagePicker
