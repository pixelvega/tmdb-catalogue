import { useState } from "react"
import type { Movie } from "../backend/moviesType"

const useGetMovieDetail = (
  detailData: Movie | undefined,
  movieId: string | undefined
) => {
  const [isLoading, setIsLoading] = useState(Boolean(!detailData))
  const [isError, setIsError] = useState(false)
  const [movie, setMovie] = useState<Movie | undefined>(detailData)

  const getMovieDetail = async () => {
    setIsError(false)
    await fetch(`/api/movie/${movieId}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.success === false) {
          return setIsError(true)
        }
        setMovie(data)
      })
      .catch((err) => {
        console.log("error", err)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return { isLoading, isError, movie, getMovieDetail }
}

export default useGetMovieDetail
