import React, { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useClickAway<any>(() => {
    setIsOpen(false)
  })

  const handleOpenModal = () => {
    if (isOpen === false) {
      setIsOpen(true)
    }
  }

  return (
    <div className="flex justify-end">
      <div className="absolute" onClick={handleOpenModal}>
        {children}
      </div>
      {isOpen && (
        <div className="menu mt-6" ref={ref}>
          <ul className="bg-slate-500 px-3 py-1 rounded-lg border overflow-auto">
            <li>Account</li>
            <li>Sign out</li>
          </ul>
        </div>
      )}
    </div>
  )
}
