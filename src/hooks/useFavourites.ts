import { useEffect, useState } from "react"
import { getStoredValue, setStoredValue } from "../utils/storageHelper"
import {
  STORAGE_FAVOURITES_API,
  STORAGE_FAVOURITES_KEY,
} from "../constants/store"
import type { StoreddMovie } from "../store/app/appTypes"

export function useFavourites() {
  const [favourites, setFavourites] = useState<StoreddMovie[]>([])

  useEffect(() => {
    const stored = getStoredValue<StoreddMovie[]>(
      STORAGE_FAVOURITES_KEY,
      STORAGE_FAVOURITES_API
    )
    if (!stored) return

    setFavourites(stored)
  }, [])

  const toggleFavourite = (movie: StoreddMovie) => {
    setFavourites((prev) => {
      const isAlreadyFavourite = prev.some((fav) => fav.id === movie.id)
      const updatedFavs = isAlreadyFavourite
        ? prev.filter((storedMovie) => storedMovie.id !== movie.id)
        : [...prev, { ...movie }]
      setStoredValue<StoreddMovie[]>(
        STORAGE_FAVOURITES_KEY,
        updatedFavs,
        STORAGE_FAVOURITES_API
      )
      return updatedFavs
    })
  }

  const isFavourite = (movieId: number) =>
    favourites.some((fav) => fav.id === movieId)

  return { favourites, toggleFavourite, isFavourite }
}
