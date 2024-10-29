import { cva } from "class-variance-authority"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      pageTitle: "text-3xl font-semibold leading-none",
      sectionTitle: "text-2xl font-semibold leading-none",
      sectionSubtitle: "text-lg font-semibold leading-none",
      copy: "text-base font-normal",
      itemTitle: "text-sm font-normal",
      itemSubtitle: "text-sm font-light",
    },
  },
  defaultVariants: {
    variant: "copy",
  },
})
