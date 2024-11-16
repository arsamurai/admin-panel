export enum FormTypeEnum {
  ClearForm = "cleanForms",
  FillableForm = "forms",
}

export interface FormEntityProps {
  variant: FormTypeEnum
  id: number
}
