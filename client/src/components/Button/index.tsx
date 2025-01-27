import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  danger: boolean
}

export const Button = ({
  danger = false,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 font-bold text-white ${danger ? 'bg-red-500' : 'bg-blue-500'} rounded focus:shadow-outline ${danger ? 'hover:bg-red-700' : 'hover:bg-blue-700'} focus:outline-none ${className}`}
      type="submit"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
