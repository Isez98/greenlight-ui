import React, { useEffect, useState } from 'react'
import { PageFrame } from '../../components/PageFrame'
import { getCookie, useAPI } from '../../utils'
import { HTTPMethods } from '../../enums'
import { IUserData } from '../../types'
import Wrapper from '../../components/Wrapper'

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
  const [user, setUser] = useState<IUserData>({
    name: '',
    email: '',
    activated: false,
  })
  const { queryData: userData = '' } = useAPI(HTTPMethods.GET, '/v1/users', {
    queryKey: 'moviesList',
  })

  useEffect(() => {
    if (userData?.user) {
      setUser(userData.user)
    }
  }, [userData?.user])

  return (
    <React.Fragment>
      <Wrapper>
        <h1>Account Page</h1>
        <h2 className="text-lg">Email: {user?.email}</h2>
        <h2>Name: {user?.name}</h2>
      </Wrapper>
    </React.Fragment>
  )
}

export default () => {
  return (
    <PageFrame>
      <Account />
    </PageFrame>
  )
}
