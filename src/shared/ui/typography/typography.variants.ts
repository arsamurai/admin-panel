import { cva } from "class-variance-authority"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      pageTitle: "text-2xl font-semibold leading-none sm:text-3xl",
      sectionTitle: "text-lg font-semibold leading-none sm:text-2xl",
      sectionSubtitle: "text-base font-semibold leading-none sm:text-lg",
      copy: "text-sm font-normal sm:text-base",
      itemTitle: "text-sm font-normal",
      itemSubtitle: "text-sm font-light",
    },
  },
  defaultVariants: {
    variant: "copy",
  },
})
