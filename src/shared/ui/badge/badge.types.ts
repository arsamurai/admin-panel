import { VariantProps } from "class-variance-authority"

import { badgeVariants } from "./badge.variations"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
