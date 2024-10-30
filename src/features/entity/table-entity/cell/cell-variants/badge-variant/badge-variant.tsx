import { useQuery } from "@tanstack/react-query"
import { FC } from "react"

import { api } from "@services/api"

import { Badge } from "@shared/ui/badge"
import { withBackendHost } from "@shared/utils/env"

import { BadgeVariantProps } from "./badge-variant.types"

const BadgeVariant: FC<BadgeVariantProps> = ({ api_route }) => {
  const { data } = useQuery({
    queryKey: ["form", api_route],
    queryFn: () => api.get<any[]>(withBackendHost(api_route)),
    select: data => data.data,
    enabled: !!api_route,
    retry: false,
  })

  return data?.map(item => <Badge key={item}>{item}</Badge>)
}

export default BadgeVariant
