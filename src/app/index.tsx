import { Suspense } from "react"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "@shared/ui/toastify"

import { QueryProvider } from "./query"
import { Router } from "./router"

const App = () => {
  return (
    <QueryProvider>
      <Suspense>
        <ToastContainer />
        <Router />
      </Suspense>
    </QueryProvider>
  )
}
export default App
