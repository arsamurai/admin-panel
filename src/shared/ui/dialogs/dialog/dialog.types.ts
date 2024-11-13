import { ReactNode } from "react"

export interface DialogProps {
  open: boolean
  handleClose: () => void
  title: string
  children: ReactNode
}

export interface AlertDialogProps {
  open: boolean
  handleOk: () => void
  handleClose: () => void
  text: string
}
