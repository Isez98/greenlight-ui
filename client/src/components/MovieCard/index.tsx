import React from 'react'
import Tag from '../Tag/index'

interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  year: number
  runtime: string
  genres: string[]
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  runtime,
  genres,
  className = '',
  ...props
}) => {
  return (
    <div
      className={
        'text-center rounded border border-gray-400 py-2 px-3 leading-tight text-ellipsis min-w-56 max-w-56 overflow-hidden whitespace-nowrap' +
        ' ' +
        className
      }
      {...props}
    >
      <h2 className="text-lg font-bold underline overflow-hidden text-ellipsis">
        {title}
      </h2>
      <p className="my-2">{runtime}</p>
      <div className="flex justify-evenly my-2 overflow-hidden text-ellipsis w-100">
        {genres.map((item: string, index: number) => {
          return <Tag key={`${title}-${index}`} genre={item} />
        })}
      </div>
      <sub>{year}</sub>
    </div>
  )
}

export default MovieCard
