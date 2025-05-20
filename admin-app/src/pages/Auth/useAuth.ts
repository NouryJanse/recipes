import { useEffect, useState } from 'react'
import {
    useLoginMutation,
    useRegisterMutation,
    useValidateMutation,
} from '../../redux/reducers/users/users'
import { useDispatch } from 'react-redux'
import { clearUser, storeToken, storeUser } from '../../redux/reducers/users/userSlice'
import { getUserCookies, removeUserCookies } from '../../helpers/Cookies'
import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import handleRtkQueryError from '../../helpers/handleRtkQueryError'

//
//
//  https://medium.com/@ramon-pereira/protected-routes-with-react-js-and-next-js-571a104d8cf6
//
//

const useAuth = () => {
    const dispatch = useDispatch()
    const [login, { isLoading: isLoggingIn }] = useLoginMutation()
    const [validate, { isLoading: isValidating }] = useValidateMutation()
    const [register] = useRegisterMutation()
    const [showRegistration, setShowRegistration] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>()
    const [hasLoaded, setHasLoaded] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        // const { token } = getUserCookies()
        // if (token) dispatch(storeToken(token))
        // onValidateToken()
    }, [])

    const onValidateToken = async () => {
        const response: boolean | string = await handleValidation(validate, dispatch)
        if (typeof response === 'string') {
            setUserId(response)
        } else {
            setUserId(undefined)
        }
        setHasLoaded(true)
    }

    const onUserLogin = async (username: string, password: string) => {
        const response: string | boolean = await handleLogin(login, username, password, dispatch)
        if (typeof response === 'string') {
            setUserId(response)
        }
        setHasLoaded(true)
    }

    const onUserLogout = async () => {
        removeUserCookies()
        setUserId(undefined)
        dispatch(clearUser())
    }

    const onUserRegistration = async (username: string, password: string) => {
        const response: string | boolean = await handleRegistration(
            register,
            username,
            password,
            dispatch,
        )

        if (typeof response === 'string') {
            setUserId(response)
        }
        setHasLoaded(true)
        setShowRegistration(false)
    }

    return {
        isLoggingIn,
        isValidating,
        hasLoaded,
        setShowRegistration,
        showRegistration,
        onUserRegistration,
        userId,
        onUserLogin,
        onUserLogout,
    }
}

const handleRegistration = async (
    register,
    username: string,
    password: string,
    dispatch: Dispatch<UnknownAction>,
): Promise<string | boolean> => {
    try {
        const { id, token } = await register({ username, password }).unwrap()

        if (id && token) {
            if (token) await dispatch(storeUser({ name: username, id, token }))
            Cookies.set('admin-userid', id, { expires: 1, path: '/' })
            Cookies.set('admin-jwt', token, { expires: 1, path: '/' })
            return id
        }
        return false
    } catch (error) {
        handleRtkQueryError(error)
        return false
    }
}

const handleLogin = async (
    login,
    username: string,
    password: string,
    dispatch: Dispatch<UnknownAction>,
): Promise<string | false> => {
    console.log(username, password)

    try {
        const { id, token } = await login({
            username,
            password,
        }).unwrap()

        if (id && token) {
            if (token) await dispatch(storeUser({ id, token, name: username }))
            Cookies.set('admin-userid', id, { expires: 1, path: '/' })
            Cookies.set('admin-jwt', token, { expires: 1, path: '/' })
            return id
        }
        return false
    } catch (error: unknown) {
        handleRtkQueryError(error)
        return false
    }
}

const handleValidation = async (
    validate,
    dispatch: Dispatch<UnknownAction>,
): Promise<boolean | string> => {
    try {
        const { token, id } = getUserCookies()
        if (token && id) {
            const { username, authenticated } = await validate({ token }).unwrap()
            if (username) await dispatch(storeUser({ id, token, name: username }))
            if (authenticated) return id
        }
        return false
    } catch (error: unknown) {
        removeUserCookies()
        handleRtkQueryError(error)
        return false
    }
}

export default useAuth
