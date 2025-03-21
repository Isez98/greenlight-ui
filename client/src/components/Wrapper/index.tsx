import React from 'react'

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant,
  className,
  children,
}) => {
  return (
    <div
      className={`container px-6 md:px-0 mx-auto mt-12 ${variant === 'regular' ? 'max-w-screen-lg' : 'max-w-screen-sm'} ${className}`}
    >
      {children}
    </div>
  )
}

export default Wrapper
