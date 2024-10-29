import { FC, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { Select, SelectOption } from "@shared/ui/fields"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"

import { SelectFieldProps } from "./select-field.types"

const SelectField: FC<SelectFieldProps> = ({ name, isMulti, size, optionsRoute, routeParam }) => {
  const { control } = useFormContext()
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const parsedParams = JSON.parse(routeParam)
        const queryString = new URLSearchParams(parsedParams.params).toString()

        const response = await fetch(withBackendHost(`${optionsRoute}&${queryString}`))
        const data = await response.json()

        const formattedOptions = Object.keys(data.data).map(key => ({
          value: Number(key),
          label: data.data[key],
        }))

        setOptions(formattedOptions)
      } catch {
        showToast("Не вдалось завантажити опції для select", { type: "error" })
      } finally {
        setLoading(false)
      }
    }

    fetchOptions()
  }, [optionsRoute, routeParam])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, value, onChange } }) => (
        <Select
          name={name}
          options={options}
          value={
            isMulti
              ? (options.filter(c => value?.includes(c.value)) ?? [])
              : options?.find(c => c.value === value)
          }
          onChange={option => {
            if (isMulti) {
              onChange(options?.map(option => option.value))
            } else {
              onChange((option as SelectOption)?.value)
            }
          }}
          isMulti={isMulti}
          isLoading={loading}
          className={size}
        />
      )}
    />
  )
}

export default SelectField
