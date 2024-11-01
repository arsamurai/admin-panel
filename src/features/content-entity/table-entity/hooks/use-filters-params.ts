import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

import { TableFilters } from "@services/table-service"

const validKeys = ["page", "pageSize", "sort", "order", "query"]

export const useFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filtersArray = Array.from(searchParams.entries())
  const cleanedFilters: Partial<TableFilters> = Object.fromEntries(
    filtersArray.filter(([key]) => validKeys.includes(key)),
  )

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

  const handleReset = useCallback(() => {
    handleParams("page", "1")
    handleParams("pageSize", "10")
    handleParams("sort", "")
    handleParams("order", "")
    handleParams("search", "")
  }, [handleParams])

  return {
    filters: {
      ...cleanedFilters,
      page: cleanedFilters.page ?? "1",
      pageSize: cleanedFilters.pageSize ?? "20",
      sort: cleanedFilters.sort ?? "id",
      order: cleanedFilters.order ?? "ASC",
      query: cleanedFilters.query ?? "",
    },
    onChangeParam: handleParams,
    onSort: handleSort,
    onReset: handleReset,
  }
}
