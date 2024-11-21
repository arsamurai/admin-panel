import { ColumnEntity } from "@services/general-service"

export interface CellProps
  extends Pick<
    ColumnEntity,
    | "api_object_key"
    | "page"
    | "api_key_param"
    | "get_list_route"
    | "api_route"
    | "api_command_name"
    | "buttons"
  > {
  columnId: number
  data?: string | string[] | number | boolean
  type: string
  updateColumn?: (id: number, instance: any) => void
}
