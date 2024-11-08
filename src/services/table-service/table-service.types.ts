// RESPONSES
export interface TableResponse {
  data: any[]
  config: TableConfig
  pagination: Pagination
}

export interface TableConfig {
  badges: {
    [key: string]: {
      [key: number]: BadgeEntity
    }
  }
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

interface BadgeEntity {
  name: string
  type: "primary" | "otline" | "success" | "warning" | "danger" | "dark" | "info"
}

interface Pagination {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}
