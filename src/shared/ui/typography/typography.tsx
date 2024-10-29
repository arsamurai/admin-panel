import { FC, PropsWithChildren } from "react"

import { cn } from "@shared/utils/cn"

import { TypographyProps } from "./typography.types"
import { typographyVariants } from "./typography.variants"

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  children,
  as: Component = "p",
  className,
  variant,
  ...props
}) => {
  return (
    <Component className={cn(typographyVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  )
}

export default Typography
