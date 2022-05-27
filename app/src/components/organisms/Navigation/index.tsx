import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoThreeBars, GoX, GoHome, GoPlus, GoListUnordered } from 'react-icons/go'
import { MdLogout, MdSwitchAccount } from 'react-icons/md'
import { BsStarHalf } from 'react-icons/bs'
import { GiShinyApple } from 'react-icons/gi'
import classNames from 'classnames'

import { Button, Icon } from '../..'
import { toggleNav } from '../../../redux/reducers/application/applicationSlice'
import RootState from '../../../types/RootState'
import ROUTES from '../../../constants/ROUTES'
import NavigationLink from '../../molecules/NavigationLink'

type NavigationProps = {
  logout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ logout }): ReactElement => {
  const dispatch = useDispatch()
  const application = useSelector((state: RootState) => state.applicationSlice.data)
  const user = useSelector((state: RootState) => state.userSlice.data.user)
  const menuIsOpen = application.navMenuIsOpened
  const login = menuIsOpen ? `Log out` : <MdLogout />

  return (
    <nav
      className={classNames(
        {
          opened: menuIsOpen === true,
          closed: menuIsOpen === false,
        },
        'bg-gray-100 flex flex-col justify-between fixed align-top',
      )}
      data-testid="Navigation"
    >
      <div className="w-full">
        <div
          className={classNames(
            {
              'bg-purpleDark text-white flex flex-col': menuIsOpen === true,
              hidden: menuIsOpen === false,
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
            { 'items-center': menuIsOpen !== true },
            'pt-3 flex flex-col justify-between',
          )}
        >
          {menuIsOpen && <span className="px-3 mb-4 text-gray-500 text-sm">MENU</span>}

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
            {!menuIsOpen && <Icon iconElement={<GoThreeBars style={{}} />} />}

            {menuIsOpen && (
              <Icon
                iconElement={
                  <div className="flex flex-row items-center ">
                    <GoX style={{ color: 'black' }} className="hover:text-green-400" />
                    <span
                      className={classNames({
                        'flex ml-4': menuIsOpen === true,
                        hidden: menuIsOpen !== true,
                      })}
                    >
                      Close
                    </span>
                  </div>
                }
              />
            )}
          </div>

          <NavigationLink
            to={ROUTES.HOME}
            menuIsOpen={menuIsOpen}
            iconSymbol={<GoHome />}
            text="Dashboard"
          />

          <NavigationLink
            to={ROUTES.RECIPES_LIST}
            menuIsOpen={menuIsOpen}
            iconSymbol={<GoListUnordered />}
            text="Discover recipes"
            unread={2}
          />

          <NavigationLink
            to={ROUTES.RECIPES_CREATE}
            menuIsOpen={menuIsOpen}
            additionalClasses={classNames({
              flex: menuIsOpen === false,
              hidden: menuIsOpen === true,
            })}
            iconSymbol={<GoPlus />}
            text="Create"
          />

          <NavigationLink
            to={ROUTES.RATINGS}
            menuIsOpen={menuIsOpen}
            iconSymbol={<BsStarHalf />}
            text="Ratings"
          />

          <NavigationLink
            to={ROUTES.INGREDIENTS}
            menuIsOpen={menuIsOpen}
            iconSymbol={<GiShinyApple />}
            text="Ingredients"
          />
        </div>
      </div>

      <div className="pl-3 w-full">
        {menuIsOpen && <span className="mb-1 text-gray-500 text-sm flex">MY ACCOUNT</span>}

        <span
          className={classNames(
            { visible: menuIsOpen, invisible: !menuIsOpen },
            'mb-4 text-xs flex text-gray-700 font-bold',
          )}
        >
          Logged in as {user.name}
        </span>

        <NavigationLink
          to={ROUTES.ACCOUNT}
          menuIsOpen={menuIsOpen}
          additionalClasses={classNames({
            flex: menuIsOpen !== true,
            hidden: menuIsOpen === true,
          })}
          iconSymbol={<MdSwitchAccount />}
          text="Account"
        />

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
          <span
            className={classNames({
              'flex ml-4': menuIsOpen === true,
              hidden: menuIsOpen !== true,
            })}
          >
            {login}
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
