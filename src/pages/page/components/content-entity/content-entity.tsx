import { FC } from "react"

import { ContentTypeEnum } from "@services/general-service"

import { ContentEntityProps } from "./content-entity.types"
import { FormEntity, FormTypeEnum } from "./form-entity"
import { TableEntity } from "./table-entity"

const ContentEntity: FC<ContentEntityProps> = ({ variant, id }) => {
  switch (variant) {
    case ContentTypeEnum.Table:
      return <TableEntity id={id} />
    case ContentTypeEnum.ClearForm:
      return <FormEntity variant={FormTypeEnum.ClearForm} id={id} />
    case ContentTypeEnum.FillableForm:
      return <FormEntity variant={FormTypeEnum.FillableForm} id={id} />
    default:
      return <p>Нет логики для выбраного типа контента</p>
  }
}
export default ContentEntity
