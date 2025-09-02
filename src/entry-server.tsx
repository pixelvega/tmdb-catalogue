import React from "react"
import ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"

import { Router } from "./router"
import { AppContextProvider } from "./store/app/AppContext.js"
import type { InitialState } from "./store/app/appTypes.js"

interface IRenderProps {
  path: string
  data: InitialState
}

export function render({ path, data }: IRenderProps) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <AppContextProvider snapshotData={data}>
        <StaticRouter location={path}>
          <Router />
        </StaticRouter>
      </AppContextProvider>
    </React.StrictMode>
  )

  return { html }
}
