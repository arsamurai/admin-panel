import React from "react"
import { default as CustomSelect, GroupBase, Props } from "react-select"

import { cn } from "@shared/utils/cn"

import DropdownIndicator from "./components/dropdown-indicator"
import {
  clearIndicatorStyles,
  controlStyles,
  indicatorContainerStyles,
  menuStyles,
  multiOptionStyles,
  multiValueLabelStyles,
  multiValueRemoveStyles,
  multiValueStyles,
  noOptionsMessageStyles,
  optionStyles,
  placeholderStyles,
  valueContainerStyles,
} from "./select.styles"

function Select<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  rounded,
  className,
  components,
  ...props
}: Props<OptionType, IsMulti, GroupType> & { rounded?: boolean }) {
  return (
    <CustomSelect
      unstyled
      classNamePrefix="select"
      components={{ DropdownIndicator, ...components }}
      className={cn({ "rounded-full": rounded }, className)}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cn(
            controlStyles.base,
            isFocused && controlStyles.focused,
            isDisabled && controlStyles.disabled,
          ),
        placeholder: () => placeholderStyles,
        valueContainer: () => valueContainerStyles,
        indicatorsContainer: () => indicatorContainerStyles,
        menu: () => menuStyles,
        option: ({ isSelected, isFocused, isMulti, isDisabled }) =>
          isMulti
            ? cn(
                multiOptionStyles.base,
                isFocused && multiOptionStyles.focused,
                isSelected && multiOptionStyles.selected,
                isDisabled && optionStyles.disabled,
              )
            : cn(
                isFocused && optionStyles.focused,
                isSelected && optionStyles.selected,
                isDisabled && optionStyles.disabled,
                optionStyles.base,
              ),
        noOptionsMessage: () => noOptionsMessageStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: ({ isFocused }) =>
          cn(multiValueRemoveStyles.base, isFocused && multiValueRemoveStyles.focused),
        clearIndicator: () => clearIndicatorStyles,
        loadingMessage: () => noOptionsMessageStyles,
      }}
      styles={{
        menuPortal: base => ({ ...base, zIndex: 49 }),
        input: base => ({ ...base, "input[type='text']:focus": { boxShadow: "none" } }),
      }}
      menuPosition="fixed"
      placeholder={props.placeholder ?? "Выберите..."}
      {...props}
    />
  )
}

export default Select
