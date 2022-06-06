class ObjectAlreadyExistsError extends Error {}
class ObjectCouldNotBeFoundError extends Error {}
class NoContentError extends Error {}
class CustomError extends Error {}
class IdIsOfInvalidFormat extends Error {}

export {
  ObjectAlreadyExistsError,
  ObjectCouldNotBeFoundError,
  NoContentError,
  CustomError,
  IdIsOfInvalidFormat,
}
