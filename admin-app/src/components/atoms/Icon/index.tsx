import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

interface IconProps {
    iconElement: ReactNode
    classes?: string
}

const Icon: React.FC<IconProps> = ({ iconElement, classes }): ReactElement => {
    return <StyledIcon className={classes}>{iconElement}</StyledIcon>
}

const StyledIcon = styled.div`
    display: flex;
    position: relative;

    svg {
        min-height: 24px;
        width: 24px;
    }
`

export default Icon
