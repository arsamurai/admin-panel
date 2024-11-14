import { FC } from "react"

import { cn } from "@shared/utils/cn"

import { Label, Select } from "../fields"
import { PageSizeProps } from "./pagination.types"

const PageSize: FC<PageSizeProps> = ({ value, options, total, onChange, className }) => {
  const filteredPageSizeOptions = options.map((item, index) => {
    const previousOption = Number(options[index - 1])
    const totalCount = Number(total)
    const itemObject = { value: item, label: item }

    if (index === 0) {
      return itemObject
    }

    if (totalCount > previousOption) {
      return itemObject
    } else return { ...itemObject, isDisabled: true }
  })

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label>Количество:</Label>
      <Select
        name="pageSize"
        value={{ label: value, value }}
        onChange={option => option?.value && onChange(option.value)}
        options={filteredPageSizeOptions}
        defaultValue={{ label: options[0], value: options[0] }}
        isSearchable={false}
      />
    </div>
  )
}
export default PageSize
