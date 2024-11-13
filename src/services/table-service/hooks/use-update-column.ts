import { useQueryClient } from "@tanstack/react-query"

import { TableFilters, TableResponse } from "../table-service.types"
import { tableQueryCacheKey } from "./use-table.query"

export const useUpdateColumn = (params: TableFilters, api_route: string) => {
  const queryClient = useQueryClient()

  const filters = {
    ...params,
    query: !!params.query && params.query.trim().length >= 2 && params.query,
    filterValue: params.filterBy && params.filterValue,
    filterBy: params.filterValue && params.filterBy,
  }

  const cleanedFilters: { [k: string]: string } = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => !!value),
  ) as { [k: string]: string }

  const queryString = new URLSearchParams(cleanedFilters).toString()

  const updateColumn = (id: number, instance: any) => {
    queryClient.setQueryData(
      [tableQueryCacheKey, api_route, queryString],
      (oldData: { data: TableResponse } | undefined) => {
        if (!oldData) return

        const updatedData = instance
          ? oldData.data.data.map(row => (row.id === id ? { ...row, ...instance } : row))
          : oldData.data.data.filter(row => row.id !== id)

        return { data: { ...oldData.data, data: updatedData } }
      },
    )
  }

  return updateColumn
}
