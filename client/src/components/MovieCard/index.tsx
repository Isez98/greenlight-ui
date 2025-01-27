import React from 'react'
import Tag from '../Tag/index.tsx'

type MovieCardProps = {
  id: number
  title: string
  year: number
  runtime: string
  genres: string[]
}

const MovieCard = ({
  title,
  year,
  runtime,
  genres,
  className,
  ...props
}: React.FC<MovieCardProps>) => {
  return (
    <div
      className={
        'text-center rounded border border-gray-400 py-2 px-3 leading-tight overflow-ellipsis min-w-56 max-w-56 overflow-hidden whitespace-nowrap' +
        ' ' +
        className
      }
      {...props}
    >
      <h2 className="text-lg font-bold underline">{title}</h2>
      <p className="my-2">{runtime}</p>
      <p className="flex justify-evenly my-2 overflow-ellipsis w-100">
        {genres.map((item: string, index: number) => {
          return <Tag key={`${title}-${index}`} genre={item} />
        })}
      </p>
      <sub>{year}</sub>
    </div>
  )
}

export default MovieCard
