import React, { useEffect, useState } from 'react'
import { useAPI } from '../utils'
import { HTTPMethods } from '../enums'
import MovieCard from '../components/MovieCard/index'
import { useNavigate } from 'react-router-dom'
import { PageFrame } from '../components/PageFrame/index'

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  let navigate = useNavigate()
  const [moviesList, setMoviesList] = useState([])
  const { queryData: movies = '' } = useAPI(HTTPMethods.GET, '/v1/movies', {
    queryKey: 'moviesList',
  })

  useEffect(() => {
    setMoviesList(movies?.movies)
  }, [movies])

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-x-4 gap-y-16 justify-items-center mt-8 md:mt-0 lg:gap-y-32 lg:grid-cols-4 lg:grid xl:grid xl:grid-cols-6">
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

export default () => {
  return (
    <PageFrame>
      <Index />
    </PageFrame>
  )
}
