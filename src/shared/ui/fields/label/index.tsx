import { twMerge } from "tailwind-merge"

type LabelProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"label">

function Label(props: LabelProps) {
  return (
    <label {...props} className={twMerge(["inline-block font-normal", props.className])}>
      {props.children}
    </label>
  )
}

export default Label
