import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FC } from "react"

import { useGeneral } from "@features/general-provider"

import { api } from "@services/api"

import Pagination from "@shared/ui/pagination2"
import Table from "@shared/ui/table"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"
import { isAxiosError } from "@shared/utils/error-handler"

import ChevronIcon from "@assets/icons/chevron.svg"

import { Cell } from "./cell"

const TableEntity: FC<{ id: number }> = ({ id }) => {
  const { general } = useGeneral()
  const table = general?.tables?.find(form => form.id === id)

  const queryClient = useQueryClient()
  const { data, isError, error } = useQuery({
    queryKey: ["table", table?.api_route],
    queryFn: () => api.get<any[]>(withBackendHost(`${table?.api_route}`)),
    select: data => data.data,
    enabled: !!table?.api_route,
    retry: false,
  })

  const updateCell = (id: number, instance: any) => {
    if (!data) return
    queryClient.setQueryData(
      ["table", table?.api_route],
      (oldData: { data: any[] } | undefined) => {
        if (!oldData) return

        const updatedData = instance
          ? oldData.data.map(row => (row.id === id ? { ...row, ...instance } : row))
          : oldData.data.filter(row => row.id !== id)

        return { data: updatedData }
      },
    )
  }

  if (isError) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message
      showToast(message, { type: "error" })
    } else {
      showToast("Не вдалось завантажити таблицю!", { type: "error" })
    }
  }

  if (!table || !data) return null

  return (
    <div className="box box--stacked space-y-8 p-5">
      <div className="overflow-x-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              {table.columns.map(item => (
                <Table.Th key={item.id} className="whitespace-nowrap">
                  {item.title}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map(item => (
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
      {table.enable_pagination && (
        <Pagination className="mx-auto w-fit">
          <Pagination.Link>
            <span className="rotate-90 *:size-4">
              <ChevronIcon />
            </span>
          </Pagination.Link>
          <Pagination.Link>
            <span className="-rotate-90 *:size-4">
              <ChevronIcon />
            </span>
          </Pagination.Link>
          <Pagination.Link>...</Pagination.Link>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link active>2</Pagination.Link>
          <Pagination.Link>3</Pagination.Link>
          <Pagination.Link>...</Pagination.Link>
          <Pagination.Link>
            <span className="rotate-90 *:size-4">
              <ChevronIcon />
            </span>
          </Pagination.Link>
          <Pagination.Link>
            <span className="-rotate-90 *:size-4">
              <ChevronIcon />
            </span>
          </Pagination.Link>
        </Pagination>
      )}
    </div>
  )
}
export default TableEntity
