import { ReactNode } from "react"

export interface DialogProps {
  open: boolean
  handleClose: () => void
  title: string
  children: ReactNode
}
