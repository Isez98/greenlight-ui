import React from 'react'
import { useNavigate } from 'react-router-dom'

interface NavButtonProps {
  title: string
  value: string
  currentPage: string
}

export const NavButton: React.FC<NavButtonProps> = ({
  title,
  value,
  currentPage,
}) => {
  let navigate = useNavigate()

  const handleOnClick = () => {
    if (value !== currentPage) {
      navigate(value)
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className={`px-3 py-2 mx-3 hover:cursor-pointer rounded-md ${
        value === currentPage
          ? 'bg-slate-400'
          : 'hover:bg-indigo-500 hover:border-spacing-2'
      }`}
    >
      {title}
    </div>
  )
}
