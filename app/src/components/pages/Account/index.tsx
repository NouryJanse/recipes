import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { PageTitle } from '../..'
import RootState from '../../../types/RootState'

const Account: React.FC = (): ReactElement => {
  const user = useSelector((state: RootState) => state.userSlice.data.user)

  return (
    <div className="pt-7">
      <PageTitle text="Hello from account." />
      {user.name && <p>Welcome to your accountpage {user.name}!</p>}
    </div>
  )
}

export default Account
