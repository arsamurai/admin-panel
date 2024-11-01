import { useQuery } from "@tanstack/react-query"

import { api } from "@services/api"

import { withBackendHost } from "@shared/utils/env"

const formQueryCacheKey = "form"

export const useFormQuery = (route_to_fill_form: string, itemId: string) => {
  return useQuery({
    queryKey: [formQueryCacheKey, route_to_fill_form, itemId],
    queryFn: () => api.get<{ data: any }>(withBackendHost(`${route_to_fill_form}${itemId}`)),
    select: data => data.data,
    enabled: !!route_to_fill_form,
  })
}
