import React, { ReactElement } from 'react'
import { getUserCookies } from '../helpers/Cookies'

const ProtectedRoutes: React.FC = ({ children }): ReactElement => {
    const { token } = getUserCookies()
    if (token) {
        return children
    }

    return <></>
}

export default ProtectedRoutes
