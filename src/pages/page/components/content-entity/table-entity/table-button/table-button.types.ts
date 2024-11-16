import { ButtonEntity } from "@services/general-service"

export interface TableButtonProps extends ButtonEntity {
  columnId?: number
  updateColumn?: (id: number, instance: any) => void
}
