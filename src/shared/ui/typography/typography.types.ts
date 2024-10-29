import { VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

import { typographyVariants } from "./typography.variants"

type TagVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TagVariants
}
