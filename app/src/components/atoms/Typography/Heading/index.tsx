import React, { ReactElement } from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  extraClasses: string
}

const Heading: React.FC<HeadingProps> = ({
  headingLevel = 'h6',
  children,
  extraClasses = '',
}: HeadingProps): ReactElement => {
  switch (headingLevel) {
    case 'h1':
      return <h1 className={`xs:text-sm ${extraClasses}`}>{children}</h1>
      break

    case 'h2':
      return <h2 className={`text-lg sm:text-xl md:text-2xl xl:text-3xl ${extraClasses}`}>{children}</h2>
      break

    case 'h3':
      return <h3 className={`xs:text-sm ${extraClasses}`}>{children}</h3>
      break

    case 'h4':
      return <h4 className={`xs:text-sm ${extraClasses}`}>{children}</h4>
      break

    case 'h5':
      return <h5 className={`xs:text-sm ${extraClasses}`}>{children}</h5>
      break

    case 'h6':
      return <h6 className={`xs:text-sm ${extraClasses}`}>{children}</h6>
      break

    default:
      return <p>{children}</p>
      break
  }
}
export default Heading
