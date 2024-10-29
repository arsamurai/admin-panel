import { EntityTypeEnum } from "@shared/types"

export interface OffcanvasEntity {
  id: number
  title: string
  unique_id: string
  route: string
  entity_type: EntityTypeEnum
  entity_id: number
}
