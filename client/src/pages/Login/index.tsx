import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCookie, useAPI } from '../../utils'
import { BannerType, HTTPMethods } from '../../enums'
import Wrapper from '../../components/Wrapper/index'
import InputField from '../../components/InputField/index'
import { Form, Formik } from 'formik'
import { Banner } from '../../components/Banner'

export const Login = ({}) => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState<{
    email: string
    password: string
  }>({ email: '', password: '' })
  const [bannerMessage, setBannerMessage] = useState('')

  const { refetch: userLogin } = useAPI(
    HTTPMethods.POST,
    '/v1/tokens/authentication',
    {
      body: credentials,
      queryKey: 'login',
      enabled: false,
    },
  )

  return (
    <Wrapper>
      <Banner
        type={BannerType.error}
        text={bannerMessage ? `Error: ${bannerMessage}` : ''}
        setText={setBannerMessage}
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          userLogin().then((resp) => {
            if (
              typeof resp?.data?.error === 'object' &&
              resp?.data?.error !== null
            ) {
              setErrors(resp.data.error as any)
            } else if (resp?.data?.error) {
              setBannerMessage(resp.data.error)
            } else if (resp.data?.authentication_token?.token) {
              setCookie('auth', resp.data.authentication_token.token, 1)
              navigate('/list')
            }
          })
        }}
      >
        {({ isSubmitting }: any) => {
          return (
            <Form>
              <div className="mb-4">
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      email: e.target.value,
                    })
                  }
                  value={credentials.email}
                />
              </div>
              <div className="mb-4">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  value={credentials.password}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                  type="submit"
                  onClick={() => isSubmitting}
                >
                  Login
                </button>
              </div>
              <p className="w-100 text-center mt-5">
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate('/list')
                  }}
                >
                  Continue as guest
                </a>
              </p>
            </Form>
          )
        }}
      </Formik>
    </Wrapper>
  )
}
