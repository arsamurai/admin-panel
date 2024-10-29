import React from "react"
import { ToastContainer as LibToastContainer } from "react-toastify"

const ToastContainer = () => {
  return (
    <LibToastContainer
      className="w-full max-w-[450px] p-2"
      bodyClassName="m-0 p-0 text-base"
      toastClassName="min-h-12 p-0 rounded-xl"
    />
  )
}

export default ToastContainer
