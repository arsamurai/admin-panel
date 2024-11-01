import { useQueryClient } from "@tanstack/react-query"
import {
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { FC, useState } from "react"

import { useGeneral } from "@features/general-provider"

import { useTableQuery } from "@services/table-service"

import Button from "@shared/ui/button"
import Dialog from "@shared/ui/dialog"
import { Input, Label } from "@shared/ui/fields"
import { PageSize, Pagination } from "@shared/ui/pagination"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

import { useFiltersParams } from "./hooks/use-filters-params"
import { useTableColumns } from "./hooks/use-table-columns"
import { TableButton } from "./table-button"

const TableEntity: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const { general } = useGeneral()
  const table = general?.tables?.find(form => form.id === id)
  const { filters, onChangeParam, onSort, onReset } = useFiltersParams()

  const pagination: PaginationState = {
    pageIndex: Number(filters.page),
    pageSize: Number(filters.pageSize),
  }

  const sorting: SortingState =
    table?.columns
      .filter(column => column.api_object_key && column.enable_sort)
      .map(column => ({
        id: column.api_object_key!,
        desc: filters.sort === column.api_object_key && filters.order === "DESC",
      })) ?? []

  const { data, isLoading, isPlaceholderData } = useTableQuery(filters, table?.api_route ?? "")

  const updateColumn = (id: number, instance: any) => {
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

  const { columns } = useTableColumns(table?.columns ?? [], updateColumn)
  const tableConfig = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: updaterOrValue => {
      if (typeof updaterOrValue === "function") {
        const newPageState = updaterOrValue(pagination)
        onChangeParam("page", String(newPageState.pageIndex))
      }
    },
    onSortingChange: updaterOrValue => {
      if (typeof updaterOrValue === "function") {
        const newSortingState = updaterOrValue(sorting)
        newSortingState.map(item => {
          onSort(item.id, item.desc ? "DESC" : "ASC")
        })
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    enableSortingRemoval: false,
    maxMultiSortColCount: 1,
  })

  if (!data && !isLoading) {
    return (
      <Typography as="h3" variant="itemTitle" className="my-16 text-center">
        Empty
      </Typography>
    )
  }

  if (!table) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12">
          <Typography as="h1" className="font-medium group-[.mode--light]:text-white">
            Tabulator
          </Typography>
          <div className="box box--stacked mt-3.5">
            {!!table.buttons.length && (
              <div className="flex-inline items-center gap-5 px-5 pt-5">
                {table.buttons.map(button => (
                  <TableButton key={button.id} {...button} />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between gap-5 p-5">
              <div className="flex items-center gap-5">
                {table.enable_search && (
                  <div className="flex items-center gap-5">
                    <Label className="whitespace-nowrap">Пошук:</Label>
                    <Input
                      name="search"
                      value={filters?.query ?? ""}
                      onChange={e => onChangeParam("query", e.target.value)}
                      placeholder="Від двох символів..."
                    />
                  </div>
                )}
                <PageSize
                  total={table.columns.length}
                  options={[10, 50, 100]}
                  value={Number(filters?.pageSize)}
                  onChange={option => {
                    onChangeParam("pageSize", option.toString())
                    onChangeParam("page", "1")
                  }}
                />
              </div>
              <Button variant="pending" onClick={onReset}>
                Reset
              </Button>
              <Button
                variant="pending"
                onClick={() => {
                  setOpen(true)
                }}
              >
                Dialog
              </Button>
            </div>
            <div className="scrollbar-hidden overflow-x-auto">
              <table
                className={cn("w-full min-w-[1050px]", {
                  "pointer-events-none cursor-wait opacity-50": isPlaceholderData,
                })}
              >
                <thead>
                  {tableConfig.getHeaderGroups().map(headerGroup => (
                    <tr
                      key={headerGroup.id}
                      className="border-y border-solid border-slate-200/60 bg-slate-50 font-medium text-slate-500"
                    >
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="m-0 p-0">
                          {header.isPlaceholder ? null : (
                            <div
                              onClick={header.column.getToggleSortingHandler()}
                              className={cn(
                                "relative select-none bg-transparent px-4 py-5 text-left",
                                {
                                  "cursor-pointer hover:bg-slate-100/80":
                                    header.column.getCanSort(),
                                },
                              )}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: (
                                  <span className="absolute right-4 top-1/2 size-0 -translate-y-1/2 border-b-[6px] border-l-[5px] border-r-[5px] border-transparent border-b-[#666] text-[#666]"></span>
                                ),
                                desc: (
                                  <span className="absolute right-4 top-1/2 size-0 -translate-y-1/2 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-[#666] text-[#666]"></span>
                                ),
                              }[header.column.getIsSorted() as string] ??
                                (header.column.getCanSort() ? (
                                  <span className="absolute right-4 top-1/2 size-0 -translate-y-1/2 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-[#666] text-[#666] opacity-30"></span>
                                ) : null)}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {tableConfig.getRowModel().rows.map(row => (
                    <tr
                      key={row.id}
                      className={cn(
                        "cursor-pointer border-b border-dashed border-slate-200 hover:bg-slate-100",
                        {
                          "bg-slate-50": (row.index + 1) % 2 === 0,
                        },
                      )}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="w-1/6 px-4 py-5 text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {table.enable_pagination && (
              <div className="py-5">
                <Pagination
                  totalPages={10}
                  currentPage={pagination.pageIndex}
                  onPageChange={page => tableConfig.setPageIndex(page)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={open} handleClose={() => setOpen(false)} title="Замовлення">
        <p>Замовлення</p>
      </Dialog>
    </>
  )
}
export default TableEntity
