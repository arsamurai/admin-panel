import { ChangeEvent } from "react"

export interface AddImageButtonProps {
  addImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  acceptedFiles?: string[]
  isMulti?: boolean
  disabled?: boolean
}

export interface ImageUploaderProps {
  images: ImageEntity[]
  deleteImage: (id: number) => void
  addImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  acceptedFiles?: string[]
  isMulti: boolean
  disabled: boolean
}

export interface ImageEntity {
  id: number
  url: string
}
