import React, { ReactElement } from 'react'

type HeadingProps = {
    headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    extraClasses?: string
    children?: JSX.Element | string
}

const Heading: React.FC<HeadingProps> = ({
    headingLevel = 'h6',
    children,
    extraClasses = '',
}): ReactElement => {
    switch (headingLevel) {
        case 'h1':
            return <h1 className={`xs:text-sm mb-6 ${extraClasses}`}>{children}</h1>

        case 'h2':
            return (
                <h2 className={`text-lg sm:text-xl md:text-2xl xl:text-3xl mb-4 ${extraClasses}`}>
                    {children}
                </h2>
            )

        case 'h3':
            return <h3 className={`xs:text-sm ${extraClasses}`}>{children}</h3>

        case 'h4':
            return <h4 className={`xs:text-sm ${extraClasses}`}>{children}</h4>

        case 'h5':
            return <h5 className={`xs:text-sm ${extraClasses}`}>{children}</h5>

        case 'h6':
            return <h6 className={`xs:text-sm ${extraClasses}`}>{children}</h6>

        default:
            return <p>{children}</p>
    }
}
export default Heading
