import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { PageTitle } from '../..'
import { storeUser } from '../../../redux/reducers/users/userSlice'
import Button from '../../atoms/Button'

const Login: React.FC<AuthProps> = ({ auth0 }): ReactElement => {
  const dispatch = useDispatch()

  const loginUser = async (): Promise<void> => {
    const auth0User = await auth0.login()
    dispatch(storeUser(auth0User))
  }

  return (
    <div className="inline-flex flex-col justify-center p-5 sm:p-15 md:p-24 xl:p-48">
      <div className="mb-10">
        <PageTitle text="Please login to continue." />
      </div>
      <p className="mb-1  ">
        Hi! My name is Noury Janse and I&apos;m a Web Developer. This recipes application allows you to create and
        manage recipes.
      </p>
      <p className="mb-6">
        By clicking on the button below, you will be redirected to a very reliable authentication system from{' '}
        <a href="https://auth0.com/" className="inline-block font-bold underline hover:text-orange-600">
          0Auth.
        </a>{' '}
        Via this way all security and privacy practices are implemented via a professional party rather than trying to
        reinvent the wheel by myself.
      </p>
      <div>
        <Button type="button" onClick={(): Promise<void> => loginUser()} label="Login" />
      </div>
    </div>
  )
}

export default Login
