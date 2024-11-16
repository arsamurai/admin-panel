import { Column, RowData } from "@tanstack/react-table"
import { FC } from "react"

import { useTableConfigStore } from "@services/table-service"

import { Input, Select } from "@shared/ui/fields"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "select"
  }
}

const Filter: FC<{ column: Column<any, unknown> }> = ({ column }) => {
  const { config } = useTableConfigStore()
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  const badges = config?.badges[column.id] ? Object.entries(config.badges[column.id]) : []
  const formatedBadges = badges.map(badge => ({
    label: badge[1].name,
    value: badge[0],
  }))

  return filterVariant === "select" ? (
    <Select
      name="filter-select"
      value={formatedBadges.find(badge => badge.value === columnFilterValue) ?? null}
      onChange={option => option?.value && column.setFilterValue(option.value)}
      options={formatedBadges}
      isSearchable={false}
    />
  ) : (
    <Input
      name="filter-input"
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={e => column.setFilterValue(e.target.value)}
    />
  )
}

export default Filter
