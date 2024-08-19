import React, { ReactElement } from 'react'

const NoRecipes: React.FC = ({}): ReactElement => {
    return (
        <main style={{ padding: '1rem' }}>
            <p>No recipes data available, probably the API endpoint is down.</p>
        </main>
    )
}

export default NoRecipes
