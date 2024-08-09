import React, { ReactElement, ReactNode } from 'react'

type BadgeProps = {
  text: ReactNode | string
  classes?: string
}

const Badge: React.FC<BadgeProps> = ({ text, classes }): ReactElement => {
  return <div className={`${classes} rounded-full bg-blue px-3 py-1 text-white`}>{text}</div>
}

export default Badge
