import { twMerge } from "tailwind-merge"

type LabelProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"label">

function Label(props: LabelProps) {
  return (
    <label {...props} className={twMerge(["mb-2 inline-block", props.className])}>
      {props.children}
    </label>
  )
}

export default Label
