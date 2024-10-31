export interface PaginationProps {
  totalPages: number
  siblingCount?: number
  currentPage: number
  onPageChange: (page: number) => void
}

export interface PageSizeProps {
  total?: number
  value?: number
  options: number[]
  onChange: (newValue: number) => void
  className?: string
}
