import * as React from "react"

import { cn } from "@shared/utils/cn"

import ChevronIcon from "@assets/icons/chevron.svg"

const PaginationWrapper = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
PaginationWrapper.displayName = "PaginationWrapper"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex w-full flex-row items-center justify-between gap-1", className)}
      {...props}
    />
  ),
)
PaginationContent.displayName = "PaginationContent"

type PaginationItemProps = {
  isActive?: boolean
} & React.ComponentProps<"li">

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, isActive, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "h-10 w-fit cursor-pointer rounded-lg px-[16.5px] py-[11.5px] text-sm font-medium text-slate-800 transition-colors hover:bg-slate-300",
        {
          ["bg-primary/90 text-white hover:bg-primary"]: isActive,
        },
        className,
      )}
      {...props}
    />
  ),
)
PaginationItem.displayName = "PaginationItem"

type PaginationNavProps = {
  isDisabled?: boolean
} & React.ComponentProps<typeof PaginationItem>

const PaginationPrevious = ({ className, isDisabled, ...props }: PaginationNavProps) => (
  <PaginationItem
    aria-label="Go to previous page"
    className={cn(
      "flex select-none items-center transition-colors",
      { ["pointer-events-none cursor-default opacity-30"]: isDisabled },
      className,
    )}
    {...props}
  >
    <span className="rotate-90 *:size-4 md:mr-3 md:hidden">
      <ChevronIcon />
    </span>
    <span className="hidden md:block">Назад</span>
  </PaginationItem>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, isDisabled, ...props }: PaginationNavProps) => (
  <PaginationItem
    aria-label="Go to next page"
    className={cn(
      "flex select-none items-center transition-colors",
      { ["pointer-events-none cursor-default opacity-30"]: isDisabled },
      className,
    )}
    {...props}
  >
    <span className="hidden md:block">Вперед</span>
    <span className="-rotate-90 *:size-4 md:ml-3 md:hidden">
      <ChevronIcon />
    </span>
  </PaginationItem>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li
    aria-hidden
    className={cn(
      "flex h-10 w-10 items-end justify-center px-[16.5px] py-[11.5px] text-sm font-medium",
      className,
    )}
    {...props}
  >
    <span className="h-4 w-4">...</span>
  </li>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
}
