import React from 'react'

type FooterProps = {}

export const Footer = ({ className = '' }: React.FC<FooterProps>) => {
  return <div className={`bg-indigo-800 ${className}`}>All rights reserved</div>
}
