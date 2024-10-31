import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export const useFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: { [key: string]: string } = Object.fromEntries(searchParams.entries())

  const handleParams = useCallback(
    (key: string, value: string | string[]) => {
      const paramValue = Array.isArray(value) ? value.join(",") : value

      if (searchParams.has(key, paramValue)) {
        return
      }

      if (paramValue) {
        searchParams.set(key, paramValue)
      } else {
        searchParams.delete(key)
      }
      setSearchParams(searchParams)
    },
    [setSearchParams, searchParams],
  )

  const handleSort = useCallback(
    (sort: string, order: string) => {
      handleParams("sort", sort)
      handleParams("order", order)
    },
    [handleParams],
  )

  return {
    filters: {
      ...filters,
      page: filters.page ?? "1",
      pageSize: filters.pageSize ?? "20",
      sort: filters.sort ?? "id",
      order: filters.order ?? "DESC",
    },
    onChangeParam: handleParams,
    onSort: handleSort,
  }
}
