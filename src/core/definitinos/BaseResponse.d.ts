export default interface BaseResponse<T, TError> {
  statusCode: number
  isValid: boolean
  error: TError
  result: T
}

export interface Response {
  itemUuid: string,
  createdAt: string,
  updatedAt: string,
}