import { Navigate, useParams } from "react-router-dom"

import { ContentEntity } from "@features/content-entity"
import { useGeneral } from "@features/general-provider"

import { ROUTES } from "@shared/constants"

const Page = () => {
  const { id } = useParams()
  const { general, isLoading } = useGeneral()
  const page = general?.pages?.find(page => page.id === Number(id))

  if (isLoading) {
    return null
  }

  if (!page) {
    return <Navigate to={ROUTES.ROOT.path} />
  }

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12">
        <ContentEntity variant={page.entity_type} id={page.entity_id} />
      </div>
    </div>
  )
}
export default Page
