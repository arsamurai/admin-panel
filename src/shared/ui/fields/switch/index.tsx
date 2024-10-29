import { cn } from "@shared/utils/cn"

import Check, { CheckProps, LabelProps } from "../check"

function Switch(props: CheckProps) {
  return <Check {...props}>{props.children}</Check>
}

Switch.Label = (props: LabelProps) => {
  return <Check.Label {...props}>{props.children}</Check.Label>
}

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  type: "checkbox"
}

Switch.Input = (props: InputProps) => {
  return (
    <Check.Input
      {...props}
      className={cn([
        // Default
        "relative h-[24px] w-[38px] rounded-full p-px",
        "before:absolute before:inset-y-0 before:my-auto before:h-[20px] before:w-[20px] before:rounded-full before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-[margin-left] before:duration-200 before:ease-in-out",

        // On checked
        "checked:border-primary checked:bg-primary checked:bg-none",
        "before:checked:ml-[14px] before:checked:bg-white",

        props.className,
      ])}
    />
  )
}

export default Switch
