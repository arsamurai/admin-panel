import { CellContext, createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"

import { ColumnEntity } from "@services/general-service"

import { Cell } from "../cell"

export const useTableColumns = (
  columnsConfig: ColumnEntity[],
  updateColumn: (id: number, instance: any) => void,
) => {
  const columnHelper = createColumnHelper<any>()

  const createCell = (column: ColumnEntity) => (info: CellContext<any, any>) => (
    <Cell
      key={column.id}
      columnId={info.row.original.id}
      data={column.api_object_key ? info.getValue() : undefined}
      type={column.column_type}
      page={column.page}
      api_object_key={column.api_object_key}
      api_key_param={column.api_key_param}
      get_list_route={column.get_list_route}
      api_route={column.api_route}
      api_command_name={column.api_command_name}
      buttons={column.buttons}
      updateColumn={updateColumn}
    />
  )

  const columns = useMemo(
    () =>
      columnsConfig.map(column =>
        column.api_object_key
          ? columnHelper.accessor(column.api_object_key, {
              header: column.title,
              cell: createCell(column),
              enableSorting: !!column.enable_sort,
              enableColumnFilter: !!column.enable_filter,
              filterFn: "includesString",
            })
          : columnHelper.display({
              header: column.title,
              cell: createCell(column),
            }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnHelper, columnsConfig],
  )

  return { columns }
}
