import { createContext, useContext } from "react"

import { cn } from "@shared/utils/cn"

interface TableProps extends React.PropsWithChildren, React.ComponentPropsWithoutRef<"table"> {
  dark?: boolean
  bordered?: boolean
  hover?: boolean
  striped?: boolean
  sm?: boolean
}

const tableContext = createContext<{
  dark: TableProps["dark"]
  bordered: TableProps["bordered"]
  hover: TableProps["hover"]
  striped: TableProps["striped"]
  sm: TableProps["sm"]
}>({
  dark: false,
  bordered: false,
  hover: false,
  striped: false,
  sm: false,
})
function Table({ className, dark, bordered, hover, striped, sm, ...props }: TableProps) {
  return (
    <tableContext.Provider
      value={{
        dark: dark,
        bordered: bordered,
        hover: hover,
        striped: striped,
        sm: sm,
      }}
    >
      <table
        className={cn([
          "w-full text-left",
          dark && "bg-dark text-white dark:bg-black/30",
          className,
        ])}
        {...props}
      >
        {props.children}
      </table>
    </tableContext.Provider>
  )
}

interface TheadProps extends React.PropsWithChildren, React.ComponentPropsWithoutRef<"thead"> {
  variant?: "default" | "light" | "dark"
}

const theadContext = createContext<{
  variant: TheadProps["variant"]
}>({
  variant: "default",
})
Table.Thead = ({ className, ...props }: TheadProps) => {
  return (
    <theadContext.Provider
      value={{
        variant: props.variant,
      }}
    >
      <thead
        className={cn([
          props.variant === "light" && "bg-slate-200/60 dark:bg-slate-200",
          props.variant === "dark" && "bg-dark text-white dark:bg-black/30",
          className,
        ])}
        {...props}
      >
        {props.children}
      </thead>
    </theadContext.Provider>
  )
}

type TbodyProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<"tbody">>

Table.Tbody = ({ className, ...props }: TbodyProps) => {
  return <thead className={className}>{props.children}</thead>
}

type TrProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"tr">

Table.Tr = ({ className, ...props }: TrProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const table = useContext(tableContext)
  return (
    <tr
      className={cn([
        table.hover && "[&:hover_td]:bg-slate-100 [&:hover_td]:dark:bg-darkmode-300",
        table.striped && "[&:nth-of-type(odd)_td]:bg-slate-100",
        className,
      ])}
      {...props}
    >
      {props.children}
    </tr>
  )
}

type ThProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"th">

Table.Th = ({ className, ...props }: ThProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const table = useContext(tableContext)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const thead = useContext(theadContext)
  return (
    <th
      className={cn([
        "border-b-2 px-5 py-3 font-medium dark:border-darkmode-300",
        thead.variant === "light" && "border-b-0 text-slate-700",
        thead.variant === "dark" && "border-b-0",
        table.dark && "border-slate-600 dark:border-darkmode-300",
        table.bordered && "border-l border-r border-t",
        table.sm && "px-4 py-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </th>
  )
}

type TdProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"td">

Table.Td = ({ className, ...props }: TdProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const table = useContext(tableContext)
  return (
    <td
      className={cn([
        "border-b px-5 py-3 dark:border-darkmode-300",
        table.dark && "border-slate-600 dark:border-darkmode-300",
        table.bordered && "border-l border-r border-t",
        table.sm && "px-4 py-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </td>
  )
}

export default Table
