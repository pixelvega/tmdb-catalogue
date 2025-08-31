import React from "react"
import ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"

import { type Movie, type ResponseMovies } from "../backend/moviesType.js"

import { Router } from "./router"

interface IRenderProps {
  path: string
  data: ResponseMovies & Movie
}

export function render({ path, data }: IRenderProps) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <Router snapshotData={data} initialPath={path} />
      </StaticRouter>
    </React.StrictMode>
  )

  return { html }
}
