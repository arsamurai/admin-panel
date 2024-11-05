import { FC } from "react"

import { DialogContent, DialogHeader, DialogTitle, DialogWrapper } from "./dialog.config"
import { DialogProps } from "./dialog.types"

const Dialog: FC<DialogProps> = ({ open, handleClose, title, children }) => {
  return (
    <DialogWrapper open={open} onOpenChange={handleClose}>
      <DialogContent
        className="inset-0 flex h-screen w-full items-center justify-center overflow-y-auto data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        onClick={handleClose}
      >
        <div className="m-auto h-fit w-full max-w-[1000px] p-4">
          <div
            className="h-fit w-full space-y-6 overflow-hidden rounded-xl bg-white p-4"
            onClick={e => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
          </div>
        </div>
      </DialogContent>
    </DialogWrapper>
  )
}
export default Dialog
