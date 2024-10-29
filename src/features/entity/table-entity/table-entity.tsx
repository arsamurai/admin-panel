import { FC, useEffect, useState } from "react"

import { useGeneral } from "@features/general-provider"

import Table from "@shared/ui/table"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"

import { Cell } from "./cell"

const TableEntity: FC<{ id: number }> = ({ id }) => {
  const { general } = useGeneral()
  const table = general?.tables?.find(form => form.id === id)
  const [rows, setRows] = useState<any[]>([])

  const updateCell = (id: number, instance: any) => {
    if (instance) {
      setRows(prevRows => prevRows.map(row => (row.id === id ? { ...row, ...instance } : row)))
    } else {
      setRows(prevRows => prevRows.filter(row => row.id !== id))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (table?.api_route) {
        try {
          const response = await fetch(withBackendHost(table.api_route))
          const result = await response.json()
          setRows(result)
        } catch {
          showToast("Не вдалось завантажити таблицю!", { type: "error" })
        }
      }
    }

    fetchData()
  }, [table?.api_route])

  if (!table) {
    return null
  }

  return (
    <div className="box box--stacked space-y-8 p-5">
      <div className="overflow-x-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              {table.columns.map(item => {
                return (
                  <Table.Th key={item.id} className="whitespace-nowrap">
                    {item.title}
                  </Table.Th>
                )
              })}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map(item => (
              <Table.Tr key={item.id}>
                {table.columns.map(column => (
                  <Table.Td key={column.id} className="whitespace-nowrap">
                    <Cell
                      itemId={item.id}
                      data={column.api_object_key ? item[column.api_object_key] : null}
                      type={column.column_type}
                      page={column.page}
                      api_object_key={column.api_object_key}
                      api_key_param={column.api_key_param}
                      get_list_route={column.get_list_route}
                      api_route={column.api_route}
                      api_command_name={column.api_command_name}
                      buttons={column.buttons}
                      updateCell={updateCell}
                    />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  )
}
export default TableEntity
