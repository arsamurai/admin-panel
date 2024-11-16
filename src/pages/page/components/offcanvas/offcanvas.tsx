import { FC } from "react"

import { useGeneral } from "@features/general-provider"

import { Sheet } from "@shared/ui/dialogs"

import { View } from "../view"
import { OffcanvasProps } from "./offcanvas.types"

const Offcanvas: FC<OffcanvasProps> = ({ open, handleClose, id }) => {
  const { general } = useGeneral()
  const offcanvas = general?.offcanvas?.find(offcanvas => offcanvas.id === Number(id))

  if (!offcanvas) {
    return null
  }

  return (
    <Sheet open={open} handleClose={handleClose} title={offcanvas.title}>
      <View id={offcanvas.entity_id} />
    </Sheet>
  )
}
export default Offcanvas
