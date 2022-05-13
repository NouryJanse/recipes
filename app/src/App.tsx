import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Home from './containers/Home'

import { Button } from './components'
import { storeToken, storeUser } from './redux/reducers/users/userSlice'
import RootState from './types/RootState'

function App({ auth0 }: { auth0: any }) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.userSlice.data.user)

  useEffect(() => {
    if (auth0.token) {
      dispatch(storeToken(auth0.token))
    }
    if (auth0.user) {
      dispatch(storeUser(auth0.user))
    }
  }, [auth0, auth0.isAuthenticated, auth0.user, auth0.isLoading, dispatch])

  const loginUser = async () => {
    const auth0User = await auth0.login()
    dispatch(storeUser(auth0User))
  }

  const loginButton = <Button type="button" onClick={() => loginUser()} label="Login" />

  if (auth0.error) {
    if (auth0.error === 'login_required') {
      return loginButton
    }
    if (auth0.error === 'consent_required') {
      return <Button type="button" label="Consent to reading users" />
    }
    return <div>Oops {auth0.error.message}</div>
  }

  if (auth0.isLoading) {
    return <div>Loading...</div>
  }

  if (user.token !== undefined) {
    return <Home logout={auth0.logout} />
  }
  return <div>{loginButton}</div>
}

export default App
