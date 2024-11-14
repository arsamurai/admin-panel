export interface RouterParams {
  path: string
}

export const ROUTES = {
  ROOT: {
    path: "/",
  },
  404: {
    path: "/404",
  },
  PAGE: {
    path: "/:path*",
  },
} satisfies Record<string, RouterParams>
