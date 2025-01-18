import React, { useEffect, useState } from 'react'
import { useAPI } from '../utils.ts'
import HTTPMethods from '../enums.ts'

interface IndexProps {}

export const Index: React.FC<IndexProps> = ({}) => {
  const [moviesList, setMoviesList] = useState([])
  const { queryData: movies = '' } = useAPI(
    HTTPMethods.GET,
    '/v1/movies',
    null,
    'moviesList'
  )

  useEffect(() => {
    setMoviesList(movies?.movies)
  }, [movies])

  return (
    <React.Fragment>
      <h2>Showing Movies List</h2>
      <div>{moviesList?.map((item: any) => item?.title)}</div>
    </React.Fragment>
  )
}
