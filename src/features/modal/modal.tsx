import { FC } from "react"

import { ContentEntity } from "@features/content-entity"
import { useGeneral } from "@features/general-provider"

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
      <ContentEntity variant={modal.entity_type} id={modal.entity_id} />
    </Dialog>
  )
}
export default Modal
