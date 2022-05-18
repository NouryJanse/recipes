const isLoading = (objectWithStates: object): boolean => {
  return Object.values(objectWithStates).some((value) => value === 'loading')
}

export default isLoading
