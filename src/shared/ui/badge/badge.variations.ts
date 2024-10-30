import { cva } from "class-variance-authority"

export const badgeVariants = cva("rounded-full ", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      otline: "text-slate-600",
      success: "text-white bg-success",
      warning: "text-white bg-warning",
      danger: "text-white bg-danger",
      gray: "bg-slate-100 text-slate-500",
    },
    size: {
      sm: "px-1 text-xs",
      md: "px-2 text-sm",
      lg: "px-3 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})
