import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BannerType, HTTPMethods } from '../../enums'
import { getCookie, useAPI } from '../../utils'
import Wrapper from '../../components/Wrapper/index'
import Tag from '../../components/Tag/index'
import { Button } from '../../components/Button/index'
import { PageFrame } from '../../components/PageFrame/index'
import EventModal from '../../components/Modal'
import { useClickAway } from '@uidotdev/usehooks'
import { MovieForm } from '../../components/MovieForm'
import { Formik } from 'formik'
import { Banner } from '../../components/Banner'

interface IMovie {
  id: number
  title: string
  year: number
  runtime: string
  genres: string[]
  description: string
}

const ViewMovie = ({}) => {
  let navigate = useNavigate()
  const [bannerMessage, setBannerMessage] = useState('')
  const [formData, setFormData] = useState<{
    year: number
    title: string
    runtime: string
    genres: string[]
    description: string
  }>({ year: 2025, title: '', runtime: '60 mins', genres: [], description: '' })
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const { id } = useParams()
  const [movieData, setMovieData] = useState<IMovie>({
    id: 0,
    title: '',
    year: 0,
    runtime: '0',
    genres: [],
    description: '',
  })
  const { queryData: movie = '' } = useAPI(
    HTTPMethods.GET,
    `/v1/movies/${id}`,
    null,
    'moviesList',
  )
  const { queryData: deleteMovie = '', refetch: deleteRefetch } = useAPI(
    HTTPMethods.DELETE,
    `/v1/movies/${id}`,
    null,
    'deleteMovie',
    false,
  )
  const { refetch: updateRefetch } = useAPI(
    HTTPMethods.PATCH,
    `/v1/movies/${id}`,
    formData,
    'updateMovie',
    false,
  )

  const ref = useClickAway<any>((e) => {
    setShowModal(false)
  })

  useEffect(() => {
    if (movie?.movie) {
      document.title = movie?.movie.title

      setMovieData(movie?.movie)
      setFormData({
        title: movie?.movie.title,
        year: movie?.movie.year,
        runtime: movie?.movie.runtime,
        genres: movie?.movie.genres,
        description: movie?.movie.description,
      })
    }
  }, [movie])

  useEffect(() => {
    if (deleteMovie) {
      navigate('/list')
    }
  }, [deleteMovie])

  return (
    <React.Fragment>
      <Wrapper>
        <Banner
          type={BannerType.error}
          text={bannerMessage}
          setText={setBannerMessage}
        />
        {showEdit ? (
          <React.Fragment>
            <Formik
              initialValues={{
                title: movieData?.title,
                year: movieData?.year,
                runtime: parseInt(movieData?.runtime),
                genres: movieData?.genres.map((genre) => {
                  return {
                    label: `${genre.toUpperCase()[0]}${genre.substring(1)}`,
                    value: genre,
                  }
                }),
                description: movieData?.description,
              }}
              onSubmit={async (values, { setErrors }) => {
                updateRefetch().then((resp) => {
                  if (
                    typeof resp?.data?.error === 'object' &&
                    resp?.data?.error !== null
                  ) {
                    setErrors(resp.data.error as any)
                  } else if (resp?.data?.error) {
                    setBannerMessage(resp.data.error)
                  } else {
                    setMovieData(resp.data?.movie)
                    setShowEdit(false)
                  }
                })
              }}
            >
              {({ isSubmitting }: any) => {
                return (
                  <MovieForm formData={formData} setFormData={setFormData}>
                    <div className="flex w-100 justify-between">
                      <button onClick={() => setShowEdit(false)}>Cancel</button>
                      <button
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                        type="submit"
                        onClick={() => isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </MovieForm>
                )
              }}
            </Formik>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>{movieData?.title}</h1>
            <sub>{movieData?.year}</sub>
            <p className="my-3">{movieData?.runtime}</p>
            <div className="flex my-3 w-4/5">
              {movieData?.genres?.map((item: any, index: number) => {
                return (
                  <Tag key={`genre-${index}`} genre={item} className="mr-5" />
                )
              })}
            </div>
            <div className="w-100">
              <p className="text-justify">{movieData?.description}</p>
            </div>
            {getCookie('auth') === undefined ? (
              <></>
            ) : (
              <div className="flex justify-between mt-8 w-100">
                <Button onClick={() => setShowEdit(true)}>Edit</Button>
                <Button onClick={() => setShowModal(true)} danger>
                  Delete
                </Button>
              </div>
            )}
          </React.Fragment>
        )}
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
            footer={<button onClick={() => deleteRefetch()}>Yes</button>}
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
