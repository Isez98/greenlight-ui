import { useState, useEffect } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import HTTPMethods from './enums'
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
  const [loading, setLoading] = useState<'pending' | 'success' | 'error'>(
    'pending',
  )
  const [error, setError] = useState(null)
  const reqHeaders = new Headers()
  reqHeaders.append('Content-Type', 'application/json')

  const auth_token = getCookie('auth')
  if (typeof auth_token !== 'undefined') {
    reqHeaders.append('Authorization', `Bearer ${auth_token}`)
  } else {
    reqHeaders.delete('Authorization')
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
            deleteCookie('auth')
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
    gcTime: 30 * 1000,
  })
  useEffect(() => {
    setData(data)
  }, [loading])

  return { loading, queryData, error, refetch }
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value?.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts?.pop()?.split(';').shift()
  } else {
    return undefined
  }
}

export const deleteCookie = (name: string) => {
  if (getCookie(name)) {
    document.cookie =
      name + '=; Path=/;' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }
}

export const protectedRoutes = ['/', '/create-movie', '/view-movie', '/account']

export const genreOptions: { value: string; label: string }[] = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'romance', label: 'Romance' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'animation', label: 'Animation' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'horror', label: 'Horror' },
]
