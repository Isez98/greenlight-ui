import { useState, useEffect } from 'react'
import {
  QueryClient,
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import { HTTPMethods } from './enums'
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

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export const useAPI: IUseAPI = (
  method,
  endpoint,
  body = null,
  queryKey = 'data',
  enabled = true,
) => {
  let navigate = useNavigate()
  const [queryData, setData] = useState<any>(null)
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  const { data, refetch } = useQuery(
    {
      queryKey: [`${queryKey}`],

      queryFn: async () => {
        try {
          const res = await fetch(`https://greenlight.isez.dev${endpoint}`, {
            method: method,
            body: body !== null ? JSON.stringify(body) : null,
            headers: reqHeaders,
          })
          const dataResponse = await res.json()

          if (!res.ok) {
            setLoading('error')
            setError(dataResponse.error || 'Something went wrong')
            if (res.status === 401) {
              setCookie('auth', '', -1)
              navigate('/login')
            }
          }
          setLoading('success')
          return dataResponse
        } catch (error) {
          console.error(error)
        }
      },
      refetchOnWindowFocus: false,
      enabled,
      gcTime: 30 * 1000,
    },
    queryClient,
  )

  useEffect(() => {
    setData(data)
  }, [loading])

  useEffect(() => {
    if (queryData) {
      queryClient.removeQueries()
    }
  }, [queryData])

  return { loading, queryData, error, refetch }
}

export const setCookie = (name: string, value: string, days: number) => {
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    var expires = '; expires=' + date.toUTCString()
  } else {
    var expires = ''
  }
  document.cookie = `${name}=${value}${expires}; Domain=.greenlight.isez.dev; Path=/; Secure;'`
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
  setCookie(name, '', -1)
}

export const protectedRoutes = [
  '/list',
  '/create-movie',
  '/view-movie',
  '/account',
]

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

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ field, message }) => {
    errorMap[field] = message
  })

  return errorMap
}

export const titles: any = {
  '/login': 'Login',
  '/create-movie': 'Create Movie',
  '/account': 'Account',
  '/list': 'Movie List',
}
