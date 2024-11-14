import {
  FormEntity,
  MenuItemEntity,
  ModalEntity,
  OffcanvasEntity,
  PageEntity,
  TableEntity,
  ViewEntity,
} from "./types"

// RESPONSES
export type GeneralResponse = { data: GeneralEntity }

// TYPES
export interface GeneralEntity {
  cleanForms: FormEntity[]
  forms: FormEntity[]
  menu: MenuItemEntity[]
  modals: ModalEntity[]
  offcanvas: OffcanvasEntity[]
  tables: TableEntity[]
  views: ViewEntity[]
  pages: PageEntity[]
}
