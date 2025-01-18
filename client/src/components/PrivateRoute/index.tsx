import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCookie, protectedRoutes } from '../../utils.ts'
import { PageLoader } from '../PageLoader/index.tsx'

// deno-lint-ignore no-empty-interface
interface IPrivateRouteProps {}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children,
}: React.Node) => {
  const location = useLocation()
  const navigate = useNavigate()
  const cookie = getCookie('auth=')
  const pathIsProtected = protectedRoutes.indexOf(location.pathname) !== -1

  useEffect(() => {
    if (cookie) {
    } else if (!cookie && pathIsProtected) {
      navigate('/login')
    }
  }, [pathIsProtected])

  if (!cookie && pathIsProtected) {
    if (cookie === null || cookie === undefined) {
      navigate('/login?next=' + location.pathname)
    }
    return <PageLoader />
  }

  return <>{children}</>
}
