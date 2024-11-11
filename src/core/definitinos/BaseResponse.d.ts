export default interface BaseResponse<T, TError> {
    statusCode: number
    isValid: boolean
    error: TError
    result: T
  }