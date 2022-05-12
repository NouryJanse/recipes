const isLoading = (objectWithStates: {}): boolean => {
  return Object.values(objectWithStates).some((value) => value === 'loading')
}

export default isLoading
