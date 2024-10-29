import { ReactNode } from "react"
import { TypeOptions } from "react-toastify/dist/types"

export interface ToastBodyProps {
  content?: ReactNode
  closeToast: () => void
  closeButton?: boolean
  type: TypeOptions
}
