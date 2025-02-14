import React from 'react'
import { PageFrame } from '../../components/PageFrame'

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
  return (
    <React.Fragment>
      <h1>Account Page</h1>
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
