import { ReactNode } from "react"

export interface SheetProps {
  open: boolean
  handleClose: () => void
  title: string
  children: ReactNode
}
