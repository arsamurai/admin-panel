import { FC } from "react"

import { DialogContent, DialogHeader, DialogTitle, DialogWrapper } from "./dialog.config"
import { DialogProps } from "./dialog.types"

const Dialog: FC<DialogProps> = ({ open, handleClose, title, children }) => {
  return (
    <DialogWrapper open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </DialogWrapper>
  )
}
export default Dialog
