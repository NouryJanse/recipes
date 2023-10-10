import { useDispatch, useSelector } from 'react-redux'
import React, { ReactElement, useEffect } from 'react'
import App from './App'

import { Button } from './components'
import { storeToken, storeUser } from './redux/reducers/users/userSlice'
import RootState from './types/RootState'
import Login from './components/pages/Login'

const Auth: React.FC = (): ReactElement => {
  // const dispatch = useDispatch()
  // const user = useSelector((state: RootState) => state.userSlice.data.user)
  // console.log(auth0)
  // useEffect(() => {
  //   if (auth0.token) {
  //     dispatch(storeToken(auth0.token))
  //   }
  //   if (auth0.user) {
  //     dispatch(storeUser(auth0.user))
  //   }
  // }, [auth0, auth0.isAuthenticated, auth0.user, auth0.isLoading, dispatch])
  // // requires refactoring into separate components as the login flow will be redesigned as well
  // if (auth0.error) {
  //   if (auth0.error === 'login_required') {
  //     return <Login auth0={auth0} />
  //   }
  //   if (auth0.error === 'consent_required') {
  //     return <Button type="button" label="Consent to reading users" />
  //   }
  //   return <div>Oops {auth0.error}</div>
  // }
  // if (auth0.isLoading) {
  //   return <div>Loading...</div>
  // }
  // if (user.token !== undefined) {
  return <App />
  // }
  // return <Login auth0={auth0} />
}

export default Auth
