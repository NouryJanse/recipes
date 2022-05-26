import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoThreeBars, GoX, GoHome, GoPlus, GoListUnordered } from 'react-icons/go'
import { MdLogout, MdSwitchAccount } from 'react-icons/md'
import { BsStarHalf } from 'react-icons/bs'
import { GiShinyApple } from 'react-icons/gi'
import classNames from 'classnames'

import { Badge, Button, Icon } from '../../components'
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
  const location = useLocation()

  const linkText = classNames({
    'flex ml-4': menuIsOpened === true,
    hidden: menuIsOpened !== true,
  })

  return (
    <nav
      className={classNames(
        {
          opened: menuIsOpened === true,
          closed: menuIsOpened === false,
        },
        'bg-gray-100 flex flex-col justify-between fixed align-top',
      )}
      data-testid="Navigation"
    >
      <div className="w-full">
        <div
          className={classNames(
            {
              'bg-purpleDark text-white flex flex-col': menuIsOpened === true,
              hidden: menuIsOpened === false,
            },
            'transition-colors py-10 px-4 mb-8',
          )}
        >
          <span className="text-gray-300 font-bold">Foody</span>

          <p className="mb-4 text-gray-400">Eat healthy, be happy</p>

          <Link to={ROUTES.RECIPES_CREATE}>
            <Button type="button" buttonStyle="tertiary" label="New" fullwidth />
          </Link>
        </div>

        <div
          className={classNames(
            { 'items-center': menuIsOpened !== true },
            'pt-3 flex flex-col justify-between',
          )}
        >
          {menuIsOpened && <span className="px-3 mb-4 text-gray-500 text-sm">MENU</span>}

          <div
            role="button"
            tabIndex={0}
            className="flex mb-6 px-3"
            onKeyDown={(e: React.KeyboardEvent): React.KeyboardEvent => {
              return e
            }}
            onClick={(): void => {
              dispatch(toggleNav())
            }}
          >
            {!menuIsOpened && <Icon iconElement={<GoThreeBars style={{}} />} />}

            {menuIsOpened && (
              <Icon
                iconElement={
                  <div className="flex flex-row items-center ">
                    <GoX style={{ color: 'black' }} className="hover:text-green-400" />
                    <span className={linkText}>Close</span>
                  </div>
                }
              />
            )}
          </div>

          <Link
            to={ROUTES.HOME}
            className={classNames(
              {
                'text-green-500 font-bold border-green-400': location.pathname === ROUTES.HOME,
                'border-r-4': location.pathname === ROUTES.HOME && menuIsOpened,
                'border-gray-400': location.pathname !== ROUTES.HOME,
              },
              'flex flex-row items-center mb-6 px-3',
            )}
          >
            <Icon
              iconElement={
                <GoHome
                  style={{ color: location.pathname === ROUTES.HOME ? 'rgb(70,221,132)' : 'black' }}
                />
              }
            />
            <span className={linkText}>Dashboard</span>
          </Link>

          <Link
            to={ROUTES.RECIPES_LIST}
            className={classNames(
              {
                'text-green-500 font-bold border-green-400':
                  location.pathname === ROUTES.RECIPES_LIST,
                'border-r-4': location.pathname === ROUTES.RECIPES_LIST && menuIsOpened,
                'border-gray-400': location.pathname !== ROUTES.RECIPES_LIST,
              },
              'flex flex-row items-center mb-6 px-3',
            )}
          >
            <Icon
              iconElement={
                <GoListUnordered
                  style={{
                    color: location.pathname === ROUTES.RECIPES_LIST ? 'rgb(70,221,132)' : 'black',
                  }}
                />
              }
            />
            <span className={linkText}>Discover recipes</span>
            {menuIsOpened && <Badge text="2" classes="ml-2" />}
          </Link>

          <Link
            to={ROUTES.RECIPES_CREATE}
            className={classNames(
              {
                flex: menuIsOpened !== true,
                hidden: menuIsOpened === true,
                'text-blue': location.pathname === ROUTES.RECIPES_LIST,
              },
              'navLink mb-6 px-3',
            )}
          >
            <Icon
              iconElement={
                <GoPlus
                  style={{
                    color:
                      location.pathname === ROUTES.RECIPES_CREATE ? 'rgb(70,221,132)' : 'black',
                  }}
                />
              }
            />
          </Link>

          <Link
            to={ROUTES.RATINGS}
            className={classNames(
              {
                'text-green-500 font-bold border-green-400': location.pathname === ROUTES.RATINGS,
                'border-r-4': location.pathname === ROUTES.RATINGS && menuIsOpened,
                'border-gray-400': location.pathname !== ROUTES.RATINGS,
              },
              'flex flex-row items-center mb-6 px-3',
            )}
          >
            <Icon
              iconElement={
                <BsStarHalf
                  style={{
                    color: location.pathname === ROUTES.RATINGS ? 'rgb(70,221,132)' : 'black',
                  }}
                />
              }
            />
            <span className={linkText}>Ratings</span>
          </Link>

          <Link
            to={ROUTES.INGREDIENTS}
            className={classNames(
              {
                'text-green-500 font-bold border-green-400':
                  location.pathname === ROUTES.INGREDIENTS,
                'border-r-4': location.pathname === ROUTES.INGREDIENTS && menuIsOpened,
                'border-gray-400': location.pathname !== ROUTES.INGREDIENTS,
              },
              'flex flex-row items-center mb-6 px-3',
            )}
          >
            <Icon
              iconElement={
                <GiShinyApple
                  style={{
                    color: location.pathname === ROUTES.INGREDIENTS ? 'rgb(70,221,132)' : 'black',
                  }}
                />
              }
            />
            <span className={linkText}>Ingredients</span>
          </Link>
        </div>
      </div>

      <div className="pl-3 w-full">
        {menuIsOpened && <span className="mb-1 text-gray-500 text-sm flex">MY ACCOUNT</span>}

        <span
          className={classNames(
            { visible: menuIsOpened, invisible: !menuIsOpened },
            'mb-4 text-xs flex text-gray-700 font-bold',
          )}
        >
          Logged in as {user.name}
        </span>

        <Link
          to={ROUTES.ACCOUNT}
          className={classNames(
            {
              'text-green-500 font-bold border-green-400': location.pathname === ROUTES.ACCOUNT,
              'border-r-4': location.pathname === ROUTES.ACCOUNT && menuIsOpened,
              'border-gray-400': location.pathname !== ROUTES.ACCOUNT,
            },
            'flex flex-row items-center mb-6',
          )}
        >
          <Icon
            iconElement={
              <MdSwitchAccount
                style={{
                  color: location.pathname === ROUTES.ACCOUNT ? 'rgb(70,221,132)' : 'black',
                }}
              />
            }
          />
          <span className={linkText}>Account</span>
        </Link>

        <div
          role="button"
          onClick={(): void => logout()}
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent): React.KeyboardEvent => {
            return e
          }}
          className={classNames('flex flex-row items-center mb-6')}
        >
          <Icon iconElement={<MdLogout />} />
          <span className={linkText}>{login}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
