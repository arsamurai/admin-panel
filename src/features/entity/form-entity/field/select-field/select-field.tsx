import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { api } from "@services/api"

import { Select, SelectOption } from "@shared/ui/fields"
import { withBackendHost } from "@shared/utils/env"

import { SelectFieldProps } from "./select-field.types"

const SelectField: FC<SelectFieldProps> = ({ name, isMulti, size, optionsRoute, routeParam }) => {
  const { control } = useFormContext()
  const parsedParams = JSON.parse(routeParam)
  const queryString = new URLSearchParams(parsedParams.params).toString()

  const { data, isLoading } = useQuery({
    queryKey: ["select", optionsRoute, queryString],
    queryFn: () =>
      api.get<{ data: { data: any } }>(withBackendHost(`${optionsRoute}&${queryString}`)),
    select: data =>
      Object.entries(data.data.data ?? {}).map(([key, value]) => ({
        value: Number(key),
        label: value,
      })),
    retry: false,
  })

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
          className={size}
        />
      )}
    />
  )
}

export default SelectField
