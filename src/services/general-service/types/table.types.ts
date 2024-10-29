export interface TableEntity {
  id: number
  title: string
  unique_id: string
  api_route: string
  per_page: number
  query_fields: QueryFieldsEnum[]
  enable_search: 0 | 1
  enable_pagination: 0 | 1
  columns: ColumnEntity[]
  buttons: ButtonEntity[]
}

// COMPONENTS
export interface ButtonEntity {
  id: number
  column_id: number
  order_id: number
  title: string
  api_key_param: string
  api_command_name: string
  color: string
  api_route: string
  action_type: ButtonActionTypeEnum
  action?: string | number
  show_alert: 0 | 1
  alert_message?: string
}

export interface ColumnEntity {
  // basic
  id: number
  table_id: number
  order_id: number
  title: string
  enable_sort: 0 | 1
  enable_filter: 0 | 1
  column_type: ColumnTypeEnum
  // different
  api_object_key?: string
  page?: string
  api_key_param?: string
  get_list_route?: string
  api_route?: string
  api_command_name?: string
  buttons: ButtonEntity[]
}

// ENUMS
enum QueryFieldsEnum {
  ID = "id",
  Title = "title",
  Date = "date",
}

export enum ButtonActionTypeEnum {
  SendRequest = "sendRequest",
  GoToPage = "goToPage",
  OpenModal = "openModal",
  Offcanvas = "offcanvas",
}

export enum ColumnTypeEnum {
  Text = "text",
  Link = "link",
  Badge = "badge",
  Switch = "switch",
  ButtonsGroup = "buttonsGroup",
}
