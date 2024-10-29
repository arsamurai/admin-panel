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
  id: number
  data: string | number | boolean
  type: string
}
