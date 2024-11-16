import { Navigate, useLocation } from "react-router-dom"

import { useGeneral } from "@features/general-provider"

import { ROUTES } from "@shared/constants"

import { View } from "./components/view"

const Page = () => {
  const { pathname } = useLocation()
  const { general, isLoading } = useGeneral()
  const page = general?.pages?.find(page => page.route === pathname)

  if (isLoading) {
    return null
  }

  if (!page) {
    return <Navigate to={ROUTES[404].path} />
  }

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12">
        <View id={page.entity_id} />
      </div>
    </div>
  )
}
export default Page
