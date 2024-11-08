import { FC } from "react"

import { useGeneral } from "@features/general-provider"
import { View } from "@features/view"

import Dialog from "@shared/ui/dialog"

import { ModalProps } from "./modal.types"

const Modal: FC<ModalProps> = ({ open, handleClose, id }) => {
  const { general } = useGeneral()
  const modal = general?.modals?.find(page => page.id === Number(id))

  if (!modal) {
    return null
  }

  return (
    <Dialog open={open} handleClose={handleClose} title={modal.title}>
      <View id={modal.entity_id} />
    </Dialog>
  )
}
export default Modal
