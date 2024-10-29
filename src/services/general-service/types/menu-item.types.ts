export interface MenuItemEntity {
  comment: MenuItemComment
  children: MenuItemEntity[]
}

// COMPONENTS
interface MenuItemComment {
  id: number
  title: string
  icon: string
  page_id: number
  order_id: number
  parent_id: number | null
}
