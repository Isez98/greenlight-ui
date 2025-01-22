import React from 'react'
import { useAPI } from '../../utils.ts'
import HTTPMethods from '../../enums.ts'
import { Form, Formik } from 'formik'
import InputField from '../../components/InputField/index.tsx'
import Wrapper from '../../components/Wrapper/index.tsx'

interface CreateMovieProps {}

export const CreateMovie: React.FC<CreateMovieProps> = ({}) => {
  // const []
  const { queryData: createMovieRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/movies',
    null,
    'login',
    false,
  )

  return (
    <React.Fragment>
      <Wrapper variant="regular">
        <p className="font-bold underline">Create Movie</p>
        <Formik
          initialValues={{ title: '', year: 0, runtime: 0, genre: '' }}
          onSubmit={() => {}}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <div className="mb-4">
                  <InputField name="title" label="Title" />
                </div>
                <div className="mb-4">
                  <InputField name="year" label="Year" type="number" />
                </div>
                <div className="mb-4">
                  <InputField name="runtime" label="Runtime" type="number" />
                </div>
                <div className="mb-6">
                  <InputField name="genres" label="Genres" />
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
