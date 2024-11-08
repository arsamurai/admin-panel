import { FC } from "react"

import { useTableConfigStore } from "@services/table-service"

import { Badge } from "@shared/ui/badge"

import { BadgeVariantProps } from "./badge-variant.types"

const BadgeVariant: FC<BadgeVariantProps> = ({ api_object_key, data }) => {
  const { config } = useTableConfigStore()
  const badge = config.badges[api_object_key][data]

  return (
    <div className="inline-flex flex-wrap gap-1">
      <Badge variant={badge.type}>{badge.name}</Badge>
    </div>
  )
}

export default BadgeVariant
