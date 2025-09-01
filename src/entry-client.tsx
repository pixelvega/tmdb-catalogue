import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"

import "./styles/main.scss"

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    {
      <BrowserRouter>
        <Router
          snapshotData={window.__PRELOADED_STATE__}
          initialPath={window.__INITIAL_PATH__}
        />
      </BrowserRouter>
    }
  </React.StrictMode>
)
