import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCookie, getCookie, setCookie, useAPI } from '../../utils'
import HTTPMethods from '../../enums'
import Wrapper from '../../components/Wrapper/index'
import InputField from '../../components/InputField/index'
import { Form, Formik } from 'formik'

export const Login = ({}) => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState<{
    email: string
    password: string
  } | null>(null)
  const { queryData: loginRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/tokens/authentication',
    credentials,
    'login',
    false,
  )

  useEffect(() => {
    if (loginRes?.authentication_token?.token) {
      setCookie('auth', loginRes.authentication_token.token, 1)
      navigate('/list')
    }
  }, [loginRes?.authentication_token?.token])

  useEffect(() => {
    if (credentials !== null) {
      refetch()
    }
  }, [credentials])

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          setCredentials(values)
        }}
      >
        {({ isSubmitting }: any) => {
          return (
            <Form>
              <div className="mb-4">
                <InputField name="email" label="Email" type="email" />
              </div>
              <div className="mb-4">
                <InputField name="password" label="Password" type="password" />
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                  type="submit"
                  onClick={() => isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Wrapper>
  )
}
