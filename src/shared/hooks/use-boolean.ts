import { useState } from "react"

type InitialState = boolean | (() => boolean)

export const useBoolean = (initialState: InitialState = false) => {
  const [value, setValue] = useState(initialState)

  const on = () => setValue(true)
  const off = () => setValue(false)
  const toggle = () => setValue(prev => !prev)

  return [value, { on, off, toggle }] as const
}
