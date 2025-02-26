import React, { useEffect, useState } from 'react'
import { genreOptions, useAPI } from '../../utils'
import HTTPMethods from '../../enums'
import { Form, Formik } from 'formik'
import InputField from '../../components/InputField/index'
import Wrapper from '../../components/Wrapper/index'
import { PageFrame } from '../../components/PageFrame'
import { useNavigate } from 'react-router-dom'

interface CreateMovieProps {}

const CreateMovie: React.FC<CreateMovieProps> = ({}) => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState<any>(null)
  const { queryData: createMovieRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/movies',
    formData,
    'login',
    false,
  )

  useEffect(() => {
    if (formData !== null) {
      refetch()
    }
  }, [formData])

  useEffect(() => {
    if (createMovieRes?.movie) {
      navigate('/')
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
              <Form>
                <div className="mb-4">
                  <InputField name="title" label="Title" />
                </div>
                <div className="mb-4">
                  <InputField
                    name="year"
                    label="Year"
                    type="number"
                    min={'1900'}
                    max={'2040'}
                    step={'1'}
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    name="runtime"
                    label="Runtime (mins.)"
                    type="number"
                    min={'30'}
                    max={'300'}
                    step={'1'}
                  />
                </div>
                <div className="mb-6">
                  <InputField
                    name="genres"
                    label="Genres"
                    multiselect
                    onChange={(genre) => setFieldValue('genres', genre)}
                    options={genreOptions}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                    type="submit"
                    onClick={() => isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
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
