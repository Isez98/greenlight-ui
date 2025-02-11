import React from 'react'
import { NavBar } from '../NavBar/index.tsx'
import { Footer } from '../Footer/index.tsx'

type PageFrameProps = {}

export const PageFrame = ({ children }: React.FC<PageFrameProps>) => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      {children}
      <Footer className="mt-9 flex flex-grow" />
    </div>
  )
}
