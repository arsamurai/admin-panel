import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { api } from "@services/api"

import { useDebounce } from "@shared/hooks"
import { withBackendHost } from "@shared/utils/env"

import { TableFilters, TableResponse } from "../table-service.types"
import { useTableConfigStore } from "./use-table-config.store"

export const tableQueryCacheKey = "table"

export const useTableQuery = (params: TableFilters, api_route: string) => {
  const debouncedQuery = useDebounce(params?.query)
  const debouncedFilterValue = useDebounce(params?.filterValue)
  const { setConfig } = useTableConfigStore()

  const filters = {
    ...params,
    query: !!debouncedQuery && debouncedQuery.trim().length >= 2 && debouncedQuery,
    filterValue: params.filterBy && debouncedFilterValue,
    filterBy: debouncedFilterValue && params.filterBy,
  }

  const cleanedFilters: { [k: string]: string } = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => !!value),
  ) as { [k: string]: string }

  const queryString = new URLSearchParams(cleanedFilters).toString()

  return useQuery({
    queryKey: [tableQueryCacheKey, api_route, queryString],
    queryFn: async () => {
      const response = await api.get<TableResponse>(
        withBackendHost(`${api_route}${queryString ? "&" + queryString : ""}`),
      )
      setConfig(response.data.config)
      return response
    },
    placeholderData: keepPreviousData,
    select: data => data.data,
    enabled: !!api_route,
  })
}
