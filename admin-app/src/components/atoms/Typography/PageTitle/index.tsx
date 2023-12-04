import React, { ReactElement } from 'react'

type PageTitleProps = {
  text: string
}

const PageTitle: React.FC<PageTitleProps> = ({ text }): ReactElement => {
  return (
    <div className="mb-16">
      <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">{text}</h1>
    </div>
  )
}

export default PageTitle
