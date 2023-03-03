import React, { ReactElement } from 'react'

type PageTitleProps = {
  text: string
}

const PageTitle: React.FC<PageTitleProps> = ({ text }): ReactElement => {
  return <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-20">{text}</h1>
}

export default PageTitle
