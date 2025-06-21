import React, { useState } from 'react'
import { useAPI } from '../../utils'
import { BannerType, HTTPMethods } from '../../enums'
import { Formik } from 'formik'
import Wrapper from '../../components/Wrapper/index'
import { PageFrame } from '../../components/PageFrame'
import { useNavigate } from 'react-router-dom'
import { MovieForm } from '../../components/MovieForm'
import { Button } from '../../components/Button'
import { Banner } from '../../components/Banner'

interface CreateMovieProps {}

const CreateMovie: React.FC<CreateMovieProps> = ({}) => {
  let navigate = useNavigate()
  const [formData] = useState<FormData>(new FormData())
  const [objectData, setObjectData] = useState<{
    year: number
    title: string
    runtime: string
    genres: string[]
    description: string
    poster: File | null
  }>({
    year: 2025,
    title: '',
    runtime: '60 mins',
    genres: [],
    description: '',
    poster: null,
  })
  const [bannerMessage, setBannerMessage] = useState('')
  const { refetch } = useAPI(HTTPMethods.POST, '/v1/movies', {
    body: formData,
    queryKey: 'createMovie',
    enabled: false,
  })

  return (
    <React.Fragment>
      <Wrapper>
        <Banner
          type={BannerType.error}
          text={bannerMessage}
          setText={setBannerMessage}
        />
        <Formik
          initialValues={{
            title: '',
            year: 2025,
            runtime: '60 mins',
            genres: [],
            description: '',
            poster: null,
          }}
          onSubmit={async (values, { setErrors }) => {
            formData.append('year', objectData.year.toString())
            formData.append('title', objectData.title)
            formData.append('runtime', objectData.runtime)
            formData.append('description', objectData.description)
            formData.append('genres', JSON.stringify(objectData.genres))
            formData.append('poster', objectData.poster!)
            refetch().then((resp) => {
              if (
                typeof resp?.data?.error === 'object' &&
                resp?.data?.error !== null
              ) {
                setErrors(resp.data.error as any)
              } else if (resp?.data?.error) {
                setBannerMessage(resp.data.error)
              } else {
                navigate('/list')
              }
            })
          }}
        >
          {({ isSubmitting }: any) => {
            return (
              <MovieForm objectData={objectData} setObjectData={setObjectData}>
                <Button
                  className="px-4 py-2 "
                  type="submit"
                  onClick={() => isSubmitting}
                >
                  Submit
                </Button>
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
