import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HTTPMethods from '../../enums'
import { useAPI } from '../../utils'
import Wrapper from '../../components/Wrapper/index'
import Tag from '../../components/Tag/index'
import { Button } from '../../components/Button/index'
import { PageFrame } from '../../components/PageFrame/index'

interface IMovie {
  id: number
  title: string
  year: number
  runtime: string
  genres: string[]
}

const ViewMovie = ({}) => {
  const { id } = useParams()
  const [movieData, setMovieData] = useState<IMovie>({
    id: 0,
    title: '',
    year: 0,
    runtime: '0',
    genres: [],
  })
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
      <div className="flex justify-between my-3 w-52">
        {movieData?.genres?.map((item: any, index: number) => {
          return <Tag key={`genre-${index}`} genre={item} />
        })}
      </div>
      <div className="flex justify-between mt-8 w-100">
        <Button onClick={() => {}}>Edit</Button>
        <Button onClick={() => {}} danger>
          Delete
        </Button>
      </div>
    </Wrapper>
  )
}

export default () => {
  return (
    <PageFrame>
      <ViewMovie />
    </PageFrame>
  )
}
