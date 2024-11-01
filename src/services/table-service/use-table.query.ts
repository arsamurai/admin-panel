import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { api } from "@services/api"

import { useDebounce } from "@shared/hooks"
import { withBackendHost } from "@shared/utils/env"

import { TableFilters } from "./table-service.types"

const tableQueryCacheKey = "table"

export const useTableQuery = (params: TableFilters, api_route: string) => {
  const debouncedQuery = useDebounce(params?.query, 200)

  const filters = {
    ...params,
    query: !!debouncedQuery && debouncedQuery.trim().length >= 2 ? debouncedQuery : "",
  }

  const queryString = new URLSearchParams(filters).toString()

  return useQuery({
    queryKey: [tableQueryCacheKey, api_route, queryString],
    queryFn: () => api.get<any[]>(withBackendHost(api_route)),
    placeholderData: keepPreviousData,
    select: data => data.data,
    enabled: !!api_route,
  })
}
