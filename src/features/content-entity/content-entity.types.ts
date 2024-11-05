import { ContentTypeEnum } from "@services/general-service"

import { EntityTypeEnum } from "@shared/types"

export interface ContentEntityProps {
  variant: ContentTypeEnum | EntityTypeEnum
  id: number
}
