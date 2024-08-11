import clsx from 'clsx'
import React, { ReactElement } from 'react'

type ButtonProps = {
    type: 'submit' | 'reset' | 'button'
    onClick?: () => void
    disabled?: boolean
    label?: string | JSX.Element
    classes?: string
    children?: JSX.Element
    buttonStyle?: 'primary' | 'secondary' | 'tertiary'
    noedge?: boolean
    fullwidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
    type,
    onClick,
    label,
    classes,
    children,
    buttonStyle,
    noedge,
    fullwidth,
    disabled,
}): ReactElement => {
    const variants = {
        primaryClasses: 'bg-blue text-white hover:bg-blueDark',
        secondaryClasses:
            'bg-white text-blue border-blue border border-solid hover:bg-blueDark hover:border-blueDark hover:text-white',
        tertiaryClasses:
            'bg-green-400 text-darkGray font-bold hover:bg-green-500 hover:text-white focus:border-green-500',
    }

    const allClasses = clsx(
        `${classes} flex outline-none align-middle justify-center p-2 rounded no-underline border-1
    border-solid transition-colors focus:border-solid focus:border-blue h-fit`,
        { [variants.primaryClasses]: buttonStyle === 'primary' },
        { [variants.secondaryClasses]: buttonStyle === 'secondary' },
        { [variants.tertiaryClasses]: buttonStyle === 'tertiary' },
        { 'w-full': fullwidth },
        {
            'bg-white/[.5] text-white hover:bg-white/[1.0] hover:text-black border-transparent':
                noedge,
        },
        { 'opacity-80 bg-gray-400 hover:bg-gray-400 cursor-not-allowed': disabled },
    )

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={allClasses}>
            {children || label}
        </button>
    )
}

export default Button
