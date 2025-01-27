import { useState, useEffect } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import HTTPMethods from './enums.ts'
import { useNavigate } from 'react-router-dom'

type IUseAPI = (
  method: HTTPMethods,
  endpoint: string,
  body?: object | null,
  queryKey?: string,
  enabled?: boolean,

  // deno-lint-ignore no-explicit-any
) => {
  loading: 'error' | 'success' | 'pending'
  queryData: any
  error: any
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>
}

export const useAPI: IUseAPI = (
  method,
  endpoint,
  body = null,
  queryKey = 'data',
  enabled = true,
) => {
  let navigate = useNavigate()
  const [queryData, setData] = useState(null)
  const [loading, setLoading] = useState('pending')
  const [error, setError] = useState(null)
  const reqHeaders = new Headers()
  reqHeaders.append('Content-Type', 'application/json')

  const auth_token = getCookie('auth=')
  if (auth_token !== undefined) {
    reqHeaders.append('Authorization', `Bearer ${auth_token}`)
  }

  const { data, refetch } = useQuery({
    queryKey: [`${queryKey}`],

    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:4000${endpoint}`, {
          method: method,
          body: body !== null ? JSON.stringify(body) : null,
          headers: reqHeaders,
        })
        const dataResponse = await res.json()

        if (!res.ok) {
          setLoading('error')
          setError(dataResponse.error || 'Something went wrong')
          if (res.status === 401) {
            navigate('/login')
          }
        }
        setLoading('success')
        return dataResponse
      } catch (error) {
        console.log(error)
      }
    },
    refetchOnWindowFocus: false,
    enabled,
  })
  // setData(req.data)
  useEffect(() => {
    setData(data)
  }, [loading])

  return { loading, queryData, error, refetch }
}

export const getCookie = (cookieName: string) => {
  const cookieValue = document.cookie
    .split(';')
    .find((row) => row.startsWith(cookieName))
    ?.split('=')[1]
  return cookieValue
}

export const protectedRoutes = ['/', '/create-movie', '/view-movie']
