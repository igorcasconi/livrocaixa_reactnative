export interface PaginationProps<T> {
  totalPages: number
  total: number
  page: number
  data: T[]
}
