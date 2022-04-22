import { Link } from 'react-router-dom'
import { Button, Icon } from '../components'
import { GoThreeBars, GoX, GoHome, GoPlus, GoListUnordered } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNav } from '../redux/reducers/application/applicationSlice'
import RootState from '../types/RootState'

const Navigation = ({ logout }: any) => {
  const dispatch = useDispatch()
  const application = useSelector((state: RootState) => state.applicationSlice.data)
  let login = application.navMenuIsOpened ? `Log out` : <MdLogout />

  return (
    <nav className={`${application.navMenuIsOpened ? `opened` : `closed`}`}>
      <div>
        <div
          className="logo"
          onClick={() => {
            dispatch(toggleNav())
          }}
        >
          {!application.navMenuIsOpened && <Icon iconElement={<GoThreeBars style={{}} />} />}
          {application.navMenuIsOpened && <Icon iconElement={<GoX style={{ color: 'black' }} />} />}
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
        {/* <p className={`${application.navMenuIsOpened ? `opened` : `closed`}`}>Hello {user.name}</p> */}
        <Button onClick={() => logout()} label={login} />
      </div>
    </nav>
  )
}

export default Navigation
