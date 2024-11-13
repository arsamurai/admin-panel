import { FC } from "react"

import Button from "@shared/ui/button"

import { DialogContent, DialogFooter, DialogTitle, DialogWrapper } from "./dialog.config"
import { AlertDialogProps } from "./dialog.types"

const AlertDialog: FC<AlertDialogProps> = ({ open, handleClose, handleOk, text }) => {
  return (
    <DialogWrapper open={open} onOpenChange={handleClose}>
      <DialogContent
        className="inset-0 flex h-screen w-full items-center justify-center overflow-y-scroll data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        onClick={handleClose}
      >
        <div className="m-auto h-fit w-full max-w-[500px] p-4">
          <div
            className="h-fit w-full space-y-6 overflow-hidden rounded-xl bg-white px-4 py-6"
            onClick={e => e.stopPropagation()}
          >
            <DialogTitle className="text-center text-base">{text}</DialogTitle>
            <DialogFooter className="justify-center">
              <Button variant="primary" onClick={handleOk}>
                Ок
              </Button>
              <Button onClick={handleClose}>Отмена</Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </DialogWrapper>
  )
}
export default AlertDialog
