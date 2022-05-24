import React, { ReactElement } from 'react'
import PageTitle from '../../components/Generic/PageTitle'

const Account: React.FC = (): ReactElement => {
  return (
    <div className="pt-7">
      <PageTitle text="Hello from account." />
    </div>
  )
}

export default Account
