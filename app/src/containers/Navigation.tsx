import { Link } from 'react-router-dom'
import { Button, Icon } from '../components'
import { GoThreeBars, GoX, GoHome, GoPlus, GoListUnordered } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'
// import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toggleNav } from '../redux/reducers/application/applicationSlice'

const Navigation = ({ user, logout }) => {
  const dispatch = useDispatch()
  const application = useSelector((state) => state.applicationSlice.data)
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
          {!application.navMenuIsOpened && <Icon icon={<GoThreeBars style={{}} />} />}
          {application.navMenuIsOpened && <Icon icon={<GoX style={{ color: 'black' }} />} />}
        </div>
        <Link to="/" className="navLink">
          <Icon icon={<GoHome style={{ color: 'black' }} />} />
          <p className="toggleContent">Home</p>
        </Link>
        <Link to="/recipes" className="navLink">
          <Icon icon={<GoListUnordered style={{ color: 'black' }} />} />
          <p className="toggleContent">Recipes</p>
        </Link>
        <Link to="/create" className="navLink">
          <Icon icon={<GoPlus style={{ color: 'black' }} />} />
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
