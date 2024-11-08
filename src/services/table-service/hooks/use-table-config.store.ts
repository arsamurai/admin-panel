import { create } from "zustand"
import { persist } from "zustand/middleware"

import { TableConfig } from "../table-service.types"

interface TableConfigStore {
  config: TableConfig
  setConfig: (value: any) => void
}

export const useTableConfigStore = create<TableConfigStore>()(
  persist(
    set => ({
      config: {} as TableConfig,
      setConfig: (config: TableConfigStore["config"]) => set({ config }),
    }),
    {
      name: "table-config",
    },
  ),
)
