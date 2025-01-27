import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAPI } from '../../utils.ts'
import HTTPMethods from '../../enums.ts'
import Wrapper from '../../components/Wrapper/index.tsx'
import InputField from '../../components/InputField/index.tsx'
import { Form, Formik } from 'formik'

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState(null)
  const { queryData: loginRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/tokens/authentication',
    credentials,
    'login',
    false,
  )

  useEffect(() => {
    if (loginRes?.authentication_token?.token) {
      document.cookie = `auth=${loginRes.authentication_token.token}; Secure`
      navigate('/')
    }
  }, [loginRes])

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
