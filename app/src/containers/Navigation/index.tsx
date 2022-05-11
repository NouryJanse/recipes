import { Link } from 'react-router-dom'
import { Button, Icon } from '../../components'
import { GoThreeBars, GoX, GoHome, GoPlus, GoListUnordered } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNav } from '../../redux/reducers/application/applicationSlice'
import RootState from '../../types/RootState'

const Navigation = ({ logout }: any) => {
  const dispatch = useDispatch()
  const application = useSelector((state: RootState) => state.applicationSlice.data)
  const user = useSelector((state: RootState) => state.userSlice.data.user)
  const menuIsOpened = application.navMenuIsOpened
  let login = menuIsOpened ? `Log out` : <MdLogout />

  return (
    <nav className={`${menuIsOpened ? `opened` : `closed`}`}>
      <div>
        <div
          className="logo"
          onClick={() => {
            dispatch(toggleNav())
          }}
        >
          {!menuIsOpened && <Icon iconElement={<GoThreeBars style={{}} />} />}
          {menuIsOpened && <Icon iconElement={<GoX style={{ color: 'black' }} />} />}
        </div>
        <Link to="/" className="navLink">
          <Icon iconElement={<GoHome style={{ color: 'black' }} />} />
          <p className="toggleContent">Home</p>
        </Link>
        <Link to="/recipes" className="navLink">
          <Icon iconElement={<GoListUnordered style={{ color: 'black' }} />} />
          <p className="toggleContent">Recipes</p>
        </Link>
        <Link to="/create" className="navLink">
          <Icon iconElement={<GoPlus style={{ color: 'black' }} />} />
          <p className="toggleContent">New</p>
        </Link>
      </div>
      <div>
        <p className={`${menuIsOpened ? `visible` : `invisible`}`}>Logged in as {user.name}</p>
        <Button type="button" onClick={() => logout()} label={login} />
      </div>
    </nav>
  )
}

export default Navigation
