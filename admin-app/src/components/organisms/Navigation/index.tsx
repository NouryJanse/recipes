import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoX, GoHome, GoPlus } from 'react-icons/go'
import { FaAlignJustify } from 'react-icons/fa6'
import { MdLogout, MdSwitchAccount } from 'react-icons/md'
import { BsStarHalf, BsListNested } from 'react-icons/bs'
import { GiShinyApple, GiChiliPepper } from 'react-icons/gi'

import { Button, Icon } from '../..'
import { toggleNav } from '../../../redux/reducers/application/applicationSlice'
import RootState from '../../../types/RootState'
import ROUTES from '../../../constants/ROUTES'
import NavigationLink from '../../molecules/NavigationLink'
import { getDifferenceInFormat } from '../../../helpers/DateHelper'
import { useGetRecipesQuery } from '../../../redux/reducers/recipes/recipes'
import clsx from 'clsx'

type NavigationProps = {
    onUserLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ onUserLogout }): ReactElement => {
    const dispatch = useDispatch()
    const application = useSelector((state: RootState) => state.applicationSlice.data)
    const menuIsOpen = application.navMenuIsOpened
    const login = menuIsOpen ? `Log out` : <MdLogout />

    const { data: recipes } = useGetRecipesQuery()
    const user = useSelector((state: RootState) => state.userSlice.data.user)
    const amountOfNewPosts = recipes
        ? recipes.filter((r) => getDifferenceInFormat(r.createdAt, 'd') < 7).length
        : 0

    return (
        <nav
            className={clsx('bg-gray-100 flex flex-col justify-between fixed align-top', {
                opened: menuIsOpen === true,
                closed: menuIsOpen === false,
            })}
            data-testid="Navigation"
        >
            <div className="w-full">
                <div
                    className={clsx('transition-colors py-10 px-4 mb-8', {
                        'bg-purpleDark text-white flex flex-col': menuIsOpen === true,
                        hidden: menuIsOpen === false,
                    })}
                >
                    <span className="text-gray-300 font-bold">Foody</span>

                    <p className="mb-4 text-gray-400">Eat healthy, be happy</p>

                    <Link to={ROUTES.RECIPES_CREATE}>
                        <Button type="button" buttonStyle="tertiary" label="New" fullwidth />
                    </Link>
                </div>

                <div className="pt-3 flex flex-col justify-between">
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
                        {!menuIsOpen && <Icon iconElement={<FaAlignJustify />} />}

                        {menuIsOpen && (
                            <Icon
                                iconElement={
                                    <div className="flex flex-row items-center ">
                                        <GoX
                                            style={{ color: 'black' }}
                                            className="hover:text-green-400"
                                        />
                                        <span
                                            className={clsx({
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
                        iconSymbol={<BsListNested />}
                        text="Discover recipes"
                        unread={amountOfNewPosts}
                    />

                    <NavigationLink
                        to={ROUTES.RECIPES_CREATE}
                        menuIsOpen={menuIsOpen}
                        additionalClasses={clsx({
                            flex: menuIsOpen === false,
                            hidden: menuIsOpen === true,
                        })}
                        iconSymbol={<GoPlus />}
                        text="Create"
                    />

                    <NavigationLink
                        to={ROUTES.INGREDIENTS}
                        menuIsOpen={menuIsOpen}
                        iconSymbol={<GiShinyApple />}
                        text="Ingredients"
                    />

                    <NavigationLink
                        to={ROUTES.INGREDIENTS_CREATE}
                        menuIsOpen={menuIsOpen}
                        iconSymbol={<GiChiliPepper />}
                        text="New ingredient"
                    />

                    <NavigationLink
                        to={ROUTES.RATINGS}
                        menuIsOpen={menuIsOpen}
                        iconSymbol={<BsStarHalf />}
                        text="Ratings"
                    />
                </div>
            </div>

            <div
                className={clsx('w-full', {
                    'flex flex-col items-center': !menuIsOpen,
                })}
            >
                {menuIsOpen && (
                    <span className="mb-1 text-gray-500 text-sm flex px-3">MY ACCOUNT</span>
                )}

                <span
                    className={clsx('mb-4 text-xs flex text-gray-700 font-bold px-3', {
                        visible: menuIsOpen,
                        invisible: !menuIsOpen,
                    })}
                >
                    Logged in as {user.name}
                </span>

                <NavigationLink
                    to={ROUTES.ACCOUNT}
                    menuIsOpen={menuIsOpen}
                    iconSymbol={<MdSwitchAccount />}
                    text="Account"
                />

                <div
                    role="button"
                    onClick={() => onUserLogout()}
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent): React.KeyboardEvent => {
                        return e
                    }}
                    className="flex flex-row mb-6 px-3"
                >
                    <Icon iconElement={<MdLogout />} />
                    <span
                        className={clsx({
                            'flex ml-4 font-bold': menuIsOpen === true,
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
