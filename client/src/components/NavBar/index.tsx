import React, { useEffect } from 'react'
import { VscAccount } from 'react-icons/vsc'
import { Menu } from '../Menu/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavButton } from '../NavButton/index'
import { deleteCookie, setCookie } from '../../utils'

type NavBarProps = {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const location = useLocation()
  let navigate = useNavigate()

  return (
    <div className="mb-8 w-100 px-6 py-3 bg-indigo-800 grid grid-cols-3 min-h-16">
      <div className="flex col-span-2">
        <NavButton title="Home" value="/list" currentPage={location.pathname} authRequired={false} />
        <NavButton
          title="Add"
          value="/create-movie"
          currentPage={location.pathname}
        />
      </div>
      <div>
        <Menu
          items={[
            {
              title: 'Account',
              className: 'px-3 py-1 hover:bg-slate-700',
              authRequired: true,
              onClick: () => {
                navigate('/account')
              },
            },
            {
              title: 'Signout',
              className: 'px-3 py-1 hover:bg-red-600',
              authRequired: false,
              onClick: () => {
                deleteCookie('auth')
                window.location.reload()
              },
            },
          ]}
        >
          <VscAccount size={28} className="hover:cursor-pointer" />
        </Menu>
      </div>
    </div>
  )
}
