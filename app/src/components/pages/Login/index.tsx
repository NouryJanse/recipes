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
    <div className="pt-7">
      <PageTitle text="Please login to continue." />
      <Button type="button" onClick={(): Promise<void> => loginUser()} label="Login" />
    </div>
  )
}

export default Login
