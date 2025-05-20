const handleRtkQueryError = (error: unknown) => {
    if ((error as RTQError).status === 'FETCH_ERROR') {
        return false
    }
    console.error(error)
}

export default handleRtkQueryError
