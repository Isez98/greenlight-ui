import React from 'react'

interface NavButtonProps {
  title: string
}

export const NavButton: React.FC<NavButtonProps> = ({ title }) => {
  return (
    <div className="px-3 py-2 mx-3 hover:cursor-pointer bg-slate-400 rounded-md">
      {title}
    </div>
  )
}
