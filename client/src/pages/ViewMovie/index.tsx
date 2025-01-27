import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HTTPMethods from '../../enums.ts'
import { useAPI } from '../../utils.ts'
import Wrapper from '../../components/Wrapper/index.tsx'
import Tag from '../../components/Tag/index.tsx'
import { Button } from '../../components/Button/index.tsx'

interface IMovie {
  id: number
  title: string
  year: number
  runtime: string
  genres: string[]
}

export const ViewMovie = ({}) => {
  const { id } = useParams()
  const [movieData, setMovieData] = useState<IMovie>({})
  const { queryData: movie = '' } = useAPI(
    HTTPMethods.GET,
    `/v1/movies/${id}`,
    null,
    'moviesList',
  )

  useEffect(() => {
    if (movie?.movie) {
      setMovieData(movie.movie)
    }
  }, [movie?.movie])

  return (
    <Wrapper>
      <h1>{movieData?.title}</h1>
      <sub>{movieData?.year}</sub>
      <p className="my-3">{movieData?.runtime}</p>
      <p className="flex justify-between my-3 w-52">
        {movieData?.genres?.map((item: any, index: number) => {
          return <Tag key={`genre-${index}`} genre={item} />
        })}
      </p>
      <div className="flex justify-between mt-8 w-100">
        <Button onClick={() => {}}>Edit</Button>
        <Button onClick={() => {}} danger>
          Delete
        </Button>
      </div>
    </Wrapper>
  )
}
