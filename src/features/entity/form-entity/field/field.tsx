import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { FieldEntity, FieldTypeEnum } from "@services/general-service"

import Editor from "@shared/ui/editor"
import { Input, Label, Textarea } from "@shared/ui/fields"

import { ImageUploaderField } from "./image-uploader-field"
import { SelectField } from "./select-field"

const Field: FC<FieldEntity> = field => {
  const {
    field_name,
    field_text,
    size,
    type,
    placeholder,
    validators,
    is_multiselect,
    max_file_size,
    file_types,
    max_resolution,
    route_param,
    options_route,
    upload_param,
    image_upload_route,
    image_delete_route,
  } = field

  const { register, watch, setValue } = useFormContext()
  const fieldValue = watch(field_name)

  const getField = () => {
    switch (type) {
      case FieldTypeEnum.TextInput:
        return (
          <Input
            {...register(field_name)}
            placeholder={placeholder}
            className={size}
            required={!!validators?.[0]}
            maxLength={validators?.[1] ? 50 : undefined}
          />
        )
      case FieldTypeEnum.Textarea:
        return <Textarea {...register(field_name)} placeholder={placeholder} className={size} />
      case FieldTypeEnum.TextEditor:
        return (
          <Editor
            value={fieldValue}
            onChange={value => setValue(field_name, value)}
            className={size}
          />
        )
      case FieldTypeEnum.Select:
        return (
          <SelectField
            name={field_name}
            isMulti={is_multiselect}
            size={size}
            optionsRoute={options_route ?? ""}
            routeParam={route_param ?? ""}
          />
        )
      case FieldTypeEnum.Image:
      case FieldTypeEnum.MultiImage:
        return (
          <ImageUploaderField
            name={field_name}
            uploadRoute={image_upload_route ?? ""}
            deleteRoute={image_delete_route ?? ""}
            uploadParam={upload_param ?? ""}
            maxFileSize={max_file_size ?? 5}
            fileTypes={file_types ?? []}
            maxFiles={type === FieldTypeEnum.Image ? 1 : 20}
            maxResolution={max_resolution ?? ""}
          />
        )
    }
  }

  return (
    <div>
      <Label>{field_text}</Label>
      {getField()}
    </div>
  )
}
export default Field
