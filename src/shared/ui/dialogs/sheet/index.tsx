import { FC } from "react"

import { SheetContent, SheetHeader, SheetTitle, SheetWrapper } from "./sheet.config"
import { SheetProps } from "./sheet.types"

const Sheet: FC<SheetProps> = ({ open, handleClose, title, children }) => {
  return (
    <SheetWrapper open={open} onOpenChange={handleClose}>
      <SheetContent
        className="flex items-center justify-center overflow-y-auto"
        onClick={handleClose}
        aria-describedby={undefined}
      >
        <div className="m-auto h-fit space-y-6" onClick={e => e.stopPropagation()}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          {children}
        </div>
      </SheetContent>
    </SheetWrapper>
  )
}
export default Sheet
