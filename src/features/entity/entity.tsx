import { FC } from "react"

import { EntityTypeEnum } from "@shared/types"

import { EntityProps } from "./entity.types"
import { FormEntity, FormTypeEnum } from "./form-entity"
import { TableEntity } from "./table-entity"

const Entity: FC<EntityProps> = ({ variant, id }) => {
  switch (variant) {
    case EntityTypeEnum.Table:
      return <TableEntity id={id} />
    case EntityTypeEnum.ClearForm:
      return <FormEntity variant={FormTypeEnum.ClearForm} id={id} />
    case EntityTypeEnum.FillableForm:
      return <FormEntity variant={FormTypeEnum.FillableForm} id={id} />
  }
}
export default Entity
