import { Routes, Route } from "react-router"

import Detail from "../pages/detail/Detail"
import Home from "../pages/home/Home"
import Error from "../components/error/Error"
import Favourites from "../pages/favourites/Favourites"

export const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/:category/:movieId" element={<Detail />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
