const isLoading = (objectWithStates: any): boolean => {
  return Object.values(objectWithStates).some((value) => value === 'loading')
}

export default isLoading
