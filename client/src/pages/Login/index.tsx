import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAPI } from '../../utils.ts'
import HTTPMethods from '../../enums.ts'

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  let navigate = useNavigate()
  const [healthcheck, setHealthcheck] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { queryData = '' } = useAPI(HTTPMethods.GET, '/v1/healthcheck')
  const { queryData: loginRes = '', refetch } = useAPI(
    HTTPMethods.POST,
    '/v1/tokens/authentication',
    { email, password },
    'login',
    false
  )

  useEffect(() => {
    if (queryData !== null) {
      setHealthcheck(queryData?.environment)
    }
  }, [queryData])

  const loginClick = () => {
    refetch()
    if (loginRes?.authentication_token?.token) {
      document.cookie = `auth=${loginRes.authentication_token.token}; Secure`
      navigate('/')
    }
  }

  return (
    <React.Fragment>
      <div>{healthcheck}</div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
      </div>
      <button onClick={loginClick}>Login</button>
    </React.Fragment>
  )
}
