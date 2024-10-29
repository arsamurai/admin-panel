import { FC } from "react"

import { ColumnTypeEnum } from "@services/general-service"

import { TableButton } from "../table-button"
import SwitchVariant from "./cell-variants/switch-variant/switch-variant"
import { CellProps } from "./cell.types"

const Cell: FC<CellProps> = ({ id, type, data, api_route, api_object_key, buttons }) => {
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
      return <p>Badge {data}</p>
    case ColumnTypeEnum.Switch:
      return (
        <SwitchVariant
          id={id}
          data={typeof data === "boolean" ? data : false}
          api_route={api_route ?? ""}
          api_object_key={api_object_key ?? ""}
        />
      )
    case ColumnTypeEnum.ButtonsGroup:
      return (
        <div className="flex gap-2">
          {buttons.map(button => (
            <TableButton key={button.id} {...button} param={id} />
          ))}
        </div>
      )
  }
}

export default Cell
