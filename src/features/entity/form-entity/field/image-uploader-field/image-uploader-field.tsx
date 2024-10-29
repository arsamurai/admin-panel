import { ChangeEvent, FC } from "react"
import { useFormContext } from "react-hook-form"

import { ImageEntity, ImageUploader } from "@shared/ui/image-uploader"
import { showToast } from "@shared/ui/toastify"
import { withBackendHost } from "@shared/utils/env"

import { ImageUploaderFieldProps } from "./image-uploader-field.types"

const ImageUploaderField: FC<ImageUploaderFieldProps> = ({
  name,
  uploadRoute,
  deleteRoute,
  uploadParam,
  maxFileSize,
  fileTypes,
  maxFiles,
  maxResolution,
}) => {
  const { setValue, watch } = useFormContext()
  const images: ImageEntity[] = watch(name) ?? []
  const [maxWidth, maxHeight] = maxResolution.split("x")?.map(v => parseInt(v, 10)) ?? [0, 0]

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e?.target?.files
      if (!files || files.length === 0) return

      const formData = new FormData()

      const validationResults = await Promise.all(Array.from(files).map(file => checkImage(file)))

      if (!validationResults.some(isValid => isValid)) {
        return
      }

      validationResults.forEach((isValid, index) => {
        if (isValid) formData.append(`files[${index}]`, files[index])
      })

      const parsedParams = JSON.parse(uploadParam)
      const queryString = new URLSearchParams(parsedParams.params).toString()
      const response = await fetch(withBackendHost(`${uploadRoute}&${queryString}`), {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        data.data.forEach((image: ImageEntity) => {
          setValue(name, [...images, image], { shouldDirty: true })
        })
      } else {
        showToast("Не вдалось завантажити картинку", { type: "error" })
      }
    } catch {
      showToast("Не вдалось завантажити картинку", { type: "error" })
    }
  }

  const handleDeleteImage = async (id: number) => {
    try {
      const response = await fetch(withBackendHost(deleteRoute), {
        method: "POST",
        body: JSON.stringify([id]),
      })

      if (response.ok) {
        const fileteredImages = images.filter(image => image.id !== id)
        setValue(name, fileteredImages)
      } else {
        showToast("Не вдалось видалити картинку", { type: "error" })
      }
    } catch {
      showToast("Не вдалось видалити картинку", { type: "error" })
    }
  }

  const checkImage = async (file: File): Promise<boolean> => {
    if (file.size > maxFileSize * 1024 * 1024) {
      showToast("Файл заважкий", { type: "error" })
      return false
    }

    const img = new Image()
    img.src = URL.createObjectURL(file)

    try {
      return await new Promise<boolean>(resolve => {
        img.onload = () => {
          const isValidSize = img.width <= maxWidth && img.height <= maxHeight
          if (!isValidSize) {
            showToast(`Файл перевищує допустимі розміри ${maxWidth}x${maxHeight}px`, {
              type: "error",
            })
          }
          resolve(isValidSize)
        }

        img.onerror = () => {
          showToast("Помилка завантаження зображення", { type: "error" })
          resolve(false)
        }
      })
    } finally {
      URL.revokeObjectURL(img.src)
    }
  }

  return (
    <ImageUploader
      images={images}
      deleteImage={handleDeleteImage}
      addImage={handleAddImage}
      acceptedFiles={fileTypes}
      isMulti={maxFiles > 1}
      disabled={images.length >= maxFiles}
    />
  )
}

export default ImageUploaderField
