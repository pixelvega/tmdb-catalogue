import { Routes, Route } from "react-router"

import Error from "../components/error/Error"
import Detail from "../pages/detail/Detail"
import Home from "../pages/home/Home"
import Favourites from "../pages/favourites/Favourites"

export const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/movie/:category/:movieId" element={<Detail />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
