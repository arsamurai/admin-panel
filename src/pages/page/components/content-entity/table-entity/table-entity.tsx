import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { FC } from "react"

import { useGeneral } from "@features/general-provider"

import { useTableQuery, useUpdateColumn } from "@services/table-service"

import Button from "@shared/ui/button"
import { Input, Label } from "@shared/ui/fields"
import { Loading } from "@shared/ui/loading"
import { PageSize, Pagination } from "@shared/ui/pagination"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

import { Filter } from "./filter"
import { useFiltersParams } from "./hooks/use-filters-params"
import { useTableColumns } from "./hooks/use-table-columns"
import { TableButton } from "./table-button"

const TableEntity: FC<{ id: number }> = ({ id }) => {
  const { general } = useGeneral()
  const table = general?.tables?.find(table => table.id === id)
  const { filters, onChangeParam, onSort, onColumnFilter, onReset } = useFiltersParams(
    String(table?.per_page),
  )
  const { data, isLoading, isPlaceholderData } = useTableQuery(filters, table?.api_route ?? "")
  const updateColumn = useUpdateColumn(filters, table?.api_route ?? "")
  const isPagination =
    table?.enable_pagination &&
    Number(data?.pagination.totalItems) > Number(data?.pagination.perPage)

  const pagination: PaginationState = {
    pageIndex: Number(filters.page),
    pageSize: Number(filters.perPage),
  }
  const sorting: SortingState =
    table?.columns
      .filter(column => column.api_object_key && column.enable_sort)
      .map(column => ({
        id: column.api_object_key!,
        desc: filters.sort === column.api_object_key && filters.order === "DESC",
      })) ?? []
  const columnFilters: ColumnFiltersState =
    filters.filterBy && filters.filterValue
      ? [{ id: filters.filterBy, value: filters.filterValue }]
      : []

  const handleUpdateColumn = (id: number, instance: any) => {
    updateColumn(id, instance)
  }

  const { columns } = useTableColumns(table?.columns ?? [], handleUpdateColumn)
  const tableConfig = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      pagination,
      sorting,
      columnFilters,
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
        newSortingState.forEach(item => {
          onSort(item.id, item.desc ? "DESC" : "ASC")
        })
      }
    },
    onColumnFiltersChange: updaterOrValue => {
      if (typeof updaterOrValue === "function") {
        const newColumnFiltersState = updaterOrValue(columnFilters)
        if (newColumnFiltersState.length) {
          newColumnFiltersState.forEach(item =>
            onColumnFilter(item.id, item.value ? (item.value as string) : ""),
          )
        } else {
          onColumnFilter("", "")
        }
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

  if (isLoading) {
    return <Loading />
  }

  if (!table) {
    return null
  }

  return (
    <div className="box box--stacked">
      {!!table.buttons.length && (
        <div className="flex-inline items-center gap-5 px-5 pt-5">
          {table.buttons.map(button => (
            <TableButton key={button.id} {...button} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-5 p-5">
        <div className="flex flex-wrap items-center gap-5">
          {table.enable_search && (
            <div className="flex items-center gap-5">
              <Label className="whitespace-nowrap">Поиск:</Label>
              <Input
                name="search"
                value={filters?.query ?? ""}
                onChange={e => {
                  onChangeParam("query", e.target.value)
                  onChangeParam("page", "1")
                }}
                placeholder="От двух символов..."
              />
            </div>
          )}
          <PageSize
            total={table.columns.length}
            options={[table.per_page, 50, 100]}
            value={Number(filters?.perPage)}
            onChange={option => {
              onChangeParam("perPage", option.toString())
              onChangeParam("page", "1")
            }}
          />
        </div>
        <Button variant="pending" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className="scrollbar-hidden overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            {tableConfig.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}
                className="border-y border-solid border-slate-200/60 bg-slate-50 font-medium text-slate-500"
              >
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="m-0 p-0">
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "relative h-full select-none bg-transparent p-4 text-left",
                            {
                              "cursor-pointer hover:bg-slate-100/80": header.column.getCanSort(),
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
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="p-2">
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className={cn({ "pointer-events-none cursor-wait opacity-50": isPlaceholderData })}
          >
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
                  <td key={cell.id} className="px-4 py-5 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPagination && (
        <div className="py-5">
          <Pagination
            totalPages={data?.pagination.totalPages ?? 0}
            currentPage={pagination.pageIndex}
            onPageChange={page => tableConfig.setPageIndex(page)}
          />
        </div>
      )}
    </div>
  )
}

export default TableEntity
