import { FC } from "react"

import { ColumnTypeEnum } from "@services/general-service"

import { TableButton } from "../table-button"
import { BadgeVariant } from "./cell-variants/badge-variant"
import { SwitchVariant } from "./cell-variants/switch-variant"
import { CellProps } from "./cell.types"

export const Cell: FC<CellProps> = ({
  itemId,
  type,
  data,
  api_route,
  api_object_key,
  buttons,
  updateCell,
}) => {
  switch (type) {
    case ColumnTypeEnum.Text:
      return <p>{data}</p>
    case ColumnTypeEnum.Link:
      return (
        <a href="#" className="text-blue-400 underline">
          {data}
        </a>
      )
    case ColumnTypeEnum.Badge:
      return <BadgeVariant api_route={api_route ?? ""} />
    case ColumnTypeEnum.Switch:
      return (
        <SwitchVariant
          id={itemId}
          data={typeof data === "boolean" ? data : false}
          api_route={api_route ?? ""}
          api_object_key={api_object_key ?? ""}
        />
      )
    case ColumnTypeEnum.ButtonsGroup:
      return (
        <div className="flex gap-2">
          {buttons.map(button => (
            <TableButton key={button.id} {...button} itemId={itemId} updateCell={updateCell} />
          ))}
        </div>
      )
    default:
      return null
  }
}

export default Cell
