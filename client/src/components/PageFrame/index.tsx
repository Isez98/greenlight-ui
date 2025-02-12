import React from 'react'
import { NavBar } from '../NavBar/index'
import { Footer } from '../Footer/index'

interface PageFrameProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PageFrame: React.FC<PageFrameProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />
      <div className="flex-grow">{children}</div>
      <Footer className="mt-9 h-100 px-6 py-3" />
    </div>
  )
}
