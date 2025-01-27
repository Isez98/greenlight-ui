import React, { useEffect, useState } from 'react'
import { useAPI } from '../utils.ts'
import HTTPMethods from '../enums.ts'
import MovieCard from '../components/MovieCard/index.tsx'
import { useNavigate } from 'react-router-dom'

interface IndexProps {}

export const Index: React.FC<IndexProps> = ({}) => {
  let navigate = useNavigate()
  const [moviesList, setMoviesList] = useState([])
  const { queryData: movies = '' } = useAPI(
    HTTPMethods.GET,
    '/v1/movies',
    null,
    'moviesList',
  )

  useEffect(() => {
    setMoviesList(movies?.movies)
  }, [movies])

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-x-4 gap-y-16 justify-items-center md:gap-y-32 md:grid-cols-4 md:grid">
        {moviesList?.map((item: any) => (
          <MovieCard
            key={`movie-${item.id}`}
            className="hover:cursor-pointer"
            title={item.title}
            runtime={item.runtime}
            year={item.year}
            genres={item.genres}
            onClick={() => {
              navigate(`/view-movie/${item.id}`)
            }}
          />
        ))}
      </div>
    </React.Fragment>
  )
}
