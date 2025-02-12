import React from 'react'

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  genre: string
}

export const Tag: React.FC<TagProps> = ({ genre, className, ...props }) => {
  return (
    <React.Fragment>
      <div
        className={
          'px-2 bg-indigo-500 rounded-full border-gray-400' + ' ' + className
        }
        {...props}
      >
        {genre}
      </div>
    </React.Fragment>
  )
}

export default Tag
