import { FC } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { ContentEntity } from "@pages/page/components/content-entity"

import { useGeneral } from "@features/general-provider"

import { getSvgById } from "@shared/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tab"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

const View: FC<{ id: number }> = ({ id }) => {
  const { general, isLoading } = useGeneral()
  const { hash } = useLocation()
  const navigate = useNavigate()
  const view = general?.views?.find(page => page.id === Number(id))

  const getViewContent = () => {
    if (view?.blocks?.length) {
      return view.blocks.map(item => {
        return (
          <div key={item.id} className={cn("space-y-5", item.size)}>
            <Typography variant="sectionSubtitle">{item.title}</Typography>
            <ContentEntity variant={item.content_type} id={Number(item.entity_id)} />
          </div>
        )
      })
    } else if (view?.tabs?.length) {
      return (
        <Tabs value={hash}>
          <TabsList>
            {view.tabs.map(item => (
              <TabsTrigger
                key={item.id}
                value={item.tab_url}
                onClick={() => navigate(item.tab_url)}
              >
                <span className="*:size-5">{getSvgById(item.icon)}</span>
                <span>{item.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {view.tabs.map(item => (
            <TabsContent key={item.id} value={item.tab_url}>
              <View id={Number(item.entity_id)} />
            </TabsContent>
          ))}
        </Tabs>
      )
    } else return null
  }

  if (view?.tabs?.length && !hash) {
    return <Navigate to={view?.tabs?.[0].tab_url ?? ""} replace />
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
