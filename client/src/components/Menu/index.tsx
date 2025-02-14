import React, { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { title: string; className?: string; onClick?: () => void }[]
}

export const Menu: React.FC<MenuProps> = ({ items, children }) => {
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
        <div ref={ref} className="menu mt-6">
          <ul className="bg-slate-500 rounded-lg border overflow-auto hover:cursor-pointer">
            {items.map((item, index) => {
              return (
                <li
                  key={index}
                  className={` ${item.className ? item.className : ''}`}
                  onClick={item.onClick}
                >
                  {item.title}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
