import React, { ReactElement } from 'react'

interface FieldContainerProps {
    children: JSX.Element
    classes?: string
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children, classes }): ReactElement => {
    return <div className={`${classes ? classes : 'mb-4'}`}>{children}</div>
}

export default FieldContainer
