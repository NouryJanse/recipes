import React, { ReactElement } from 'react'
import { Loader, PageTitle } from '../../components'

const Ratings: React.FC = (): ReactElement => {
  return (
    <div className="pt-7">
      <div className="mb-16">
        <PageTitle text="Hello from ratings." />
      </div>
      <div className="flex flex-row">
        Work in progress.... <Loader />
      </div>
    </div>
  )
}

export default Ratings
