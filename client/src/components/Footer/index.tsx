import React from 'react'

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return <div className={`bg-indigo-800 ${className}`}>All rights reserved</div>
}
