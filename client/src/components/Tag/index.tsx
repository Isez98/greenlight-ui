import React from 'react'

type TagProps = {
  genre: string
}

export const Tag = ({ genre, className, ...props }: React.FC<TagProps>) => {
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
