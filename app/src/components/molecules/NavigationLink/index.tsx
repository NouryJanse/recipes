import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../../atoms/Icon'
import { Badge } from '../../index'

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
      className={classNames(
        {
          'text-green-500 font-bold border-green-400': location.pathname === to,
          'border-r-4': location.pathname === to && menuIsOpen,
          'border-gray-400': location.pathname !== to,
        },
        `flex flex-row items-center mb-6 px-3 ${additionalClasses}`,
      )}
    >
      <Icon iconElement={iconSymbol} />
      <span
        className={classNames({
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

NavigationLink.defaultProps = {
  unread: 0,
  additionalClasses: '',
}

export default NavigationLink
