import React, { ReactElement, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../../atoms/Icon'
import { Badge } from '../../index'
import clsx from 'clsx'

type NavigationLinkProps = {
    to: string
    iconSymbol: JSX.Element
    text: ReactNode | string
    menuIsOpen: boolean
    unread?: number
    additionalClasses?: string
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
    to,
    iconSymbol,
    text,
    unread,
    additionalClasses,
    menuIsOpen,
}): ReactElement => {
    const location = useLocation()
    return (
        <Link
            to={to}
            className={clsx(`flex flex-row items-center mb-6 px-3 ${additionalClasses}`, {
                'text-green-500 font-bold border-green-400': location.pathname === to,
                'border-r-4': location.pathname === to && menuIsOpen,
                'border-gray-400': location.pathname !== to,
            })}
        >
            <Icon iconElement={iconSymbol} />

            <span
                className={clsx({
                    'flex ml-4': menuIsOpen === true,
                    hidden: menuIsOpen === false,
                })}
            >
                {text}
            </span>

            {!!unread && menuIsOpen && <Badge text={unread} classes="ml-2" />}
        </Link>
    )
}

export default NavigationLink
