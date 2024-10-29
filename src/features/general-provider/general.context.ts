import { createContext, useContext } from "react"

import { GeneralProps } from "./general.types"

export const GeneralContext = createContext<GeneralProps | null>(null)

export const useGeneral = () => {
  const data = useContext(GeneralContext)

  if (!data) {
    throw new Error("Can not `useGeneral` outside of the `GeneralProvider`")
  }

  return data
}
