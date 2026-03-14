export interface ApiResponse<T> {
  data: T
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}

export interface ApiError {
  statusCode: number
  error: string
  message: string
}

export interface PaginationQuery {
  page?: number
  limit?: number
  lang?: string
}
