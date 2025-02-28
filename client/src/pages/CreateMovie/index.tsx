import React, { useEffect, useState } from 'react'
import { useAPI } from '../../utils'
import HTTPMethods from '../../enums'
import { Formik } from 'formik'
import Wrapper from '../../components/Wrapper/index'
import { PageFrame } from '../../components/PageFrame'
import { useNavigate } from 'react-router-dom'
import { MovieForm } from '../../components/MovieForm'

interface CreateMovieProps {}

const CreateMovie: React.FC<CreateMovieProps> = ({}) => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState<any>(null)
  const { queryData: createMovieRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/movies',
    formData,
    'createMovie',
    false,
  )

  useEffect(() => {
    if (formData !== null) {
      refetch()
    }
  }, [formData])

  useEffect(() => {
    if (createMovieRes?.movie) {
      navigate('/list')
    }
  }, [createMovieRes])

  return (
    <React.Fragment>
      <Wrapper variant="regular">
        <Formik
          initialValues={{ title: '', year: 2025, runtime: 60, genres: [] }}
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
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                  type="submit"
                  onClick={() => isSubmitting}
                >
                  Submit
                </button>
              </MovieForm>
            )
          }}
        </Formik>
      </Wrapper>
    </React.Fragment>
  )
}

export default () => {
  return (
    <PageFrame>
      <CreateMovie />
    </PageFrame>
  )
}
