import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoThreeBars, GoX, GoHome, GoPlus, GoListUnordered } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'

import { Button, Icon } from '../../components'
import { toggleNav } from '../../redux/reducers/application/applicationSlice'
import RootState from '../../types/RootState'
import ROUTES from '../../constants/ROUTES'

type NavigationProps = {
  logout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ logout }): ReactElement => {
  const dispatch = useDispatch()
  const application = useSelector((state: RootState) => state.applicationSlice.data)
  const user = useSelector((state: RootState) => state.userSlice.data.user)
  const menuIsOpened = application.navMenuIsOpened
  const login = menuIsOpened ? `Log out` : <MdLogout />

  return (
    <nav className={`${menuIsOpened ? `opened` : `closed`}`} data-testid="Navigation">
      <div>
        <div
          role="button"
          tabIndex={0}
          className="logo"
          onKeyDown={(e: React.KeyboardEvent): React.KeyboardEvent => {
            return e
          }}
          style={{ margin: '0 8px 8px 8px' }}
          onClick={(): void => {
            dispatch(toggleNav())
          }}
        >
          {!menuIsOpened && <Icon iconElement={<GoThreeBars style={{}} />} />}
          {menuIsOpened && <Icon iconElement={<GoX style={{ color: 'black' }} />} />}
        </div>
        <Link to={ROUTES.HOME} className="navLink">
          <Icon iconElement={<GoHome style={{ color: 'black', margin: '8px' }} />} />
          <p className="toggleContent">Home</p>
        </Link>
        <Link to={ROUTES.RECIPES_LIST} className="navLink">
          <Icon iconElement={<GoListUnordered style={{ color: 'black', margin: '8px' }} />} />
          <p className="toggleContent">Recipes</p>
        </Link>
        <Link to={ROUTES.RECIPES_CREATE} className="navLink">
          <Icon iconElement={<GoPlus style={{ color: 'black', margin: '8px' }} />} />
          <p className="toggleContent">New</p>
        </Link>
      </div>
      <div>
        <p className={`${menuIsOpened ? `visible` : `invisible`}`}>Logged in as {user.name}</p>
        <Button type="button" onClick={(): void => logout()} label={login} />
      </div>
    </nav>
  )
}

export default Navigation
