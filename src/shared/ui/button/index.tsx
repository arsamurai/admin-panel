import { forwardRef } from "react"

import { cn } from "@shared/utils/cn"

type Variant = "primary" | "secondary" | "success" | "warning" | "pending" | "danger" | "dark"
type Elevated = boolean
type Size = "sm" | "lg"
type Rounded = boolean

type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    as?: C extends string ? "button" | "a" : C
    variant?: Variant
    elevated?: Elevated
    size?: Size
    rounded?: Rounded
  }
>

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>,
) => React.ReactNode | null

const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType>(
    { as, size, variant, elevated, rounded, children, className, ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || "button"

    // General Styles
    const generalStyles = [
      "transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer",
      "focus:ring-4 focus:ring-primary focus:ring-opacity-20",
      "focus-visible:outline-none",
      "[&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90",
      "[&:not(button)]:text-center",
      "disabled:opacity-70 disabled:cursor-not-allowed",
    ]

    // Sizes
    const small = ["text-xs py-1.5 px-2"]
    const large = ["text-lg py-1.5 px-4"]

    // Main Colors
    const primary = ["bg-primary border-primary text-white"]
    const secondary = [
      "bg-secondary/70 border-secondary/70 text-slate-500",
      "[&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100",
    ]
    const success = ["bg-success border-success text-slate-900"]
    const warning = ["bg-warning border-warning text-slate-900"]
    const pending = ["bg-pending border-pending text-white"]
    const danger = ["bg-danger border-danger text-white"]
    const dark = ["bg-dark border-dark text-white"]

    return (
      <Component
        {...props}
        ref={ref}
        className={cn([
          generalStyles,
          size == "sm" && small,
          size == "lg" && large,
          variant == "primary" && primary,
          variant == "secondary" && secondary,
          variant == "success" && success,
          variant == "warning" && warning,
          variant == "pending" && pending,
          variant == "danger" && danger,
          variant == "dark" && dark,
          rounded && "rounded-full",
          elevated && "shadow-md",
          className,
        ])}
      >
        {children}
      </Component>
    )
  },
)

export default Button
