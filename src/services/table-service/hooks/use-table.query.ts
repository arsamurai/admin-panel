import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { api } from "@services/api"

import { useDebounce } from "@shared/hooks"
import { withBackendHost } from "@shared/utils/env"

import { TableFilters, TableResponse } from "../table-service.types"

export const tableQueryCacheKey = "table"

export const useTableQuery = (params: TableFilters, api_route: string) => {
  const debouncedQuery = useDebounce(params?.query, 200)
  const debouncedFilterValue = useDebounce(params?.filterValue, 200)

  const filters = {
    ...params,
    query: !!debouncedQuery && debouncedQuery.trim().length >= 2 ? debouncedQuery : "",
    filterValue: debouncedFilterValue ?? "",
  }

  const queryString = new URLSearchParams(filters).toString()

  return useQuery({
    queryKey: [tableQueryCacheKey, api_route, queryString],
    queryFn: () =>
      api.get<TableResponse>(
        withBackendHost(`${api_route}${queryString ? "&" + queryString : ""}`),
      ),
    placeholderData: keepPreviousData,
    select: data => data.data,
    enabled: !!api_route,
  })
}
