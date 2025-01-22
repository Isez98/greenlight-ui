import React from 'react'

interface WrapperProps {
  variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant,
  children,
}: React.FC<WrapperProps>) => {
  return (
    <div
      className={`container mx-auto mt-12 ${variant === 'regular' ? 'max-w-screen-lg' : 'max-w-screen-sm'}`}
    >
      {children}
    </div>
  )
}

export default Wrapper
