export default interface PaginationResult<T> {
    hasNext: boolean
    hasPrevious: boolean
    offset: number
    limit: number
    data: T[]
  }