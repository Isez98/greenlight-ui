import React from 'react'
import { VscChromeClose } from 'react-icons/vsc'

interface EventModalProps extends React.HTMLAttributes<HTMLDivElement> {
  closeEvent: () => void
  // onSubmit: (values: any, { setErrors }: any) => Promise<void>
  modalTitle: string
  errors: any
  footer?: any
}

export const EventModal: React.FC<EventModalProps> = ({
  className,
  modalTitle,
  closeEvent,
  onSubmit,
  errors,
  footer,
  children,
}) => {
  return (
    <div className={`${className}`}>
      <div className="bg-gray-700 absolute left-0 top-1/5 w-full rounded-lg  shadow-2xl md:left-24 md:bottom-3/4 md:w-3/4 lg:top-1/5 lg:left-1/4 lg:h-max lg:w-2/4">
        <header className="flex items-center justify-between  px-4 py-2">
          <h3 className="text-lg font-bold w-70">{modalTitle}</h3>
          <div
            className="border-2 rounded p-1 border-transparent bg-transparent hover:cursor-pointer hover:border-indigo-500"
            onClick={() => closeEvent()}
          >
            <span className="text-gray-300 text-xl">
              <VscChromeClose />
            </span>
          </div>
        </header>
        <div className="p-3">{children}</div>
        <footer className="mt-5 flex justify-end border-t p-3">{footer}</footer>
      </div>
    </div>
  )
}

export default EventModal
