import './bootstrap-grid.css'
import './bootstrap-reboot.css'
import Home from './containers/Home'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from './components'
import { storeToken, storeUser } from './redux/reducers/users/userSlice'
import { useEffect, Fragment } from 'react'
import RootState from './types/RootState'

function App({ auth0 }: any) {
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
    const user = await auth0.login()
    dispatch(storeUser(user))
  }

  const loginButton = (
    <div>
      <Button onClick={() => loginUser()} label="Login" />
    </div>
  )

  if (auth0.error) {
    if (auth0.error === 'login_required') {
      return loginButton
    }
    if (auth0.error === 'consent_required') {
      return (
        <Button
          // onClick={getTokenAndTryAgain}
          label="Consent to reading users"
        />
      )
    }
    return <div>Oops {auth0.error.message}</div>
  }

  if (auth0.isLoading) {
    return <div>Loading...</div>
  }

  if (user && Object.keys(user).length) {
    return (
      <Fragment>
        <Home user={user} logout={auth0.logout} />
      </Fragment>
    )
  } else {
    return <div>{loginButton}</div>
  }
}

export default App
