import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { AppContextProvider } from "./store/app/AppContext"
import { Router } from "./router"

import "./styles/main.scss"

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    {
      <AppContextProvider snapshotData={window.__PRELOADED_STATE__}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContextProvider>
    }
  </React.StrictMode>
)
