import { useQuery } from "@tanstack/react-query"

import { GeneralService } from "../general-service"

export const generalQueryCacheKey = "general"

export const useGeneralQuery = () => {
  return useQuery({
    queryKey: [generalQueryCacheKey],
    queryFn: GeneralService.getGeneral,
    select: response => {
      return response.data.data
    },
  })
}
