// RESPONSES
export interface TableResponse {
  data: any[]
  config: any
  pagination: Pagination
}

// TYPES
export interface TableFilters {
  query?: string
  perPage?: string
  page?: string
  sort?: string
  order?: string
  filterBy?: string
  filterValue?: string
}

interface Pagination {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}
