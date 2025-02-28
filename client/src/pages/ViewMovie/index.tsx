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
import { MovieForm } from '../../components/MovieForm'
import { Formik } from 'formik'

interface IMovie {
  id: number
  title: string
  year: number
  runtime: string
  genres: string[]
}

const ViewMovie = ({}) => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState<any>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const { id } = useParams()
  const [movieData, setMovieData] = useState<IMovie>({
    id: 0,
    title: '',
    year: 0,
    runtime: '0',
    genres: [],
  })
  const { queryData: movie = '', refetch: getRefetch } = useAPI(
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
  const { queryData: updateMovie = '', refetch: updateRefetch } = useAPI(
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
      setMovieData(movie?.movie)
    }
    console.log(movie)
  }, [movie])

  useEffect(() => {
    if (deleteMovie) {
      navigate('/list')
    }
  }, [deleteMovie])

  useEffect(() => {
    if (formData !== null) {
      updateRefetch()
    }
  }, [formData])

  useEffect(() => {
    if (updateMovie?.movie) {
      getRefetch().then((res) => {
        if (res.data) {
          setMovieData(res.data?.movie)
        }
      })
      setShowEdit(false)
      setFormData(null)
    }
  }, [updateMovie])

  return (
    <React.Fragment>
      <Wrapper>
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
              }}
              onSubmit={async (values) => {
                const refinedVals = {
                  ...values,
                  runtime: `${values.runtime} mins`,
                  genres: values.genres.map(
                    (genre: { label: string; value: string }) => {
                      return genre.value
                    },
                  ),
                }
                setFormData(refinedVals)
              }}
            >
              {({ isSubmitting, setFieldValue }: any) => {
                return (
                  <MovieForm setFieldValue={setFieldValue}>
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
            <div className="flex justify-between mt-8 w-100">
              <Button onClick={() => setShowEdit(true)}>Edit</Button>
              <Button onClick={() => setShowModal(true)} danger>
                Delete
              </Button>
            </div>
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
