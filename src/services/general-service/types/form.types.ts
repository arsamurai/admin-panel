export interface FormEntity {
  id: number
  created_at: string
  title: string
  unique_id: string
  api_command_name: string
  api_parameters: string
  api_route: string
  route_to_fill_form?: string
  passed_parameters?: string // is not used
  containers: ContainerEntity[]
}

// COMPONENTS
interface ContainerEntity {
  id: number
  form_id: number
  order_id: number
  title: string
  size: string
  fields: FieldEntity[]
}

export interface FieldEntity {
  // basic
  id: number
  container_id: number
  order_id: number
  field_title: string
  field_name: string
  field_text: string
  api_key?: string
  size: string
  type: FieldTypeEnum
  // different
  placeholder?: string
  validators?: ValidatorsEnum[]
  show_max_length?: boolean
  image_upload_route?: string
  image_delete_route?: string
  upload_param?: string
  options_route?: string
  route_param?: string
  is_multiselect?: boolean
  upload_route?: string
  max_files?: number
  max_file_size?: number
  max_resolution?: string
  folder_hierarchy_complexity?: FolderHierarchyEnum
  file_types?: ImageEnum[]
}

// ENUMS
enum ValidatorsEnum {
  REQUIRED = "required",
  MAX_LENGTH_50 = "maxLength:50",
}

enum ImageEnum {
  JPG = "jpg",
  PNG = "png",
  GIF = "gif",
}

enum FolderHierarchyEnum {
  SIMPLE = "simple",
  HARD = "hard",
}

export enum FieldTypeEnum {
  TextInput = "text_input",
  Textarea = "textarea",
  TextEditor = "text_editor",
  Select = "select",
  Image = "image",
  MultiImage = "multi_image",
  MultiInput = "multi_input",
}
