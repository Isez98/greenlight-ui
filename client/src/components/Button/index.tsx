import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  danger = false,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 font-bold text-white ${danger ? 'bg-red-500' : ''} rounded focus:shadow-outline ${danger ? 'hover:bg-red-700' : 'hover:bg-indigo-500'} focus:outline-none ${className}`}
      type="submit"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
