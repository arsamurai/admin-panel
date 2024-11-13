import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { Modal } from "@features/modal"
import { Offcanvas } from "@features/offcanvas"

import { ButtonActionTypeEnum } from "@services/general-service"

import { ROUTES } from "@shared/constants"
import { useBoolean, useLocalStorage } from "@shared/hooks"
import Button from "@shared/ui/button"
import { AlertDialog } from "@shared/ui/dialogs"
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
  alert_message,
  show_alert,
  columnId,
  updateColumn,
}) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useBoolean(false)
  const [openOffcanvas, setOpenOffcanvas] = useBoolean(false)
  const [openAlert, setOpenAlert] = useBoolean(false)
  const [, setColumnId] = useLocalStorage<number>("column-id")

  const sendRequest = async () => {
    try {
      const response = await fetch(withBackendHost(`${api_route}${columnId ?? ""}`), {
        method: "POST",
      })

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

  const handleOk = () => {
    switch (action_type) {
      case ButtonActionTypeEnum.SendRequest:
        return sendRequest()
      case ButtonActionTypeEnum.GoToPage:
        if (api_key_param && columnId)
          navigate(`${ROUTES.PAGE.path}/${action}?${api_key_param}=${columnId}`)
        else {
          navigate(`${ROUTES.PAGE.path}/${action}`)
        }
        return
      case ButtonActionTypeEnum.OpenModal:
        if (api_key_param && columnId) {
          setColumnId(columnId)
        }
        return setOpenModal.on()
      case ButtonActionTypeEnum.Offcanvas:
        if (api_key_param && columnId) {
          setColumnId(columnId)
        }
        return setOpenOffcanvas.on()
    }
  }

  const handleClick = () => {
    if (show_alert) {
      setOpenAlert.on()
    } else {
      handleOk()
    }
  }

  const handleCloseModal = () => {
    setOpenModal.off()
    setColumnId(undefined)
  }

  const handleCloseOffcanvas = () => {
    setOpenOffcanvas.off()
    setColumnId(undefined)
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
      <AlertDialog
        open={openAlert}
        handleClose={setOpenAlert.off}
        handleOk={handleOk}
        text={alert_message ?? ""}
      />
      <Modal open={openModal} handleClose={handleCloseModal} id={Number(action)} />
      <Offcanvas open={openOffcanvas} handleClose={handleCloseOffcanvas} id={Number(action)} />
    </>
  )
}

export default TableButton
