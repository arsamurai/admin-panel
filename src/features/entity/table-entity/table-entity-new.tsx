//import { FC, createRef, useEffect, useRef, useState } from "react"
import { FC } from "react"
import { ReactTabulator, reactFormatter } from "react-tabulator"

//import { TabulatorFull as Tabulator } from "tabulator-tables"
import { useGeneral } from "@features/general-provider"

// Импортируем компонент Tabulator
//import Button from "@shared/ui/button"
//import { Input, Label, Select } from "@shared/ui/fields"
import { withBackendHost } from "@shared/utils/env"

import { Cell } from "./cell"

const TableEntity: FC<{ id: number }> = ({ id }) => {
  const { general } = useGeneral()
  const table = general?.tables?.find(form => form.id === id)

  const columns = table?.columns.map(column => {
    return {
      title: column.title,
      field: column.api_object_key,
      formatter: reactFormatter(
        <Cell
          itemId={1}
          data={""}
          type={column.column_type}
          api_route={table.api_route}
          api_object_key={column.api_object_key}
          buttons={column.buttons}
          updateCell={() => {}}
        />,
      ),
    }
  })

  // const tableRef = createRef<HTMLDivElement>()
  // const tabulator = useRef<Tabulator>()
  // const [filter, setFilter] = useState({
  //   field: "name",
  //   type: "like",
  //   value: "",
  // })

  // const initTabulator = () => {
  //   if (tableRef.current) {
  //     tabulator.current = new Tabulator(tableRef.current, {
  //       ajaxURL: table?.api_route ? withBackendHost(table?.api_route) : "",
  //       ajaxResponse: function (url, params, response) {
  //         return { data: response }
  //       },
  //       paginationMode: "remote",
  //       filterMode: "remote",
  //       sortMode: "remote",
  //       pagination: true,
  //       paginationSize: 10,
  //       paginationSizeSelector: [10, 20, 30, 40],
  //       layout: "fitColumns",
  //       responsiveLayout: "collapse",
  //       placeholder: "No matching records found",
  //       columns,
  //     })
  //   }

  //   tabulator.current?.on("renderComplete", () => {})
  // }

  // const reInitOnResizeWindow = () => {
  //   window.addEventListener("resize", () => {
  //     if (tabulator.current) {
  //       tabulator.current.redraw()
  //     }
  //   })
  // }

  // const onFilter = () => {
  //   if (tabulator.current) {
  //     tabulator.current.setFilter(filter.field, filter.type, filter.value)
  //   }
  // }

  // const onResetFilter = () => {
  //   setFilter({
  //     ...filter,
  //     field: "name",
  //     type: "like",
  //     value: "",
  //   })
  //   onFilter()
  // }

  // useEffect(() => {
  //   initTabulator()
  //   reInitOnResizeWindow()
  // }, [])

  const options = {
    height: 1000,
    movableRows: true,
    progressiveLoad: "scroll",
    progressiveLoadDelay: 200,
    progressiveLoadScrollMargin: 30,
    ajaxURL: table?.api_route ? withBackendHost(table.api_route) : "",
    dataSendParams: {
      page: "page",
      size: "per_page",
    },
    paginationSize: 10,
    ajaxResponse: (url: any, params: any, response: any) => {
      return {
        data: response,
        last_page: 1,
      }
    },
  }

  return (
    // <div className="grid grid-cols-12 gap-x-6 gap-y-10">
    //   <div className="col-span-12">
    //     <div className="mt-3.5 flex flex-col gap-8">
    //       <div className="box box--stacked flex flex-col">
    //         <div className="flex flex-col gap-y-2 p-5 xl:flex-row xl:items-center">
    //           <form
    //             id="tabulator-html-filter-form"
    //             className="flex flex-col gap-x-5 gap-y-2 rounded-[0.6rem] border border-dashed border-slate-300/80 p-4 sm:p-5 xl:flex-row xl:border-0 xl:p-0"
    //             onSubmit={e => {
    //               e.preventDefault()
    //               onFilter()
    //             }}
    //           >
    //             <div className="flex flex-col items-start gap-y-2 xl:flex-row xl:items-center">
    //               <Label className="mr-3 whitespace-nowrap">Search by</Label>
    //               <Select id="tabulator-html-filter-field" />
    //             </div>
    //             <div className="flex flex-col items-start gap-y-2 xl:flex-row xl:items-center">
    //               <Label className="mr-3 whitespace-nowrap">Type</Label>
    //               <Select id="tabulator-html-filter-type" />
    //             </div>
    //             <div className="flex flex-col items-start gap-y-2 xl:flex-row xl:items-center">
    //               <Label className="mr-3 whitespace-nowrap">Keywords</Label>
    //               <Input
    //                 id="tabulator-html-filter-value"
    //                 value={filter.value}
    //                 onChange={e => {
    //                   setFilter({
    //                     ...filter,
    //                     value: e.target.value,
    //                   })
    //                 }}
    //                 type="text"
    //                 placeholder="Search..."
    //               />
    //             </div>
    //             <div className="mt-2 flex flex-col gap-2 sm:flex-row xl:mt-0">
    //               <Button
    //                 id="tabulator-html-filter-go"
    //                 variant="primary"
    //                 type="button"
    //                 onClick={onFilter}
    //               >
    //                 Search
    //               </Button>
    //               <Button
    //                 id="tabulator-html-filter-reset"
    //                 variant="secondary"
    //                 type="button"
    //                 onClick={onResetFilter}
    //               >
    //                 Reset
    //               </Button>
    //             </div>
    //           </form>
    //         </div>
    //         <div className="pb-5">
    //           <div className="scrollbar-hidden overflow-x-auto">
    //             <div id="tabulator" ref={tableRef}></div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <ReactTabulator
      columns={columns}
      layout="fitColumns"
      pagination="remote"
      paginationSize={10}
      paginationSizeSelector={[10, 20, 30, 40]}
      placeholder="No matching records found"
      options={options}
    />
  )
}

export default TableEntity
