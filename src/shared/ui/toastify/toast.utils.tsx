import { ReactNode } from "react"
import { ToastOptions, toast } from "react-toastify"

import { ToastBody } from "./toast-body"

export const showToast = (content: ReactNode, toastOptions?: Omit<ToastOptions, "icon">) => {
  const { closeButton = true, type = "default", ...options } = toastOptions || {}

  toast(
    ({ closeToast }) => (
      <ToastBody
        content={content}
        closeToast={closeToast}
        closeButton={Boolean(closeButton)}
        type={type}
      />
    ),
    {
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      closeButton: false,
      icon: false,
      position: "top-right",
      ...options,
    },
  )
}
