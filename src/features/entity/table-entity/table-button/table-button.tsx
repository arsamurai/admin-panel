import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { ButtonActionTypeEnum, ButtonEntity } from "@services/general-service"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"

const TableButton: FC<ButtonEntity & { param: string | number }> = ({
  title,
  color,
  api_key_param,
  action_type,
  api_route,
  action,
  param,
}) => {
  const navigate = useNavigate()

  const sendRequest = async () => {
    try {
      const response = await fetch(withBackendHost(`${api_route}${param}`))

      if (!response.ok) {
        showToast("Щось пішло не так!", { type: "error" })
      }
    } catch {
      showToast("Щось пішло не так!", { type: "error" })
    }
  }

  const handleClick = () => {
    switch (action_type) {
      case ButtonActionTypeEnum.SendRequest:
        return sendRequest()
      case ButtonActionTypeEnum.GoToPage:
        return navigate(`${ROUTES.PAGE.path}/${action}?${api_key_param}=${param}`)
      case ButtonActionTypeEnum.OpenModal:
        return
      case ButtonActionTypeEnum.Offcanvas:
        return
    }
  }

  return (
    <button
      onClick={handleClick}
      className="h-8 rounded-xl px-4 font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {title}
    </button>
  )
}
export default TableButton
