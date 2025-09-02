import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import type { InitialState } from "./appTypes"

interface AppContext {
  appState: InitialState
  setAppState: Dispatch<SetStateAction<InitialState>>
}

const AppContext = createContext<AppContext | undefined>(undefined)

const AppContextProvider = ({
  children,
  snapshotData,
}: {
  children: ReactNode
  snapshotData: InitialState
}) => {
  const [appState, setAppState] = useState<InitialState>(snapshotData)

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
