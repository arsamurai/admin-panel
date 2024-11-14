import { MainPage, NotFoundPage, Page } from "@pages"
import { createBrowserRouter } from "react-router-dom"

import { GeneralProvider } from "@features/general-provider"
import { RootLayout } from "@features/layout"

import { ROUTES } from "@shared/constants"

export const router = createBrowserRouter([
  {
    element: <GeneralProvider />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: ROUTES.ROOT.path,
            element: <MainPage />,
          },
          {
            path: ROUTES[404].path,
            element: <NotFoundPage />,
          },
          {
            path: ROUTES.PAGE.path,
            element: <Page />,
          },
        ],
      },
    ],
  },
])
