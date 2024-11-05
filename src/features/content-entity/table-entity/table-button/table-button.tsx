import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Modal } from "@features/modal"

import { ButtonActionTypeEnum } from "@services/general-service"

import { ROUTES } from "@shared/constants"
import Button from "@shared/ui/button"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"

import { TableButtonProps } from "./table-button.types"

const TableButton: FC<TableButtonProps> = ({
  title,
  color,
  api_key_param,
  action_type,
  api_route,
  action,
  columnId,
  updateColumn,
}) => {
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)

  const sendRequest = async () => {
    try {
      const response = await fetch(withBackendHost(`${api_route}${columnId ?? ""}`), {
        method: "POST",
      })

      // TODO: updateColumn
      if (response.ok) {
        const data = await response.json()
        if (updateColumn && columnId)
          if (data.message) {
            updateColumn(columnId, null)
          } else {
            updateColumn(columnId, data)
          }
      } else {
        showToast("Щось пішло не так!", { type: "error" })
      }
    } catch {
      showToast("Щось пішло не так!", { type: "error" })
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClick = () => {
    switch (action_type) {
      case ButtonActionTypeEnum.SendRequest:
        return sendRequest()
      case ButtonActionTypeEnum.GoToPage:
        return navigate(`${ROUTES.PAGE.path}/${action}?${api_key_param}=${columnId}`)
      case ButtonActionTypeEnum.OpenModal:
        return setOpenDialog(true)
      case ButtonActionTypeEnum.Offcanvas:
        return
    }
  }

  return (
    <>
      <Button
        variant={color}
        onClick={handleClick}
        className="h-8 rounded-xl px-4 font-semibold text-white"
      >
        {title}
      </Button>
      <Modal open={openDialog} handleClose={handleCloseDialog} id={Number(action)} />
    </>
  )
}
export default TableButton
