import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { protectedRoutes, titles, useAPI } from '../../utils'
import { PageLoader } from '../PageLoader/index'
import { HTTPMethods } from '../../enums'

// deno-lint-ignore no-empty-interface
interface IPrivateRouteProps extends React.HTMLAttributes<HTMLBodyElement> {}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const [validToken, setValidToken] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const pathIsProtected = protectedRoutes.indexOf(location.pathname) !== -1
  const { queryData: valid = '', loading } = useAPI(
    HTTPMethods.GET,
    '/v1/tokens/verify',
    {
      queryKey: 'valid',
    },
  )

  useEffect(() => {
    document.title = titles[location.pathname] ?? 'Greenlight'
  }, [location])

  useEffect(() => {
    if (typeof valid?.valid !== 'undefined') {
      setValidToken(valid.valid)
    }
  }, [valid?.valid])

  useEffect(() => {
    if (!validToken && pathIsProtected && loading !== 'pending') {
      navigate('/login?next=' + location.pathname)
    } else if (validToken && String(location.pathname).includes('login')) {
      navigate('/list')
    } else {
      navigate('/login')
    }
  }, [validToken])

  return loading === 'pending' ? <PageLoader /> : <>{children}</>
}
