import { FC } from "react"

import { cn } from "@shared/utils/cn"

import CloseIcon from "@assets/icons/close.svg"

import { Typography } from "../typography"
import { ToastBodyProps } from "./toast.types"

export const ToastBody: FC<ToastBodyProps> = ({ content, closeToast, closeButton, type }) => {
  const toastClassName = () => {
    switch (type) {
      case "success":
        return "bg-success border-success bg-opacity-20 border-opacity-5 text-success"
      case "warning":
        return "bg-warning border-warning bg-opacity-20 border-opacity-5 text-warning"
      case "error":
        return "bg-danger border-danger bg-opacity-20 border-opacity-5 text-danger"
      default:
        return "bg-primary border-primary bg-opacity-20 border-opacity-5 text-primary"
    }
  }

  return (
    <div
      className={cn("flex items-center justify-between rounded-xl border p-2", toastClassName())}
    >
      <div className="flex items-center">
        <Typography variant="copy" className="ml-3 text-pretty">
          {content}
        </Typography>
      </div>
      {closeButton && (
        <div
          className="cursor-pointer px-[13px] py-[13px] opacity-50 transition-opacity *:h-3 *:w-3 hover:opacity-100"
          onClick={closeToast}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  )
}
