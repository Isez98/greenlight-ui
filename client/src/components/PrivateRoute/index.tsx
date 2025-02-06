import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { protectedRoutes, useAPI } from '../../utils.ts'
import { PageLoader } from '../PageLoader/index.tsx'
import HTTPMethods from '../../enums.ts'

// deno-lint-ignore no-empty-interface
interface IPrivateRouteProps {}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children,
}: React.Node) => {
  const [validToken, setValidToken] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const pathIsProtected = protectedRoutes.indexOf(location.pathname) !== -1
  const { queryData: valid = '', loading } = useAPI(
    HTTPMethods.GET,
    '/v1/tokens/verify',
    null,
    'valid',
  )

  useEffect(() => {
    if (typeof valid?.valid !== 'undefined') {
      setValidToken(valid.valid)
    }
  }, [valid?.valid])

  useEffect(() => {
    if (!validToken && pathIsProtected && loading !== 'pending') {
      navigate('/login?next=' + location.pathname)
    } else if (validToken && String(location.pathname).includes('login')) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [validToken])

  return loading !== 'pending' ? <PageLoader /> : <>{children}</>
}
