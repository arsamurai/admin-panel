import React from "react"

import { cn } from "@shared/utils/cn"

import { BadgeProps } from "./badge.types"
import { badgeVariants } from "./badge.variations"

const Badge: React.FC<BadgeProps> = ({ children, className, variant, size, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      <span>{children}</span>
    </div>
  )
}

export default Badge
