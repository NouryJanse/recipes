import React, { ReactElement } from 'react'
import App from '../../App'
import { Login, Register } from '../../components'
import useAuth from './useAuth'

const Auth: React.FC = (): ReactElement => {
    const { isLoggingIn, isValidating, hasLoaded, showRegistration, userId } = useAuth()

    // if (hasLoaded === undefined) return <></>

    // if (isValidating)
    //     return (
    //         <>
    //             <p>Loading...</p>
    //         </>
    //     )

    // if (isLoggingIn)
    //     return (
    //         <>
    //             <p>Logging in...</p>
    //         </>
    //     )

    // if (showRegistration) return <Register />

    // if (!userId && !isLoggingIn && !isValidating) {
    //     return <Login />
    // }

    return <App />
}

export default Auth
