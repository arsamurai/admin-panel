import { FC } from "react"
import { useFormContext } from "react-hook-form"

import Button from "@shared/ui/button"
import { Input } from "@shared/ui/fields"

import { MultiInputFieldProps } from "./multi-input-field.types"

const MultiInputField: FC<MultiInputFieldProps> = ({
  name,
  className,
  placeholder,
  required,
  maxLength,
}) => {
  const { setValue, watch } = useFormContext()

  const inputs: string[] = watch(name) || []

  const handleAddInput = () => {
    setValue(name, [...inputs, ""], { shouldDirty: true })
  }

  const handleRemoveInput = (index: number) => {
    const updatedInputs = inputs.filter((_: string, idx: number) => idx !== index)
    setValue(name, updatedInputs, { shouldDirty: true })
  }

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = inputs.map((item: string, idx: number) => (idx === index ? value : item))
    setValue(name, updatedInputs, { shouldDirty: true })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {inputs.map((value: string, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={value}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            onChange={e => handleInputChange(index, e.target.value)}
          />
          <Button type="button" variant="danger" size="sm" onClick={() => handleRemoveInput(index)}>
            Удалить
          </Button>
        </div>
      ))}
      <Button type="button" variant="primary" size="sm" onClick={handleAddInput}>
        Добавить инпут
      </Button>
    </div>
  )
}

export default MultiInputField
