import { useQuery } from "@tanstack/react-query"

import { api } from "@services/api"

import { withBackendHost } from "@shared/utils/env"

const selectQueryCacheKey = "select"

export const useSelectQuery = (optionsRoute: string, queryString: string) => {
  return useQuery({
    queryKey: [selectQueryCacheKey, optionsRoute, queryString],
    queryFn: () =>
      api.get<{ data: { data: any } }>(withBackendHost(`${optionsRoute}&${queryString}`)),
    select: data =>
      Object.entries(data.data.data ?? {}).map(([key, value]) => ({
        value: Number(key),
        label: value,
      })),
  })
}
