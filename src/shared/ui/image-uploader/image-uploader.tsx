import { FC } from "react"

import { withBackendHost } from "@shared/utils/env"

import DeleteIcon from "@assets/icons/delete.svg"

import AddImageButton from "./add-image-button"
import { ImageUploaderProps } from "./image-uploader.types"

const ImageUploader: FC<ImageUploaderProps> = ({
  images,
  addImage,
  deleteImage,
  acceptedFiles,
  isMulti,
  disabled,
}) => {
  return (
    <div>
      <div className="flex gap-3 overflow-x-auto">
        {images &&
          images.map(image => {
            return (
              <div
                key={image.id}
                className="relative size-56 min-w-56 overflow-hidden rounded-xl bg-slate-200/60"
              >
                <img
                  src={withBackendHost("/" + image.url)}
                  alt="image"
                  className="size-full object-cover"
                />
                <div
                  className="absolute right-5 top-5 cursor-pointer *:size-5"
                  onClick={() => deleteImage(image.id)}
                >
                  <DeleteIcon />
                </div>
              </div>
            )
          })}
        <AddImageButton
          addImage={addImage}
          isMulti={isMulti}
          acceptedFiles={acceptedFiles}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default ImageUploader
