import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { FC, PropsWithChildren } from "react"

import { showToast } from "@shared/ui/toastify"

const handleServerError = (error: Error) => {
  if (error instanceof AxiosError && error?.response) {
    if (error.response.status >= 500) {
      showToast("Ой! Что-то пошло не так", { type: "error" })
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 3000,
    },
  },
  queryCache: new QueryCache({
    onError: handleServerError,
  }),
  mutationCache: new MutationCache({
    onError: handleServerError,
  }),
})

const QueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default QueryProvider
