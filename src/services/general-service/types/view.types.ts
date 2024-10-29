export interface ViewEntity {
  id: number
  title: string
  unique_id: string
  type: ViewTypeEnum
  blocks?: BlockEntity[]
  tabs?: TabEntity[]
}

// COMPONENTS
interface TabEntity {
  id: number
  order_id: number
  view_id: number
  title: string
  icon: string
  entity_id: number
  params: string
  tab_url: string
}

interface BlockEntity {
  id: number
  order_id: number
  view_id: number
  title: string
  size: string
  content_type: ContentTypeEnum
  content_title: string
  content_url: string
  content_params: string
  entity_id?: number
}

// ENUMS
enum ViewTypeEnum {
  BLOCKS = "blocks",
  TABS = "tabs",
}

enum ContentTypeEnum {
  StatisticsCards = "StatisticsCards",
  CalendarCards = "CalendarCards",
  GroupedDataOutput = "GroupedDataOutput",
  ActivityFeed = "ActivityFeed",
  CheckboxTable = "CheckboxTable",
  Table = "Table",
  FillableForm = "FillableForm",
  ClearForm = "ClearForm",
}
