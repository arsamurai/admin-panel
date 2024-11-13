import { create } from "zustand"

import { TableConfig } from "../table-service.types"

interface TableConfigStore {
  config: TableConfig
  setConfig: (value: any) => void
}

export const useTableConfigStore = create<TableConfigStore>(set => ({
  config: {} as TableConfig,
  setConfig: (config: TableConfigStore["config"]) => set({ config }),
}))
