import { FC } from "react"

import { Badge } from "@shared/ui/badge"

import { BadgeVariantProps } from "./badge-variant.types"

const BadgeVariant: FC<BadgeVariantProps> = ({ api_route }) => {
  return <Badge>Badge {api_route}</Badge>
}

export default BadgeVariant
