import { Outlet } from "react-router-dom"

import { useGeneralQuery } from "@services/general-service"

import { GeneralContext } from "./general.context"

const GeneralProvider = () => {
  const { data, isLoading } = useGeneralQuery()

  return (
    <GeneralContext.Provider
      value={{
        general: data,
        isLoading,
      }}
    >
      <Outlet />
    </GeneralContext.Provider>
  )
}

export default GeneralProvider
