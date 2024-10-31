import React from "react"

import { usePagination } from "./hooks/use-pagination"
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationWrapper,
} from "./pagination.config"
import { PaginationProps } from "./pagination.types"

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  siblingCount,
  currentPage,
  onPageChange,
}) => {
  const paginationRange = usePagination({ totalPages, siblingCount, currentPage })

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationPrevious onClick={onPrevious} isDisabled={currentPage === 1} />
        <div className="hidden md:flex">
          {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === "...") {
              return <PaginationEllipsis key={index} />
            }

            return (
              <PaginationItem
                onClick={() => onPageChange(+pageNumber)}
                key={index}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationItem>
            )
          })}
        </div>
        <div className="flex items-center md:hidden">
          <PaginationItem>{currentPage}</PaginationItem>
          <span className="text-secondary-text">/</span>
          <PaginationItem>{totalPages}</PaginationItem>
        </div>
        <PaginationNext onClick={onNext} isDisabled={currentPage === totalPages} />
      </PaginationContent>
    </PaginationWrapper>
  )
}

export default Pagination
