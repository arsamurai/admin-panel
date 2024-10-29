import { ButtonEntity } from "@services/general-service"

export interface TableButtonProps extends ButtonEntity {
  itemId: number
  updateCell: (id: number, instance: any) => void
}
