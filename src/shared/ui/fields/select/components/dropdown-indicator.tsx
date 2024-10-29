import React from "react"
import { DropdownIndicatorProps, GroupBase, components } from "react-select"

import SelectArrowIcon from "@assets/icons/select/select-arrow.svg"

function DropdownIndicator<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>(props: DropdownIndicatorProps<OptionType, IsMulti, GroupType>) {
  return (
    <components.DropdownIndicator {...props} className="px-1 py-1.5">
      <SelectArrowIcon />
    </components.DropdownIndicator>
  )
}

export default DropdownIndicator
