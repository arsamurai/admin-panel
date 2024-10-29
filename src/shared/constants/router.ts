export interface RouterParams {
  path: string
}

export const ROUTES = {
  ROOT: {
    path: "/",
  },
  PAGE: {
    path: "/page",
  },
} satisfies Record<string, RouterParams>
