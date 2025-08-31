import { useMemo } from "react"
import { Routes, Route, useLocation } from "react-router"

import { type Movie, type ResponseMovies } from "../../backend/moviesType.js"
import Error from "../components/error/Error"
import Detail from "../pages/detail/Detail"
import Home from "../pages/home/Home"
import Favourites from "../pages/favourites/Favourites"

export const Router = ({
  snapshotData,
  initialPath,
}: {
  snapshotData: ResponseMovies & Movie
  initialPath: string
}) => {
  const location = useLocation()

  const initialData = useMemo(() => {
    return location.pathname === initialPath ? snapshotData : undefined
  }, [snapshotData, location.pathname])

  return (
    <Routes>
      <Route index path="/" element={<Home initialData={initialData} />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route
        path="/movie/:category/:movieId"
        element={<Detail initialData={initialData} />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
