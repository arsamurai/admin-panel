import { FC } from "react"

export const DD: FC<any> = props => {
  const rowData = props.cell._cell.row.data
  const cellValue = props.cell._cell.value || "Edit | Show"
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>
}
