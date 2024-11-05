import { FC } from "react"

import { ContentEntity } from "@features/content-entity"
import { useGeneral } from "@features/general-provider"

import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

const View: FC<{ id: number }> = ({ id }) => {
  const { general, isLoading } = useGeneral()
  const view = general?.views?.find(page => page.id === Number(id))

  const getViewContent = () => {
    if (view?.blocks) {
      return view.blocks?.map(item => {
        return (
          <div key={item.id} className={cn("space-y-5", item.size)}>
            <Typography variant="sectionSubtitle">{item.title}</Typography>
            <ContentEntity variant={item.content_type} id={Number(item.entity_id)} />
          </div>
        )
      })
    } else if (view?.tabs) {
      return view?.tabs?.map(item => {
        return (
          <div key={item.id} className="space-y-5">
            <Typography variant="sectionSubtitle">{item.title}</Typography>
            <p>View Tabs are under development</p>
          </div>
        )
      })
    } else return null
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-6">
      <div className="col-span-12 space-y-5">
        <Typography variant="sectionTitle">{view?.title}</Typography>
        <div className="space-y-10">{getViewContent()}</div>
      </div>
    </div>
  )
}
export default View
