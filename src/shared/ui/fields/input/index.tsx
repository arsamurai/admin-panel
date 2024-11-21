import { forwardRef } from "react"

import { cn } from "@shared/utils/cn"

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg"
  rounded?: boolean
}

type InputRef = React.ComponentPropsWithRef<"input">["ref"]

const Input = forwardRef((props: InputProps, ref: InputRef) => {
  const { formInputSize, rounded, className, placeholder, onChange, maxLength, ...computedProps } =
    props
  return (
    <input
      {...computedProps}
      ref={ref}
      onChange={e => {
        if (maxLength && e.target.value.length <= maxLength) {
          onChange?.(e)
        } else {
          onChange?.(e)
        }
      }}
      maxLength={maxLength}
      className={cn([
        "disabled:cursor-not-allowed disabled:bg-slate-100",
        "[&[readonly]]:cursor-not-allowed [&[readonly]]:bg-slate-100",
        "w-full rounded-md border-slate-300/60 text-sm font-normal shadow-sm transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20",
        formInputSize == "sm" && "px-2 py-1.5 text-xs",
        formInputSize == "lg" && "px-4 py-1.5 text-lg",
        rounded && "rounded-full",
        className,
      ])}
      placeholder={placeholder ?? "Поиск..."}
    />
  )
})

export default Input
