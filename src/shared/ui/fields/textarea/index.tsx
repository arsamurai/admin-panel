import { forwardRef } from "react"

import { cn } from "@shared/utils/cn"

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  formTextareaSize?: "sm" | "lg"
  rounded?: boolean
}

type TextareaRef = React.ComponentPropsWithRef<"textarea">["ref"]

const Textarea = forwardRef((props: TextareaProps, ref: TextareaRef) => {
  const { formTextareaSize, rounded, className, ...computedProps } = props
  return (
    <textarea
      {...computedProps}
      ref={ref}
      className={cn([
        "disabled:cursor-not-allowed disabled:bg-slate-100",
        "[&[readonly]]:cursor-not-allowed [&[readonly]]:bg-slate-100",
        "w-full rounded-md border-slate-300/60 text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20",
        formTextareaSize == "sm" && "px-2 py-1.5 text-xs",
        formTextareaSize == "lg" && "px-4 py-1.5 text-lg",
        rounded && "rounded-full",
        className,
      ])}
      rows={6}
    />
  )
})

export default Textarea
