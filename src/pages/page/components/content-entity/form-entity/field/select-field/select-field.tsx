import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { useSelectQuery } from "@services/select-service"

import { Select, SelectOption } from "@shared/ui/fields"

import { SelectFieldProps } from "./select-field.types"

const SelectField: FC<SelectFieldProps> = ({
  name,
  isMulti,
  className,
  optionsRoute,
  routeParam,
}) => {
  const { control } = useFormContext()
  const parsedParams = JSON.parse(routeParam)
  const queryString = new URLSearchParams(parsedParams.params).toString()

  const { data, isLoading } = useSelectQuery(optionsRoute, queryString)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, value, onChange } }) => (
        <Select
          name={name}
          options={data}
          value={
            isMulti
              ? (data?.filter(c => value?.includes(c.value)) ?? [])
              : data?.find(c => c.value === value)
          }
          onChange={option => {
            if (isMulti) {
              onChange(data?.map(option => option.value))
            } else {
              onChange((option as SelectOption)?.value)
            }
          }}
          isMulti={isMulti}
          isLoading={isLoading}
          className={className}
        />
      )}
    />
  )
}

export default SelectField
