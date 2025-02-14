import React from 'react'
import { VscAccount } from 'react-icons/vsc'
import { Menu } from '../Menu/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavButton } from '../NavButton/index'

type NavBarProps = {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const location = useLocation()
  let navigate = useNavigate()

  return (
    <div className="mb-8 w-100 px-6 py-3 bg-indigo-800 grid grid-cols-3">
      <div className="flex col-span-2">
        <NavButton title="Home" value="/" currentPage={location.pathname} />
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
              onClick: () => {
                navigate('/account')
              },
            },
            {
              title: 'Signout',
              className: 'px-3 py-1 hover:bg-red-600',
            },
          ]}
        >
          <VscAccount size={28} className="hover:cursor-pointer" />
        </Menu>
      </div>
    </div>
  )
}
