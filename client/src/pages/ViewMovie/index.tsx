import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HTTPMethods from '../../enums'
import { useAPI } from '../../utils'
import Wrapper from '../../components/Wrapper/index'
import Tag from '../../components/Tag/index'
import { Button } from '../../components/Button/index'
import { PageFrame } from '../../components/PageFrame/index'
import EventModal from '../../components/Modal'
import { useClickAway } from '@uidotdev/usehooks'

interface IMovie {
  id: number
  title: string
  year: number
  runtime: string
  genres: string[]
}

const ViewMovie = ({}) => {
  let navigate = useNavigate()
  const [showModal, setShowModal] = useState<boolean>(false)
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

  const { queryData: deleteMovie = '', refetch } = useAPI(
    HTTPMethods.DELETE,
    `/v1/movies/${id}`,
    null,
    'deleteMovie',
    false,
  )

  const ref = useClickAway<any>((e) => {
    setShowModal(false)
  })

  useEffect(() => {
    if (movie?.movie) {
      setMovieData(movie.movie)
    }
  }, [movie?.movie])

  const deleteEvent = () => {
    refetch()
  }

  useEffect(() => {
    if (deleteMovie) {
      navigate('/')
    }
  }, [deleteMovie])

  return (
    <React.Fragment>
      <Wrapper>
        <h1>{movieData?.title}</h1>
        <sub>{movieData?.year}</sub>
        <p className="my-3">{movieData?.runtime}</p>
        <div className="flex my-3 w-4/5">
          {movieData?.genres?.map((item: any, index: number) => {
            return <Tag key={`genre-${index}`} genre={item} className="mr-5" />
          })}
        </div>
        <div className="flex justify-between mt-8 w-100">
          <Button onClick={() => {}}>Edit</Button>
          <Button onClick={() => setShowModal(true)} danger>
            Delete
          </Button>
        </div>
      </Wrapper>
      {showModal && (
        <div ref={ref}>
          <EventModal
            closeEvent={() => setShowModal(false)}
            modalTitle={`Delete "${movieData?.title}"?`}
            errors={undefined}
            onSubmit={() => {
              setShowModal(false)
            }}
            footer={<button onClick={() => deleteEvent()}>Yes</button>}
          >
            <p>Are you sure?</p>
          </EventModal>
        </div>
      )}
    </React.Fragment>
  )
}

export default () => {
  return (
    <PageFrame>
      <ViewMovie />
    </PageFrame>
  )
}
