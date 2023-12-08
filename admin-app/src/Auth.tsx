import React, { ReactElement, useEffect, useState } from 'react'
import App from './App'
import Cookies from 'js-cookie'
import { useLoginMutation, useRegisterMutation, useValidateMutation } from './redux/reducers/users/users'
import { Login, Register } from './components'
import { useDispatch } from 'react-redux'
import { clearUser, storeToken, storeUser } from './redux/reducers/users/userSlice'
import { Dispatch, UnknownAction } from '@reduxjs/toolkit'

type AuthProps = {}

const Auth: React.FC<AuthProps> = ({}): ReactElement => {
  const dispatch = useDispatch()
  const [login, { isLoading: isLoggingIn, isError: loginError, error, isSuccess }] = useLoginMutation()
  const [validate, { isLoading: isValidating, isError: validationError }] = useValidateMutation()
  const [register, { isLoading: isRegistrating, isError: registrationError }] = useRegisterMutation()
  const [showRegistration, setShowRegistration] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>()
  const [hasLoaded, setHasLoaded] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const { token } = getUserCookies()
    if (token) dispatch(storeToken(token))
    onValidateToken()
  }, [])

  const onValidateToken = async () => {
    const response: boolean | string = await handleValidate(validate, dispatch)
    if (typeof response === 'string') {
      setUserId(response)
    } else {
      setUserId(undefined)
    }
    setHasLoaded(true)
  }

  const onUserLogin = async (username: string, password: string) => {
    const response: string | boolean = await handleUserLogin(login, username, password, dispatch)
    if (typeof response === 'string') {
      setUserId(response)
    }
    setHasLoaded(true)
  }

  const onUserLogout = async () => {
    handleUserLogout()
    setUserId(undefined)
    dispatch(clearUser())
  }

  const onUserRegistration = async (username: string, password: string) => {
    const response: string | boolean = await handleRegistration(register, username, password, dispatch)

    if (typeof response === 'string') {
      setUserId(response)
    }
    setHasLoaded(true)
    setShowRegistration(false)
  }

  if (hasLoaded === undefined) return <></>

  if (isValidating)
    return (
      <>
        <p>Loading...</p>
      </>
    )

  if (isLoggingIn)
    return (
      <>
        <p>Logging in...</p>
      </>
    )

  if (showRegistration)
    return <Register onUserRegistration={onUserRegistration} setShowRegistration={setShowRegistration} />

  if (!userId && !isLoggingIn && !isValidating) {
    return <Login onUserLogin={onUserLogin} setShowRegistration={setShowRegistration} />
  }

  return <App onUserLogout={onUserLogout} />
}

const handleRegistration = async (
  register,
  username: string,
  password: string,
  dispatch: Dispatch<UnknownAction>,
): Promise<boolean> => {
  try {
    const { id, token } = await register({ username, password }).unwrap()

    if (id && token) {
      if (token) await dispatch(storeUser({ name: username, id, token }))
      Cookies.set('id', id, { expires: 1, path: '/' })
      Cookies.set('jwt', token, { expires: 1, path: '/' })
      return id
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}

const handleUserLogin = async (
  login,
  username: string,
  password: string,
  dispatch: Dispatch<UnknownAction>,
): Promise<string | false> => {
  try {
    const { id, token } = await login({
      username,
      password,
    }).unwrap()

    if (id && token) {
      if (token) await dispatch(storeUser({ id, token, name: username }))
      Cookies.set('id', id, { expires: 1, path: '/' })
      Cookies.set('jwt', token, { expires: 1, path: '/' })
      return id
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}

const handleUserLogout = (): void => {
  removeUserCookies()
}

const handleValidate = async (validate, dispatch: Dispatch<UnknownAction>): Promise<boolean | string> => {
  try {
    const { token, id } = getUserCookies()
    if (token && id) {
      const { username, authenticated } = await validate({ token }).unwrap()
      if (username) await dispatch(storeUser({ id, token, name: username }))
      if (authenticated) return id
    }
    return false
  } catch (error) {
    removeUserCookies()
    console.error(error)
    return false
  }
}

const getUserCookies = () => {
  const token = Cookies.get('jwt')
  const id = Cookies.get('id')
  return { token, id }
}

const removeUserCookies = () => {
  Cookies.remove('jwt')
  Cookies.remove('id')
}

export default Auth
