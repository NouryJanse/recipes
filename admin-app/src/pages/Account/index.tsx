import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import RootState from '../../types/RootState'

import { Loader, PageTitle } from '../../components'

const Account: React.FC = (): ReactElement => {
  const user = useSelector((state: RootState) => state.userSlice.data.user)

  return (
    <div className="pt-7">
      <div className="mb-16">
        <PageTitle text="Hello from account." />
      </div>

      {user.name && <p>Welcome to your accountpage {user.name}!</p>}

      <div className="flex flex-row mt-6">
        Work in progress.... <Loader />
      </div>
    </div>
  )
}

export default Account
