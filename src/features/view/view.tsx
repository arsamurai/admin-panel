import { FC } from "react"

import { ContentEntity } from "@features/content-entity"
import { useGeneral } from "@features/general-provider"

import { getSvgById } from "@shared/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tab"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

const View: FC<{ id: number }> = ({ id }) => {
  const { general, isLoading } = useGeneral()
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
        <Tabs defaultValue={String(view.tabs[0].id)}>
          <div className="mb-5">
            <TabsList>
              {view.tabs.map(item => (
                <TabsTrigger key={item.id} value={String(item.id)} className="flex gap-1">
                  <span className="*:size-5">{getSvgById(item.icon)}</span>
                  <span>{item.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {view.tabs.map(item => (
            <TabsContent key={item.id} value={String(item.id)}>
              <View id={Number(item.entity_id)} />
            </TabsContent>
          ))}
        </Tabs>
      )
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
