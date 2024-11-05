import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

import { TableFilters } from "@services/table-service"

const validKeys = ["page", "perPage", "sort", "order", "filterBy", "filterValue", "query"]

export const useFiltersParams = (perPage: string) => {
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

  const handleColumnFilter = useCallback(
    (filterBy: string, filterValue: string) => {
      handleParams("filterBy", filterBy)
      handleParams("filterValue", filterValue)
    },
    [handleParams],
  )

  const handleReset = useCallback(() => {
    handleParams("page", "1")
    handleParams("perPage", perPage)
    handleParams("sort", "")
    handleParams("order", "")
    handleParams("query", "")
    handleParams("filterBy", "")
    handleParams("filterValue", "")
  }, [handleParams, perPage])

  return {
    filters: {
      ...cleanedFilters,
      page: cleanedFilters.page ?? "1",
      perPage: cleanedFilters.perPage ?? perPage,
      sort: cleanedFilters.sort ?? "id",
      order: cleanedFilters.order ?? "ASC",
    },
    onChangeParam: handleParams,
    onSort: handleSort,
    onColumnFilter: handleColumnFilter,
    onReset: handleReset,
  }
}
