import React, { ReactElement } from 'react'
import { Loader, PageTitle } from '../../components'

const Ratings: React.FC = (): ReactElement => {
  return (
    <div className="pt-7">
      <PageTitle text="Hello from ratings." />

      <div className="flex flex-row">
        Work in progress.... <Loader />
      </div>
    </div>
  )
}

export default Ratings
