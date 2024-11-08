const controlStyles = {
  base: "bg-white hover:cursor-pointer shadow-sm flex transition font-medium text-left duration-200 ease-in-out w-full rounded-md border border-solid border-slate-300/60 px-3 py-1 text-sm outline-none",
  focused: "border-primary border-opacity-40 ring-4 ring-primary ring-opacity-20",
  disabled: "opacity-70 bg-slate-100",
}
const valueContainerStyles = "gap-2"
const placeholderStyles = "text-sm text-slate-400/90"
const indicatorContainerStyles = "ml-3.5"
const menuStyles =
  "my-2 border-[0.5px] text-left border-solid shadow-sm font-medium border-slate-300/60 rounded-md overflow-hidden text-sm bg-white"
const optionStyles = {
  base: "hover:cursor-pointer px-2.5 py-2",
  focused: "bg-primary/10",
  selected: "bg-primary text-white",
  disabled: "opacity-70 bg-slate-100 pointer-events-none",
}
const multiOptionStyles = {
  base: "before:content-[url('@assets/icons/select/select-box.svg')] before:align-sub before:mr-3 hover:cursor-pointer px-4 py-2.5",
  focused: "bg-primary/10",
  selected: "before:text-primary before:content-[url('@assets/icons/select/select-check.svg')]",
}
const noOptionsMessageStyles = "p-2.5 rounded-md"
const multiValueStyles =
  "hover:bg-primary/70 bg-primary rounded-2xl items-center text-white text-sm py-1 px-2"
const multiValueLabelStyles = "mr-1"
const multiValueRemoveStyles = {
  base: "hover:text-danger",
  focused: "text-danger",
}
const clearIndicatorStyles = "opacity-0 pointer-events-none invisible w-0"

export {
  controlStyles,
  placeholderStyles,
  indicatorContainerStyles,
  menuStyles,
  optionStyles,
  noOptionsMessageStyles,
  multiOptionStyles,
  multiValueStyles,
  multiValueLabelStyles,
  valueContainerStyles,
  clearIndicatorStyles,
  multiValueRemoveStyles,
}
