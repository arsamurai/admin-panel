import React, { FC, useId } from "react"

import { cn } from "@shared/utils/cn"

import { AddImageButtonProps } from "./image-uploader.types"

const AddImageButton: FC<AddImageButtonProps> = ({
  addImage,
  acceptedFiles,
  isMulti,
  disabled,
}) => {
  const id = useId()
  const accept = acceptedFiles ? acceptedFiles.map(f => `image/${f}`).join(", ") : undefined

  return (
    <label
      htmlFor={id}
      className={cn(
        "relative flex size-56 min-w-56 cursor-pointer items-center justify-center rounded-xl border border-solid border-slate-300/60 text-center",
        { "cursor-not-allowed opacity-70": disabled },
      )}
    >
      <input
        id={id}
        onChange={addImage}
        className="hidden"
        type="file"
        accept={accept}
        multiple={isMulti}
        disabled={disabled}
      />
      <span className="text-6xl text-slate-300">+</span>
    </label>
  )
}

export default AddImageButton
